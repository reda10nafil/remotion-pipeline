import React from "react";
import { tokens } from "../tokens";
import { interpolate, useCurrentFrame } from "remotion";

interface HeaderProps {
  step: string;
  title: string;
  badge?: string;
  sceneDuration: number;
}

export const Header: React.FC<HeaderProps> = ({ step, title, badge, sceneDuration }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(frame, [0, 20], [-20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const progress = interpolate(frame, [0, sceneDuration], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 40,
        left: 80,
        right: 80,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        opacity,
        transform: `translateY(${translateY}px)`,
        zIndex: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span
            style={{
              fontSize: 14,
              fontFamily: tokens.typography.fontMono,
              fontWeight: 600,
              color: tokens.colors.brandLight,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "4px 10px",
              background: "rgba(99, 102, 241, 0.12)",
              border: `1px solid ${tokens.colors.border}`,
              borderRadius: 6,
            }}
          >
            {step}
          </span>
          <h1
            style={{
              fontSize: 34,
              fontWeight: 700,
              color: tokens.colors.textPrimary,
              margin: 0,
              fontFamily: tokens.typography.fontFamily,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </h1>
        </div>

        {badge && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px",
              background: tokens.colors.bgElevated,
              border: `1px solid ${tokens.colors.border}`,
              borderRadius: 20,
              fontSize: 14,
              fontWeight: 500,
              color: tokens.colors.textSecondary,
              fontFamily: tokens.typography.fontMono,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: tokens.colors.accentGreen,
                boxShadow: `0 0 10px ${tokens.colors.accentGreen}`,
              }}
            />
            {badge}
          </div>
        )}
      </div>

      {/* Subtle Progress Bar */}
      <div
        style={{
          width: "100%",
          height: 3,
          backgroundColor: tokens.colors.border,
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            backgroundColor: tokens.colors.brand,
            borderRadius: 2,
          }}
        />
      </div>
    </div>
  );
};
