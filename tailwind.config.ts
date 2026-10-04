import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    screens: {
      xs: "390px",
      sm: "576px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
    },
    extend: {
      colors: {
        ink: "var(--color-ink)",
        "ink-soft": "var(--color-ink-soft)",
        "ink-deep": "var(--color-ink-deep)",
        body: "var(--color-body)",
        muted: "var(--color-muted)",
        "muted-2": "var(--color-muted-2)",
        border: "var(--color-border)",
        "border-soft": "var(--color-border-soft)",
        "border-softer": "var(--color-border-softer)",
        surface: "var(--color-surface)",
        "surface-tint": "var(--color-surface-tint)",
        "surface-cool": "var(--color-surface-cool)",
        accent: "var(--color-accent)",
        whatsapp: "var(--color-whatsapp)",
      },
      fontFamily: {
        sans: ["Poppins", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      fontSize: {
        nav: "var(--fs-nav)",
        button: "var(--fs-button)",
        caption: "var(--fs-caption)",
        small: "var(--fs-small)",
        body: "var(--fs-body)",
        base: "var(--fs-base)",
        h6: "var(--fs-h6)",
        h5: "var(--fs-h5)",
        h4: "var(--fs-h4)",
        h3: "var(--fs-h3)",
        h2: "var(--fs-h2)",
        h1: "var(--fs-h1)",
        "display-sm": "var(--fs-display-sm)",
        display: "var(--fs-display)",
      },
      spacing: {
        section: "var(--space-section)",
        "section-sm": "var(--space-section-sm)",
        "heading-gap": "var(--space-heading-gap)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
      },
      borderRadius: {
        none: "var(--radius-none)",
        sm: "var(--radius-sm)",
        pill: "var(--radius-pill)",
      },
      maxWidth: {
        container: "var(--container-max)",
      },
      transitionTimingFunction: {
        refined: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      transitionDuration: {
        hover: "250ms",
      },
      letterSpacing: {
        wider2: "0.12em",
        wider3: "0.2em",
      },
    },
  },
  plugins: [],
};
export default config;
