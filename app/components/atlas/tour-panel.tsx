"use client";

import {
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  Presentation
} from "lucide-react";
import { ecosystem } from "@/app/data/ecosystem";

interface TourPanelProps {
  index: number;
  overviewOpen: boolean;
  onChange: (index: number) => void;
  onToggleOverview: () => void;
}

export function TourPanel({
  index,
  overviewOpen,
  onChange,
  onToggleOverview
}: TourPanelProps) {
  const scene = ecosystem.tour[index];

  return (
    <div className="atlas-tour-panel">
      <div className="atlas-tour-panel__head">
        <Presentation size={17} />
        <span>GUIDED BRIEFING</span>
        <strong>
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(ecosystem.tour.length).padStart(2, "0")}
        </strong>
      </div>

      <div className="atlas-tour-panel__body">
        <span className="atlas-tour-panel__number">{scene.number}</span>
        <h1>{scene.title}</h1>
        <p className="atlas-tour-panel__claim">{scene.claim}</p>
        <p>{scene.body}</p>
      </div>

      <div className="atlas-tour-panel__progress" aria-hidden="true">
        {ecosystem.tour.map((item, itemIndex) => (
          <span
            key={item.id}
            className={itemIndex <= index ? "is-complete" : ""}
          />
        ))}
      </div>

      <div className="atlas-tour-panel__controls">
        <button
          type="button"
          onClick={() => onChange(Math.max(0, index - 1))}
          disabled={index === 0}
          aria-label="Previous scene"
        >
          <ChevronLeft size={16} />
          PREV
        </button>
        <button
          type="button"
          onClick={onToggleOverview}
          aria-pressed={overviewOpen}
        >
          <Grid3X3 size={15} />
          SCENES
        </button>
        <button
          type="button"
          onClick={() =>
            onChange(Math.min(ecosystem.tour.length - 1, index + 1))
          }
          disabled={index === ecosystem.tour.length - 1}
          aria-label="Next scene"
        >
          NEXT
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="atlas-tour-panel__keys">
        <span>← / → NAVIGATE</span>
        <span>O OVERVIEW</span>
        <span>F FULLSCREEN</span>
      </div>
    </div>
  );
}

interface TourOverviewProps {
  currentIndex: number;
  onSelect: (index: number) => void;
  onClose: () => void;
}

export function TourOverview({
  currentIndex,
  onSelect,
  onClose
}: TourOverviewProps) {
  return (
    <div
      className="atlas-tour-overview"
      role="dialog"
      aria-modal="true"
      aria-label="Tour scene overview"
    >
      <button
        className="atlas-tour-overview__backdrop"
        type="button"
        onClick={onClose}
        aria-label="Close scene overview"
      />
      <div className="atlas-tour-overview__panel">
        <div className="atlas-tour-overview__head">
          <div>
            <span className="atlas-label">BRIEFING INDEX</span>
            <h2>Choose a scene</h2>
          </div>
          <button type="button" onClick={onClose}>
            CLOSE
          </button>
        </div>
        <div className="atlas-tour-overview__grid">
          {ecosystem.tour.map((scene, index) => (
            <button
              key={scene.id}
              type="button"
              className={index === currentIndex ? "is-active" : ""}
              onClick={() => onSelect(index)}
            >
              <span>{scene.number}</span>
              <strong>{scene.title}</strong>
              <small>{scene.claim}</small>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
