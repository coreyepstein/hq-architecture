"use client";

import {
  domainLabels,
  ecosystem,
  productLabels,
  type Domain,
  type Product
} from "@/app/data/ecosystem";
import { SystemIcon } from "./icon-registry";

interface CatalogViewProps {
  selectedId: string;
  onSelect: (id: string) => void;
  activeProducts: Set<Product>;
  activeDomain: Domain | "all";
  query: string;
}

export function CatalogView({
  selectedId,
  onSelect,
  activeProducts,
  activeDomain,
  query
}: CatalogViewProps) {
  const normalizedQuery = query.trim().toLowerCase();
  const matches = ecosystem.capabilities.filter((capability) => {
    if (!activeProducts.has(capability.product)) return false;
    if (activeDomain !== "all" && capability.domain !== activeDomain) {
      return false;
    }
    if (!normalizedQuery) return true;

    return [
      capability.label,
      capability.summary,
      capability.detail,
      capability.domain,
      capability.runtime,
      ...capability.tags,
      ...capability.repos,
      ...capability.commands
    ]
      .join(" ")
      .toLowerCase()
      .includes(normalizedQuery);
  });

  const grouped = (["core", "cloud", "pro", "surface"] as Product[])
    .map((product) => ({
      product,
      capabilities: matches.filter(
        (capability) => capability.product === product
      )
    }))
    .filter((group) => group.capabilities.length > 0);

  return (
    <div className="atlas-catalog" role="region" aria-label="HQ capability catalog">
      <header className="atlas-catalog__head">
        <div>
          <span className="atlas-label">ACCESSIBLE SYSTEM INDEX</span>
          <h1>Capability catalog</h1>
          <p>
            Every system in the Atlas, generated from the same model as the map
            and guided tour.
          </p>
        </div>
        <output>{matches.length.toString().padStart(2, "0")} SYSTEMS</output>
      </header>

      {grouped.length ? (
        grouped.map((group) => (
          <section key={group.product} className="atlas-catalog__group">
            <div className="atlas-catalog__group-head">
              <span>{productLabels[group.product]}</span>
              <small>{group.capabilities.length} systems</small>
            </div>
            <div className="atlas-catalog__grid">
              {group.capabilities.map((capability) => (
                <button
                  key={capability.id}
                  type="button"
                  className={
                    capability.id === selectedId
                      ? "atlas-catalog-card atlas-catalog-card--selected"
                      : "atlas-catalog-card"
                  }
                  onClick={() => onSelect(capability.id)}
                  aria-pressed={capability.id === selectedId}
                >
                  <span className="atlas-catalog-card__icon">
                    <SystemIcon name={capability.icon} size={20} />
                  </span>
                  <span className="atlas-catalog-card__copy">
                    <small>
                      {domainLabels[capability.domain]} / {capability.kicker}
                    </small>
                    <strong>{capability.label}</strong>
                    <span>{capability.summary}</span>
                  </span>
                  <span className="atlas-catalog-card__repo">
                    {capability.repos[0]}
                  </span>
                </button>
              ))}
            </div>
          </section>
        ))
      ) : (
        <div className="atlas-empty">
          <span>NO MATCHING SYSTEMS</span>
          <p>Adjust the product, domain, or search filters.</p>
        </div>
      )}
    </div>
  );
}
