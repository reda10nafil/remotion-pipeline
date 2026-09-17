import React from "react";
import { tokens } from "../tokens";
import { interpolate, useCurrentFrame, spring } from "remotion";

interface AgentCardProps {
  name: string;
  role: string;
  tools: string;
  icon: React.ReactNode;
  accentColor: string;
  isActive?: boolean;
  statusText?: string;
  delayFrame?: number;
}

export const AgentCard: React.FC<AgentCardProps> = ({
  name,
  role,
  tools,
  icon,
  accentColor,
  isActive = false,
  statusText = "In attesa",
  delayFrame = 0,
}) => {
  const frame = useCurrentFrame();

  const entrance = spring({
    frame: frame - delayFrame,
    fps: 30,
    config: {
      damping: 15,
      stiffness: 120,
    },
  });

  const scale = interpolate(entrance, [0, 1], [0.85, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = interpolate(entrance, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const activePulse = isActive
    ? Math.sin((frame - delayFrame) / 6) * 0.03 + 1
    : 1;

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale * activePulse})`,
        backgroundColor: isActive ? tokens.colors.bgElevated : tokens.colors.bgCard,
        border: `1px solid ${isActive ? accentColor : tokens.colors.border}`,
        borderRadius: 14,
        padding: "18px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        boxShadow: isActive
          ? `0 12px 30px -10px ${accentColor}44, 0 0 0 1px ${accentColor}`
          : "0 4px 12px rgba(0, 0, 0, 0.2)",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.2s ease",
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          backgroundColor: accentColor,
        }}
      />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              backgroundColor: `${accentColor}18`,
              border: `1px solid ${accentColor}33`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: accentColor,
            }}
          >
            {icon}
          </div>
          <div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: tokens.colors.textPrimary,
                fontFamily: tokens.typography.fontFamily,
              }}
            >
              {name}
            </div>
            <div
              style={{
                fontSize: 12,
                color: tokens.colors.textMuted,
                fontFamily: tokens.typography.fontFamily,
              }}
            >
              {role}
            </div>
          </div>
        </div>

        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            fontFamily: tokens.typography.fontMono,
            color: isActive ? tokens.colors.accentGreen : tokens.colors.textMuted,
            padding: "3px 8px",
            borderRadius: 6,
            backgroundColor: isActive ? "rgba(16, 185, 129, 0.15)" : "rgba(255, 255, 255, 0.04)",
            border: `1px solid ${isActive ? "rgba(16, 185, 129, 0.3)" : "rgba(255, 255, 255, 0.08)"}`,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          {isActive && (
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: tokens.colors.accentGreen,
              }}
            />
          )}
          {statusText}
        </span>
      </div>

      <div
        style={{
          borderTop: `1px solid ${tokens.colors.border}`,
          paddingTop: 10,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontSize: 11,
            color: tokens.colors.textMuted,
            fontFamily: tokens.typography.fontMono,
          }}
        >
          Strumenti:
        </span>
        <span
          style={{
            fontSize: 11,
            color: tokens.colors.textSecondary,
            fontFamily: tokens.typography.fontMono,
            fontWeight: 500,
          }}
        >
          {tools}
        </span>
      </div>
    </div>
  );
};
