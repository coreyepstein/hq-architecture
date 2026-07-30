"use client";

import Image from "next/image";
import {
  Code2,
  ExternalLink,
  ListFilter,
  Map,
  Maximize2,
  Presentation,
  Search,
  SlidersHorizontal
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  capabilityById,
  domainLabels,
  domains,
  ecosystem,
  productLabels,
  products,
  type Domain,
  type Product
} from "@/app/data/ecosystem";
import { CatalogView } from "./catalog-view";
import { EcosystemGraph } from "./ecosystem-graph";
import { NodeInspector } from "./node-inspector";
import { TourOverview, TourPanel } from "./tour-panel";

type AtlasView = "map" | "tour" | "catalog";
type AtlasRoute =
  | { view: "map"; selectedId: string }
  | { view: "catalog"; selectedId: string }
  | { view: "tour"; tourIndex: number };

const allProducts = new Set<Product>(products);

const viewItems: {
  id: AtlasView;
  label: string;
  icon: typeof Map;
}[] = [
  { id: "map", label: "Explorer", icon: Map },
  { id: "tour", label: "Tour", icon: Presentation },
  { id: "catalog", label: "Catalog", icon: ListFilter }
];

function atlasHash(view: AtlasView, selectedId: string, tourIndex: number) {
  if (view === "tour") return `#tour/${ecosystem.tour[tourIndex].id}`;
  if (view === "catalog") return `#catalog/${selectedId}`;
  return `#atlas/${selectedId}`;
}

function writeHash(
  nextView: AtlasView,
  nextSelectedId: string,
  nextTourIndex: number
) {
  const nextHash = atlasHash(nextView, nextSelectedId, nextTourIndex);
  if (window.location.hash !== nextHash) {
    window.history.replaceState(null, "", nextHash);
  }
}

