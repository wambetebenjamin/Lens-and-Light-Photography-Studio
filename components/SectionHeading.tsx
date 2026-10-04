interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  const alignment = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  return (
    <div className={`flex flex-col gap-4 mb-heading-gap max-w-2xl ${alignment}`}>
      <p className={`section-heading-eyebrow ${light ? "text-white/75" : ""}`}>{eyebrow}</p>
      <h2
        className={`text-h2 sm:text-h1 font-medium text-balance ${light ? "text-white" : "text-ink"}`}
      >
        {title}
      </h2>
      <div className={`hairline ${align === "center" ? "mx-auto" : ""} ${light ? "bg-white" : ""}`} />
      {description && (
        <p className={`text-body max-w-xl ${light ? "text-white/75" : "text-body"}`}>{description}</p>
      )}
    </div>
  );
}
