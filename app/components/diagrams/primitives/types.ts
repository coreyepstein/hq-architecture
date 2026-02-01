export interface Point {
  x: number;
  y: number;
}

export type NodeVariant = "rect" | "rounded" | "diamond" | "pill" | "circle";

export interface NodeDef {
  id: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  label: string;
  sublabel?: string;
  variant?: NodeVariant;
  emphasis?: boolean;
}

export interface EdgeDef {
  from: string;
  to: string;
  label?: string;
  dashed?: boolean;
  fromSide?: "top" | "right" | "bottom" | "left";
  toSide?: "top" | "right" | "bottom" | "left";
  waypoints?: Point[];
}

export interface GroupDef {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  dashed?: boolean;
}

export interface SequenceParticipant {
  id: string;
  label: string;
  x: number;
}

export interface SequenceMessage {
  from: string;
  to: string;
  label: string;
  dashed?: boolean;
  y: number;
}

export interface SequenceNote {
  over: string[];
  text: string;
  y: number;
  height?: number;
}
