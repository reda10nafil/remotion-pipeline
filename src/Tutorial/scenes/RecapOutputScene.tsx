import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { tokens } from "../tokens";
import { Header } from "../components/Header";
import { BrainIcon, TerminalIcon, ArrowRightIcon } from "../icons";

export const RecapOutputScene: React.FC = () => {
  const frame = useCurrentFrame();

  const entrance = spring({
    frame,
    fps: 30,
    config: { damping: 14, stiffness: 100 },
  });

  const scale = interpolate(entrance, [0, 1], [0.9, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

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
        step="Riepilogo"
        title="Il Tuo Video è Pronto in video_renderizzati/"
        badge="Produzione Conclusa"
        sceneDuration={tokens.timing.scenes.recap}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 32,
          marginTop: 20,
        }}
      >
        {/* Left: Learning Brain System */}
        <div
          style={{
            backgroundColor: tokens.colors.bgElevated,
            border: `1px solid ${tokens.colors.border}`,
            borderRadius: 14,
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            opacity,
            transform: `scale(${scale})`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <BrainIcon size={22} color={tokens.colors.brandLight} />
            <h3 style={{ margin: 0, fontSize: 18, color: tokens.colors.textPrimary }}>
              Memoria Persistente (knowledge.md)
            </h3>
          </div>

          <p style={{ margin: 0, fontSize: 14, color: tokens.colors.textSecondary, lineHeight: 1.5 }}>
            A ogni video concluso, ciascun agente scrive 2-5 righe di sintesi su cosa ha
            funzionato e cosa evitare:
          </p>

          <div
            style={{
              backgroundColor: tokens.colors.bgCard,
              border: `1px solid ${tokens.colors.border}`,
              borderRadius: 8,
              padding: "14px 16px",
              fontFamily: tokens.typography.fontMono,
              fontSize: 12,
              lineHeight: 1.6,
              color: tokens.colors.textSecondary,
            }}
          >
            <div style={{ color: tokens.colors.brandLight, fontWeight: 700 }}>
              ### 2026-09-17 — react-tips
            </div>
            <div style={{ color: tokens.colors.accentGreen }}>
              + Cosa ha funzionato: Hook con statistica shock + card 21st.dev ad alto contrasto.
            </div>
            <div style={{ color: tokens.colors.accentAmber }}>
              - Da migliorare: Transizione scena 2 ridotta di 5 frame per maggior ritmo.
            </div>
          </div>

          <div style={{ fontSize: 13, color: tokens.colors.textMuted }}>
            Più video produci, più la pipeline diventa veloce, precisa ed efficace.
          </div>
        </div>

        {/* Right: Quick Start Commands */}
        <div
          style={{
            backgroundColor: tokens.colors.bgElevated,
            border: `1px solid ${tokens.colors.border}`,
            borderRadius: 14,
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            opacity,
            transform: `scale(${scale})`,
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <TerminalIcon size={22} color={tokens.colors.accentGreen} />
              <h3 style={{ margin: 0, fontSize: 18, color: tokens.colors.textPrimary }}>
                Pronti a Partire!
              </h3>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div
                style={{
                  backgroundColor: tokens.colors.bgCard,
                  padding: "12px 16px",
                  borderRadius: 8,
                  border: `1px solid ${tokens.colors.border}`,
                }}
              >
                <div style={{ fontSize: 11, color: tokens.colors.textMuted, marginBottom: 4 }}>
                  1. ANTEPRIMA STUDIO INTERATTIVO
                </div>
                <code
                  style={{
                    fontFamily: tokens.typography.fontMono,
                    fontSize: 14,
                    color: tokens.colors.accentCyan,
                  }}
                >
                  npm run dev
                </code>
              </div>

              <div
                style={{
                  backgroundColor: tokens.colors.bgCard,
                  padding: "12px 16px",
                  borderRadius: 8,
                  border: `1px solid ${tokens.colors.border}`,
                }}
              >
                <div style={{ fontSize: 11, color: tokens.colors.textMuted, marginBottom: 4 }}>
                  2. EXPORT MANUALE SE DESIDERATO
                </div>
                <code
                  style={{
                    fontFamily: tokens.typography.fontMono,
                    fontSize: 13,
                    color: tokens.colors.brandLight,
                  }}
                >
                  npx remotion render src/index.ts TutorialPipeline video_renderizzati/tutorial.mp4
                </code>
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: 24,
              backgroundColor: tokens.colors.brand,
              borderRadius: 10,
              padding: "14px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: "#fff",
            }}
          >
            <span style={{ fontSize: 15, fontWeight: 700 }}>
              Metti la tua prima clip in video_da_editare/ e chiedi ad Antigravity!
            </span>
            <ArrowRightIcon size={20} color="#fff" />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
