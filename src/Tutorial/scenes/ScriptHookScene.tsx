import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { tokens } from "../tokens";
import { Header } from "../components/Header";
import { SparklesIcon } from "../icons";

export const ScriptHookScene: React.FC = () => {
  const frame = useCurrentFrame();

  const timelineProgress = interpolate(frame, [0, 600], [0, 100], {
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
        step="Passo 2"
        title="Agente Script: Tecniche di Retention & Hook nei primi 3s"
        badge="Skill: video-hook-writing"
        sceneDuration={tokens.timing.scenes.script}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 32,
          marginTop: 20,
        }}
      >
        {/* Left Column: Hook Rules */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div
            style={{
              backgroundColor: tokens.colors.bgElevated,
              border: `1px solid ${tokens.colors.border}`,
              borderRadius: 14,
              padding: "20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <SparklesIcon size={20} color={tokens.colors.accentRose} />
              <h3
                style={{
                  margin: 0,
                  fontSize: 18,
                  fontWeight: 700,
                  color: tokens.colors.textPrimary,
                }}
              >
                Regola Aurea: I primi 3 secondi
              </h3>
            </div>
            <p style={{ margin: 0, fontSize: 14, color: tokens.colors.textSecondary, lineHeight: 1.5 }}>
              L'algoritmo premia la ritenzione. L'agente Script elimina introduzioni noiose e
              applica pattern interrupt immediati.
            </p>

            <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { type: "Domanda Provocatoria", ex: "Sapevi che il 90% fa questo errore?" },
                { type: "Pattern Interrupt", ex: "Non iniziare mai un componente così." },
                { type: "Risultato Anticipato", ex: "Ecco come velocizzare React di 3x." },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: tokens.colors.bgCard,
                    border: `1px solid ${tokens.colors.border}`,
                    borderRadius: 8,
                    padding: "10px 14px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: 13, fontWeight: 600, color: tokens.colors.accentRose }}>
                    {item.type}
                  </span>
                  <span style={{ fontSize: 13, color: tokens.colors.textPrimary, fontStyle: "italic" }}>
                    "{item.ex}"
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Anti patterns card */}
          <div
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.08)",
              border: "1px solid rgba(239, 68, 68, 0.25)",
              borderRadius: 12,
              padding: "14px 18px",
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 700, color: "#EF4444", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Anti-pattern bannati dall'agente
            </span>
            <p style={{ margin: "6px 0 0 0", fontSize: 13, color: tokens.colors.textSecondary }}>
              Vietato: "Ciao a tutti benvenuti nel canale", loghi lunghi all'inizio, promesse vaghe.
            </p>
          </div>
        </div>

        {/* Right Column: Narrative Timeline */}
        <div
          style={{
            backgroundColor: tokens.colors.bgElevated,
            border: `1px solid ${tokens.colors.border}`,
            borderRadius: 14,
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h3 style={{ margin: "0 0 16px 0", fontSize: 18, color: tokens.colors.textPrimary }}>
              Struttura Narrativa del Reel (30 Secondi)
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { time: "0 - 3s", phase: "Hook", desc: "Aggancio istantaneo dello spettatore", color: tokens.colors.accentRose },
                { time: "3 - 10s", phase: "Setup", desc: "Contesto essenziale senza preamboli", color: tokens.colors.accentAmber },
                { time: "10 - 24s", phase: "Contenuto & Valore", desc: "3 consigli pratici con card animate", color: tokens.colors.accentCyan },
                { time: "24 - 28s", phase: "Climax / Payoff", desc: "Dimostrazione del risultato", color: tokens.colors.brandLight },
                { time: "28 - 30s", phase: "Call to Action", desc: "Invito mirato e contestuale", color: tokens.colors.accentGreen },
              ].map((seg, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    padding: "10px 14px",
                    backgroundColor: tokens.colors.bgCard,
                    borderRadius: 8,
                    borderLeft: `4px solid ${seg.color}`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: tokens.typography.fontMono,
                      fontSize: 12,
                      fontWeight: 700,
                      color: seg.color,
                      width: 60,
                    }}
                  >
                    {seg.time}
                  </span>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: tokens.colors.textPrimary }}>
                      {seg.phase}
                    </span>
                    <span style={{ fontSize: 12, color: tokens.colors.textMuted }}>
                      {seg.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: tokens.colors.textMuted }}>Ritenzione stimata</span>
              <span style={{ fontSize: 12, fontFamily: tokens.typography.fontMono, color: tokens.colors.accentGreen }}>
                Elevata (+84%)
              </span>
            </div>
            <div
              style={{
                width: "100%",
                height: 6,
                backgroundColor: tokens.colors.border,
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${timelineProgress}%`,
                  height: "100%",
                  backgroundColor: tokens.colors.accentGreen,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
