interface PortfolioFilterTabsProps {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
}

export default function PortfolioFilterTabs({ categories, active, onChange }: PortfolioFilterTabsProps) {
  return (
    <div
      className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-12"
      role="tablist"
      aria-label="Filter portfolio by category"
    >
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          role="tab"
          aria-selected={active === cat}
          onClick={() => onChange(cat)}
          className={`text-small uppercase tracking-wider3 pb-1 border-b transition-colors duration-hover ease-refined ${
            active === cat
              ? "text-ink border-ink"
              : "text-muted border-transparent hover:text-ink"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
