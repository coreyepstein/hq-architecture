/** Node data payload for custom React Flow nodes */
export interface HqNodeData {
  label: string;
  sublabel?: string;
  [key: string]: unknown;
}

/** Layout direction for dagre auto-layout */
export type LayoutDirection = "TB" | "LR" | "BT" | "RL";
