import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, spring } from "remotion";
import { tokens } from "../tokens";
import { SparklesIcon, LayersIcon, CubeIcon, BrainIcon } from "../icons";

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();

  const titleSpring = spring({
    frame,
    fps: 30,
    config: { damping: 14, stiffness: 100 },
  });

  const titleScale = interpolate(titleSpring, [0, 1], [0.8, 1]);
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

  const subtitleOpacity = interpolate(frame, [25, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cardsOpacity = interpolate(frame, [45, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: tokens.colors.bg,
        backgroundImage: tokens.colors.meshGradient,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: tokens.typography.fontFamily,
        padding: "0 100px",
      }}
    >
      {/* Top pill badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 18px",
          borderRadius: 30,
          backgroundColor: tokens.colors.bgElevated,
          border: `1px solid ${tokens.colors.border}`,
          marginBottom: 32,
          opacity: subtitleOpacity,
        }}
      >
        <SparklesIcon size={18} color={tokens.colors.brandLight} />
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: tokens.colors.brandLight,
            fontFamily: tokens.typography.fontMono,
            letterSpacing: "0.05em",
          }}
        >
          PIPELINE MULTI-AGENTE REMOTION
        </span>
      </div>

      {/* Main Title */}
      <h1
        style={{
          fontSize: 68,
          fontWeight: 800,
          color: tokens.colors.textPrimary,
          margin: 0,
          textAlign: "center",
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          maxWidth: 1100,
        }}
      >
        Crea Video Professionali con{" "}
        <span style={{ color: tokens.colors.brandLight }}>7 Agenti AI Coordinati</span>
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontSize: 24,
          color: tokens.colors.textSecondary,
          textAlign: "center",
          maxWidth: 820,
          marginTop: 24,
          lineHeight: 1.5,
          opacity: subtitleOpacity,
        }}
      >
        Dall'idea iniziale al render finale. Zero montaggio manuale: la pipeline scrive la
        sceneggiatura, genera codice Remotion, modella in 3D ed esegue il QA.
      </p>

      {/* Feature Badges */}
      <div
        style={{
          display: "flex",
          gap: 20,
          marginTop: 48,
          opacity: cardsOpacity,
        }}
      >
        {[
          { label: "Remotion 4.0", icon: <LayersIcon size={20} color={tokens.colors.accentCyan} />, color: tokens.colors.accentCyan },
          { label: "MCP Blender 3D", icon: <CubeIcon size={20} color={tokens.colors.accentPurple} />, color: tokens.colors.accentPurple },
          { label: "Memoria Persistente", icon: <BrainIcon size={20} color={tokens.colors.accentGreen} />, color: tokens.colors.accentGreen },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 22px",
              backgroundColor: tokens.colors.bgCard,
              border: `1px solid ${tokens.colors.border}`,
              borderRadius: 12,
              fontSize: 16,
              fontWeight: 600,
              color: tokens.colors.textPrimary,
              boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
            }}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
