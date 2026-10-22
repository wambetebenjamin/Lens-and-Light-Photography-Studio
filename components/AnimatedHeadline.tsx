import { Fragment } from "react";

/**
 * Editorial headline reveal.
 *
 * The copy is split into words, and each word is its own non-wrapping unit.
 * Characters are never direct children of the heading, so the browser can
 * only ever wrap at a space — the mid-word breaks produced by the old
 * per-character spans are impossible here.
 *
 * The reveal itself is pure CSS (see `.hero-reveal-word` in globals.css), so
 * the headline is painted on the server and animates without waiting for
 * hydration. Motion is disabled entirely for `prefers-reduced-motion`.
 */
export default function AnimatedHeadline({
  text,
  className,
  emphasis = [],
}: {
  text: string;
  className?: string;
  /** Words that should switch to the emphasis weight, e.g. ["Last."]. */
  emphasis?: string[];
}) {
  const words = text.split(" ");

  return (
    <h1 className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <Fragment key={`${word}-${i}`}>
            <span
              className={`hero-reveal-word ${
                emphasis.includes(word) ? "hero-title-emphasis" : ""
              }`}
              style={{ animationDelay: `${(0.14 + i * 0.075).toFixed(3)}s` }}
            >
              {word}
            </span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    </h1>
  );
}
