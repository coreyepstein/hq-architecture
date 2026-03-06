import { ReactNode } from "react";

const sizeMap = {
  sm: { width: "w-3", height: "h-3" },
  md: { width: "w-4", height: "h-4" },
  lg: { width: "w-6", height: "h-6" },
};

export function CornerBrackets({
  children,
  size = "md",
  className = "",
}: {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const { width, height } = sizeMap[size];
  const borderColor = "border-accent/30";

  return (
    <div className={`relative ${className}`}>
      <div
        className={`absolute top-0 left-0 ${width} ${height} border-l-2 border-t-2 ${borderColor} pointer-events-none`}
        aria-hidden="true"
      />
      <div
        className={`absolute top-0 right-0 ${width} ${height} border-r-2 border-t-2 ${borderColor} pointer-events-none`}
        aria-hidden="true"
      />
      <div
        className={`absolute bottom-0 left-0 ${width} ${height} border-l-2 border-b-2 ${borderColor} pointer-events-none`}
        aria-hidden="true"
      />
      <div
        className={`absolute bottom-0 right-0 ${width} ${height} border-r-2 border-b-2 ${borderColor} pointer-events-none`}
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
