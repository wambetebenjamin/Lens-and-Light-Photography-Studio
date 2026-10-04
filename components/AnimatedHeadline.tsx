"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function AnimatedHeadline({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const prefersReduced = useReducedMotion();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 150);
    return () => clearTimeout(t);
  }, []);

  const characters = text.split("");

  if (prefersReduced) {
    return (
      <h1 className={className} aria-label={text}>
        {text}
      </h1>
    );
  }

  return (
    <h1 className={className} aria-label={text}>
      {characters.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          aria-hidden
          initial={{ opacity: 0, y: 14 }}
          animate={started ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
            delay: i * 0.06,
          }}
          style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </motion.span>
      ))}
    </h1>
  );
}
