import React from "react";
import { tokens } from "../tokens";
import { interpolate, useCurrentFrame } from "remotion";

interface CodeLine {
  num: number;
  code: string;
  isHighlighted?: boolean;
}

interface CodeWindowProps {
  filename: string;
  lines: CodeLine[];
  highlightColor?: string;
  width?: number | string;
}

export const CodeWindow: React.FC<CodeWindowProps> = ({
  filename,
  lines,
  highlightColor = tokens.colors.brand,
  width = "100%",
}) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        width,
        backgroundColor: "#0d0f18",
        borderRadius: 12,
        border: `1px solid ${tokens.colors.border}`,
        boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.6)",
        overflow: "hidden",
        fontFamily: tokens.typography.fontMono,
        fontSize: 14,
        lineHeight: 1.6,
      }}
    >
      {/* Window Title Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 16px",
          backgroundColor: "#131622",
          borderBottom: `1px solid ${tokens.colors.border}`,
        }}
      >
        <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#EF4444" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#F59E0B" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#10B981" }} />
        </div>
        <span style={{ color: tokens.colors.textSecondary, fontSize: 12, fontWeight: 500 }}>
          {filename}
        </span>
        <div style={{ width: 40 }} />
      </div>

      {/* Code Area */}
      <div style={{ padding: "16px 20px" }}>
        {lines.map((line, idx) => {
          const lineDelay = idx * 4;
          const lineOpacity = interpolate(frame, [lineDelay, lineDelay + 10], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={line.num}
              style={{
                display: "flex",
                gap: 16,
                padding: "2px 6px",
                borderRadius: 4,
                opacity: lineOpacity,
                backgroundColor: line.isHighlighted ? `${highlightColor}22` : "transparent",
                borderLeft: line.isHighlighted ? `3px solid ${highlightColor}` : "3px solid transparent",
              }}
            >
              <span
                style={{
                  width: 24,
                  textAlign: "right",
                  color: tokens.colors.textMuted,
                  userSelect: "none",
                  fontSize: 12,
                }}
              >
                {line.num}
              </span>
              <span
                style={{
                  color: line.isHighlighted ? tokens.colors.textPrimary : tokens.colors.textSecondary,
                  fontWeight: line.isHighlighted ? 600 : 400,
                  whiteSpace: "pre",
                }}
              >
                {line.code}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
