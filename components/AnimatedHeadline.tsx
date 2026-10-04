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

  // Animate words, not individual letters: words stay intact at every viewport width.
  const words = text.split(" ");

  if (prefersReduced) {
    return (
      <h1 className={className} aria-label={text}>
        {text}
      </h1>
    );
  }

  return (
    <h1 className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          aria-hidden
          initial={{ opacity: 0, y: 14 }}
          animate={started ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
            delay: i * 0.11,
          }}
          style={{ display: "inline-block", whiteSpace: "nowrap", marginRight: "0.24em" }}
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
}
