import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { tokens } from "../tokens";
import { Header } from "../components/Header";
import { CodeWindow } from "../components/CodeWindow";
import { SparklesIcon, CheckCircleIcon } from "../icons";

export const EditingRemotionScene: React.FC = () => {
  const frame = useCurrentFrame();

  const codeLines = [
    { num: 1, code: 'import { interpolate, useCurrentFrame } from "remotion";' },
    { num: 2, code: "" },
    { num: 3, code: "export const TipCard = ({ title, text }) => {" },
    { num: 4, code: "  const frame = useCurrentFrame();" },
    { num: 5, code: "  const scale = interpolate(frame, [0, 20], [0.8, 1], {" },
    { num: 6, code: '    extrapolateRight: "clamp",' },
    { num: 7, code: "  });" },
    { num: 8, code: "  const opacity = interpolate(frame, [0, 15], [0, 1]);" },
    { num: 9, code: "" },
    { num: 10, code: "  return (" },
    { num: 11, code: '    <div style={{ transform: `scale(${scale})`, opacity }}>' },
    { num: 12, code: "      <h3>{title}</h3>" },
    { num: 13, code: "      <p>{text}</p>" },
    { num: 14, code: "    </div>" },
    { num: 15, code: "  );" },
    { num: 16, code: "};" },
  ];

  // Animated card preview driven by frame
  const previewScale = interpolate(frame, [40, 80], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const previewOpacity = interpolate(frame, [40, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: tokens.colors.bg,
        backgroundImage: tokens.colors.meshGradient,
        padding: "130px 80px 60px 80px",
        fontFamily: tokens.typography.fontFamily,
      }}
    >
      <Header
        step="Passo 3"
        title="Agente Editing Remotion: Montaggio Dichiarativo in React"
        badge="Skills: Remotion + 21st.dev Magic"
        sceneDuration={tokens.timing.scenes.editing}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "55% 45%",
          gap: 32,
          marginTop: 20,
          alignItems: "start",
        }}
      >
        {/* Left: Code Editor */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <CodeWindow
            filename="src/components/TipCard.tsx"
            lines={codeLines}
            highlightColor={tokens.colors.accentCyan}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 13,
              color: tokens.colors.textMuted,
              fontFamily: tokens.typography.fontMono,
            }}
          >
            <CheckCircleIcon size={16} color={tokens.colors.accentGreen} />
            <span>Nessuna animazione CSS fragile: rendering frame-perfect e deterministico</span>
          </div>
        </div>

        {/* Right: Live Preview Box */}
        <div
          style={{
            backgroundColor: tokens.colors.bgElevated,
            border: `1px solid ${tokens.colors.border}`,
            borderRadius: 14,
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: tokens.colors.accentCyan,
                fontFamily: tokens.typography.fontMono,
              }}
            >
              LIVE RENDER PREVIEW (CANVAS)
            </span>
            <span
              style={{
                fontSize: 12,
                color: tokens.colors.textMuted,
                fontFamily: tokens.typography.fontMono,
              }}
            >
              Frame: {frame} / 1200
            </span>
          </div>

          {/* Rendered Component Simulation */}
          <div
            style={{
              height: 280,
              backgroundColor: tokens.colors.bg,
              border: `1px solid ${tokens.colors.border}`,
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 24,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Background subtle effect */}
            <div
              style={{
                position: "absolute",
                width: 150,
                height: 150,
                borderRadius: "50%",
                backgroundColor: "rgba(6, 182, 212, 0.15)",
                filter: "blur(40px)",
              }}
            />

            {/* The Animated Card */}
            <div
              style={{
                opacity: previewOpacity,
                transform: `scale(${previewScale})`,
                backgroundColor: tokens.colors.bgCard,
                border: `1px solid ${tokens.colors.accentCyan}`,
                borderRadius: 12,
                padding: "20px 24px",
                maxWidth: 320,
                boxShadow: "0 10px 30px rgba(6, 182, 212, 0.2)",
                zIndex: 2,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <SparklesIcon size={16} color={tokens.colors.accentCyan} />
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: tokens.colors.accentCyan,
                    fontFamily: tokens.typography.fontMono,
                  }}
                >
                  TIP #1 REACT
                </span>
              </div>
              <h4
                style={{
                  margin: "0 0 6px 0",
                  fontSize: 18,
                  color: tokens.colors.textPrimary,
                }}
              >
                Usa useMemo con Saggezza
              </h4>
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  color: tokens.colors.textSecondary,
                  lineHeight: 1.4,
                }}
              >
                Evita ri-computazioni inutili su array pesanti oltre i 10.000 elementi.
              </p>
            </div>
          </div>

          {/* 21st.dev Magic Callout */}
          <div
            style={{
              padding: "12px 16px",
              backgroundColor: tokens.colors.bgCard,
              borderRadius: 8,
              border: `1px solid ${tokens.colors.border}`,
              fontSize: 13,
              color: tokens.colors.textSecondary,
              lineHeight: 1.4,
            }}
          >
            <strong style={{ color: tokens.colors.textPrimary }}>21st.dev Magic: </strong>
            L'agente scarica e adatta componenti UI all'avanguardia pronti per l'animazione Remotion.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
