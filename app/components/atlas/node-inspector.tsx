"use client";

import {
  ArrowDownLeft,
  ArrowUpRight,
  ExternalLink,
  X
} from "lucide-react";
import {
  capabilityById,
  domainLabels,
  ecosystem,
  productLabels,
  runtimeLabels
} from "@/app/data/ecosystem";
import { SystemIcon } from "./icon-registry";

const publicRepoUrls: Record<string, string> = {
  "hq-architecture": "https://github.com/coreyepstein/hq-architecture",
  "hq-cloud": "https://github.com/indigoai-us/hq-cloud",
  "hq-core": "https://github.com/indigoai-us/hq-core",
  "hq-desktop-app": "https://github.com/indigoai-us/hq-desktop-app",
  "hq-mcp": "https://github.com/indigoai-us/hq-mcp",
  "hq-sync": "https://github.com/indigoai-us/hq-sync"
};

interface NodeInspectorProps {
  selectedId: string;
  onSelect: (id: string) => void;
  onClose?: () => void;
}

export function NodeInspector({
  selectedId,
  onSelect,
  onClose
}: NodeInspectorProps) {
  const capability =
    capabilityById.get(selectedId) ?? ecosystem.capabilities[0];

  const connections = ecosystem.relations
    .filter(
      (relation) =>
        relation.source === capability.id ||
        relation.target === capability.id
    )
    .map((relation) => {
      const outgoing = relation.source === capability.id;
      const peerId = outgoing ? relation.target : relation.source;
      return {
        ...relation,
        outgoing,
        peer: capabilityById.get(peerId)
      };
    })
    .filter((connection) => connection.peer);

  return (
    <aside className="atlas-inspector" aria-label="Selected system details">
      <div className="atlas-inspector__rail">
        <span>SYS / {capability.id.toUpperCase()}</span>
        {onClose && (
          <button type="button" onClick={onClose} aria-label="Close inspector">
            <X size={16} />
          </button>
        )}
      </div>

      <div className="atlas-inspector__header">
        <div className="atlas-inspector__icon">
          <SystemIcon name={capability.icon} size={24} strokeWidth={1.35} />
        </div>
        <div>
          <span className="atlas-label">
            {productLabels[capability.product]} / {capability.kicker}
          </span>
          <h2>{capability.label}</h2>
        </div>
      </div>

      <p className="atlas-inspector__summary">{capability.summary}</p>
      <p className="atlas-inspector__detail">{capability.detail}</p>

      <dl className="atlas-spec-grid">
        <div>
          <dt>Product</dt>
          <dd>{productLabels[capability.product]}</dd>
        </div>
        <div>
          <dt>Runtime</dt>
          <dd>{runtimeLabels[capability.runtime]}</dd>
        </div>
        <div>
          <dt>Domain</dt>
          <dd>{domainLabels[capability.domain]}</dd>
        </div>
        <div>
          <dt>Connections</dt>
          <dd>{connections.length}</dd>
        </div>
      </dl>

      {connections.length > 0 && (
        <section className="atlas-inspector__section">
          <h3>System connections</h3>
          <div className="atlas-connection-list">
            {connections.map((connection) => (
              <button
                key={connection.id}
                type="button"
                onClick={() => onSelect(connection.peer!.id)}
              >
                <span className="atlas-connection-list__direction">
                  {connection.outgoing ? (
                    <ArrowUpRight size={13} />
                  ) : (
                    <ArrowDownLeft size={13} />
                  )}
                  {connection.kind}
                </span>
                <strong>{connection.peer!.label}</strong>
                {connection.label && <small>{connection.label}</small>}
              </button>
            ))}
          </div>
        </section>
      )}

      {capability.commands.length > 0 && (
        <section className="atlas-inspector__section">
          <h3>Operator surfaces</h3>
          <div className="atlas-chip-list">
            {capability.commands.map((command) => (
              <code key={command}>{command}</code>
            ))}
          </div>
        </section>
      )}

      <section className="atlas-inspector__section">
        <h3>Repository ownership</h3>
        <ul className="atlas-repo-list">
          {capability.repos.map((repo) => {
            const url = publicRepoUrls[repo];
            return (
              <li key={repo}>
                {url ? (
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    <span>{repo}</span>
                    <ExternalLink size={12} />
                  </a>
                ) : (
                  <span>{repo}</span>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <section className="atlas-inspector__section atlas-inspector__section--source">
        <h3>Source lineage</h3>
        <ul>
          {capability.sources.map((source) => (
            <li key={source}>{source}</li>
          ))}
        </ul>
      </section>
    </aside>
  );
}
