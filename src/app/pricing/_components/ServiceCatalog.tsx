"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import {
  serviceCategories,
  servicesByCategory,
  type BundleId,
  type Locale,
  type ServiceCategoryId,
  type ServiceId,
} from "@/lib/offer";
import SelectionBar from "./SelectionBar";
import ServiceCard from "./ServiceCard";
import { addToSelection, coveredBy, removeFromSelection, tr } from "./offer-utils";

type Props = {
  locale: Locale;
  selected: readonly ServiceId[];
  onSelectedChange: (update: (prev: readonly ServiceId[]) => readonly ServiceId[]) => void;
  onSwitchToBundle: (id: BundleId) => void;
};

export default function ServiceCatalog({ locale, selected, onSelectedChange, onSwitchToBundle }: Props) {
  const [activeCategory, setActiveCategory] = useState<ServiceCategoryId>(serviceCategories[0]?.id ?? "brand");
  const tabRefs = useRef<Partial<Record<ServiceCategoryId, HTMLButtonElement | null>>>({});

  const toggle = (id: ServiceId) =>
    onSelectedChange((prev) => (prev.includes(id) ? removeFromSelection(prev, id) : addToSelection(prev, id)));

  const switchToBundle = (id: BundleId) => {
    onSelectedChange(() => []);
    onSwitchToBundle(id);
  };

  // Roving focus between tabs with arrow keys / Home / End.
  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = serviceCategories.length - 1;
    const keyToIndex: Partial<Record<string, number>> = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    };
    const next = keyToIndex[event.key];
    const category = next === undefined ? undefined : serviceCategories[next];
    if (!category) return;
    event.preventDefault();
    setActiveCategory(category.id);
    tabRefs.current[category.id]?.focus();
  };

  const items = servicesByCategory(activeCategory);

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="relative z-10 mb-28 scroll-mt-28"
    >
      <div className="mb-8 max-w-2xl">
        <p className="mb-3 eyebrow text-[var(--accent)]">{tr(locale, "Единични услуги", "Single services")}</p>
        <Reveal variant="rise">
          <h2 id="services-title" className="mb-4 text-h2 text-[var(--text-main)]">
            {tr(locale, "Купете само това, което ви трябва", "Buy only what you need")}
          </h2>
        </Reveal>
        <p className="text-body text-[var(--text-sub)]">
          {tr(
            locale,
            "Без договор и без минимален срок. Добавете услугите, които ви интересуват, и ще видите сумата долу. Всички цени са без ДДС.",
            "No contract and no minimum term. Add the services you're interested in and the total appears below. All prices exclude VAT.",
          )}
        </p>
      </div>

      <div
        role="tablist"
        aria-label={tr(locale, "Категории услуги", "Service categories")}
        className="hide-scrollbar -mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {serviceCategories.map((cat, index) => {
          const isActive = cat.id === activeCategory;
          return (
            <button
              key={cat.id}
              ref={(el) => {
                tabRefs.current[cat.id] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${cat.id}`}
              aria-selected={isActive}
              aria-controls="services-panel"
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveCategory(cat.id)}
              onKeyDown={(e) => handleTabKeyDown(e, index)}
              className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-small font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
                isActive
                  ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-text)]"
                  : "border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-sub)] hover:border-[var(--accent)] hover:text-[var(--text-main)]"
              }`}
            >
              {cat.name[locale]}
            </button>
          );
        })}
      </div>

      <div id="services-panel" role="tabpanel" aria-labelledby={`tab-${activeCategory}`} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((svc) => (
          <ServiceCard
            key={svc.id}
            service={svc}
            locale={locale}
            isSelected={selected.includes(svc.id)}
            includedIn={selected.includes(svc.id) ? undefined : coveredBy(svc.id, selected)}
            onToggle={() => toggle(svc.id)}
          />
        ))}
      </div>

      {activeCategory === "seo" && (
        <Link
          href="/pricing/seo"
          className="mt-6 inline-flex items-center gap-1.5 rounded-md text-small font-semibold text-[var(--accent)] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        >
          {tr(locale, "Как работят SEO нивата", "How the SEO levels work")}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      )}

      <SelectionBar
        selected={selected}
        locale={locale}
        onClear={() => onSelectedChange(() => [])}
        onSwitchToBundle={switchToBundle}
      />
    </section>
  );
}