function parseHash(): AtlasRoute | null {
  if (typeof window === "undefined") return null;
  const [route, id] = window.location.hash.replace(/^#/, "").split("/");
  if (route === "tour") {
    const index = ecosystem.tour.findIndex((scene) => scene.id === id);
    return { view: "tour" as const, tourIndex: Math.max(0, index) };
  }
  if (route === "catalog") {
    return {
      view: "catalog" as const,
      selectedId: id && capabilityById.has(id) ? id : "core.kernel"
    };
  }
  if (route === "atlas") {
    return {
      view: "map" as const,
      selectedId: id && capabilityById.has(id) ? id : "core.kernel"
    };
  }
  return null;
}

async function toggleFullscreen() {
  if (!document.fullscreenElement) {
    await document.documentElement.requestFullscreen?.();
    return;
  }
  await document.exitFullscreen?.();
}

export function AtlasExperience() {
  const [view, setView] = useState<AtlasView>("map");
  const [selectedId, setSelectedId] = useState("core.kernel");
  const [activeProducts, setActiveProducts] =
    useState<Set<Product>>(allProducts);
  const [activeDomain, setActiveDomain] = useState<Domain | "all">("all");
  const [query, setQuery] = useState("");
  const [tourIndex, setTourIndex] = useState(0);
  const [tourOverviewOpen, setTourOverviewOpen] = useState(false);
  const [mobileInspectorOpen, setMobileInspectorOpen] = useState(false);

  useEffect(() => {
    const syncFromHash = () => {
      const parsed = parseHash();
      if (!parsed) {
        writeHash("map", "core.kernel", 0);
        return;
      }

      setView(parsed.view);
      if ("selectedId" in parsed) setSelectedId(parsed.selectedId);
      if ("tourIndex" in parsed) {
        setTourIndex(parsed.tourIndex);
        setSelectedId(ecosystem.tour[parsed.tourIndex].focus[0]);
      }
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const changeView = useCallback(
    (nextView: AtlasView) => {
      setView(nextView);
      setTourOverviewOpen(false);
      if (nextView === "tour") {
        setActiveProducts(new Set(products));
        const firstFocus = ecosystem.tour[tourIndex].focus[0];
        setSelectedId(firstFocus);
        writeHash(nextView, firstFocus, tourIndex);
        return;
      }
      writeHash(nextView, selectedId, tourIndex);
    },
    [selectedId, tourIndex]
  );

  const selectCapability = useCallback(
    (id: string) => {
      setSelectedId(id);
      setMobileInspectorOpen(true);
      if (view !== "tour") writeHash(view, id, tourIndex);
    },
    [tourIndex, view]
  );

  const changeTour = useCallback(
    (index: number) => {
      const restoreOverviewFocus = tourOverviewOpen;
      const nextIndex = Math.max(
        0,
        Math.min(ecosystem.tour.length - 1, index)
      );
      setTourIndex(nextIndex);
      const firstFocus = ecosystem.tour[nextIndex].focus[0];
      setSelectedId(firstFocus);
      setTourOverviewOpen(false);
      writeHash("tour", firstFocus, nextIndex);
      if (restoreOverviewFocus) {
        window.requestAnimationFrame(() => {
          document
            .querySelector<HTMLButtonElement>("[data-tour-overview-trigger]")
            ?.focus();
        });
      }
    },
    [tourOverviewOpen]
  );

  const closeTourOverview = useCallback(() => {
    setTourOverviewOpen(false);
    window.requestAnimationFrame(() => {
      document
        .querySelector<HTMLButtonElement>("[data-tour-overview-trigger]")
        ?.focus();
    });
  }, []);

  useEffect(() => {
    if (view !== "tour") return;

    const onKeyDown = (event: KeyboardEvent) => {
      const tag = (event.target as HTMLElement | null)?.tagName.toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select") return;

      if (event.key === "ArrowRight" || event.key === "PageDown") {
        event.preventDefault();
        changeTour(tourIndex + 1);
      }
      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        changeTour(tourIndex - 1);
      }
      if (event.key === "Home") {
        event.preventDefault();
        changeTour(0);
      }
      if (event.key === "End") {
        event.preventDefault();
        changeTour(ecosystem.tour.length - 1);
      }
      if (event.key.toLowerCase() === "o") {
        event.preventDefault();
        setTourOverviewOpen((open) => !open);
      }
      if (event.key.toLowerCase() === "f") {
        event.preventDefault();
        void toggleFullscreen();
      }
      if (event.key === "Escape" && tourOverviewOpen) {
        event.preventDefault();
        setTourOverviewOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [changeTour, tourIndex, tourOverviewOpen, view]);

  const toggleProduct = (product: Product) => {
    setActiveProducts((current) => {
      if (current.has(product) && current.size === 1) return current;
      const next = new Set(current);
      if (next.has(product)) next.delete(product);
      else next.add(product);
      return next;
    });
  };

  const currentFocus =
    view === "tour" ? ecosystem.tour[tourIndex].focus : [];

  const countsByProduct = useMemo(
    () =>
      Object.fromEntries(
        products.map((product) => [
          product,
          ecosystem.capabilities.filter(
            (capability) => capability.product === product
          ).length
        ])
      ) as Record<Product, number>,
    []
  );

  return (
    <div className={`atlas-app atlas-app--${view}`}>
      <header className="atlas-topbar">
        <a className="atlas-brand" href="#atlas/core.kernel">
          <Image src="/icon.svg" alt="" width={26} height={26} priority />
          <span>
            <strong>HQ SYSTEM ATLAS</strong>
            <small>CORE · CLOUD · PRO</small>
          </span>
        </a>

        <nav className="atlas-view-switcher" aria-label="Atlas views">
          {viewItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => changeView(item.id)}
                aria-pressed={view === item.id}
              >
                <Icon size={14} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <label className="atlas-search">
          <Search size={14} aria-hidden="true" />
          <span className="sr-only">Search systems</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search systems, repos, commands…"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </label>

        <div className="atlas-topbar__actions">
          <a
            href="https://github.com/coreyepstein/hq-architecture"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open the hq-architecture repository"
          >
            <Code2 size={15} />
            <span>SOURCE</span>
            <ExternalLink size={10} />
          </a>
          <button
            type="button"
            onClick={() => void toggleFullscreen()}
            aria-label="Toggle fullscreen"
          >
            <Maximize2 size={15} />
          </button>
        </div>
      </header>

      <div className="atlas-workspace">
        <aside className="atlas-sidebar">
          {view === "tour" ? (
            <TourPanel
              index={tourIndex}
              overviewOpen={tourOverviewOpen}
              onChange={changeTour}
              onToggleOverview={() =>
                setTourOverviewOpen((open) => !open)
              }
            />
          ) : (
            <>
              <section className="atlas-system-card">
                <div className="atlas-system-card__head">
                  <span>HQ / SYSTEM CARD</span>
                  <strong>V{ecosystem.meta.version}</strong>
                </div>
                <p>{ecosystem.meta.claim}</p>
                <ul>
                  {ecosystem.meta.principles.map((principle) => (
                    <li key={principle}>{principle}</li>
                  ))}
                </ul>
              </section>

              <section className="atlas-filter-group">
                <div className="atlas-filter-group__head">
                  <SlidersHorizontal size={14} />
                  <span>PRODUCT PLANES</span>
                </div>
                <div className="atlas-product-filters">
                  {products.map((product) => (
                    <button
                      key={product}
                      type="button"
                      aria-pressed={activeProducts.has(product)}
                      onClick={() => toggleProduct(product)}
                    >
                      <span>{productLabels[product]}</span>
                      <small>{countsByProduct[product]}</small>
                    </button>
                  ))}
                </div>
              </section>

              <section className="atlas-filter-group">
                <label className="atlas-domain-filter">
                  <span>CAPABILITY DOMAIN</span>
                  <select
                    value={activeDomain}
                    onChange={(event) =>
                      setActiveDomain(
                        event.target.value as Domain | "all"
                      )
                    }
                  >
                    <option value="all">All domains</option>
                    {domains.map((domain) => (
                      <option key={domain} value={domain}>
                        {domainLabels[domain]}
                      </option>
                    ))}
                  </select>
                </label>
              </section>

              <section className="atlas-legend">
                <span>RELATIONSHIP KEY</span>
                <div>
                  <i className="atlas-legend__line" />
                  request / data flow
                </div>
                <div>
                  <i className="atlas-legend__line atlas-legend__line--dash" />
                  async / sync signal
                </div>
                <div>
                  <i className="atlas-legend__node" />
                  inspectable system
                </div>
              </section>
            </>
          )}
        </aside>

        <main className="atlas-main">
          {view === "catalog" ? (
            <CatalogView
              selectedId={selectedId}
              onSelect={selectCapability}
              activeProducts={activeProducts}
              activeDomain={activeDomain}
              query={query}
            />
          ) : (
            <EcosystemGraph
              selectedId={selectedId}
              onSelect={selectCapability}
              activeProducts={activeProducts}
              activeDomain={activeDomain}
              query={query}
              focusIds={currentFocus}
            />
          )}
        </main>

        <div
          className={`atlas-inspector-wrap ${
            mobileInspectorOpen ? "is-open" : ""
          }`}
        >
          <NodeInspector
            selectedId={selectedId}
            onSelect={selectCapability}
            onClose={() => setMobileInspectorOpen(false)}
          />
        </div>
      </div>

      <footer className="atlas-statusbar">
        <div className="atlas-statusbar__status">
          <span />
          MODEL VERIFIED {ecosystem.meta.updated}
        </div>
        <div className="atlas-operating-loop" aria-label="HQ operating loop">
          {["CONTEXT", "PLAN", "EXECUTE", "VERIFY", "SHIP", "LEARN", "RESUME"].map(
            (step, index, steps) => (
              <span key={step}>
                {step}
                {index < steps.length - 1 && <i>→</i>}
              </span>
            )
          )}
        </div>
        <div className="atlas-statusbar__count">
          {ecosystem.capabilities.length} SYSTEMS · {ecosystem.relations.length}{" "}
          RELATIONS
        </div>
      </footer>

      {tourOverviewOpen && (
        <TourOverview
          currentIndex={tourIndex}
          onSelect={changeTour}
          onClose={closeTourOverview}
        />
      )}
    </div>
  );
}
