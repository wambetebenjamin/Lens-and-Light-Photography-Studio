"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const BLADE_COUNT = 9;

function Blade({ index, visible }: { index: number; visible: React.MutableRefObject<boolean> }) {
  const ref = useRef<THREE.Mesh>(null);
  const angle = (index / BLADE_COUNT) * Math.PI * 2;

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(1.65, 0.34);
    shape.lineTo(1.1, 0);
    shape.lineTo(1.65, -0.34);
    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current || !visible.current) return;
    const t = clock.getElapsedTime();
    // Oscillating "open / close" iris motion, slow and unhurried.
    const openAmount = (Math.sin(t * 0.2) + 1) / 2; // 0 (closed) -> 1 (open)
    const rotation = angle + openAmount * 0.55;
    ref.current.rotation.z = rotation;
  });

  return (
    <mesh ref={ref} geometry={geometry} rotation={[0, 0, angle]}>
      <meshBasicMaterial
        color="#1d1d1d"
        wireframe
        transparent
        opacity={0.15}
        toneMapped={false}
      />
    </mesh>
  );
}

function Iris({ activeRef }: { activeRef: React.MutableRefObject<boolean> }) {
  const blades = useMemo(() => Array.from({ length: BLADE_COUNT }, (_, i) => i), []);
  return (
    <group position={[0, 0, 0]} scale={1.4}>
      {blades.map((i) => (
        <Blade key={i} index={i} visible={activeRef} />
      ))}
      <mesh rotation={[0, 0, 0]}>
        <ringGeometry args={[1.95, 2, 48]} />
        <meshBasicMaterial color="#1d1d1d" transparent opacity={0.12} wireframe toneMapped={false} />
      </mesh>
    </group>
  );
}

export default function ApertureScene({ activeRef }: { activeRef: React.MutableRefObject<boolean> }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 40 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
    >
      <Iris activeRef={activeRef} />
    </Canvas>
  );
}
