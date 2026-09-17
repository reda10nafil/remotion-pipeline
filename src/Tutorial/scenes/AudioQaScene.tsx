import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { tokens } from "../tokens";
import { Header } from "../components/Header";
import { AudioIcon, CheckCircleIcon } from "../icons";

export const AudioQaScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Word by word caption simulation
  const words = [
    { text: "Crea", start: 20, end: 50 },
    { text: "video", start: 50, end: 80 },
    { text: "straordinari", start: 80, end: 120 },
    { text: "senza", start: 120, end: 150 },
    { text: "toccare", start: 150, end: 180 },
    { text: "una", start: 180, end: 200 },
    { text: "timeline.", start: 200, end: 240 },
  ];

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
        step="Passo 5"
        title="Audio, Sottotitoli Word-by-Word & Audit QA Impeccable"
        badge="Quality Assurance"
        sceneDuration={tokens.timing.scenes.audioQa}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 32,
          marginTop: 20,
        }}
      >
        {/* Left: Audio & Captions */}
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
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <AudioIcon size={22} color={tokens.colors.accentAmber} />
            <h3 style={{ margin: 0, fontSize: 18, color: tokens.colors.textPrimary }}>
              Agente Audio & Sottotitoli (@remotion/captions)
            </h3>
          </div>

          <p style={{ margin: 0, fontSize: 14, color: tokens.colors.textSecondary, lineHeight: 1.5 }}>
            Sottotitoli sincronizzati parola per parola. Animazione attiva con ingrandimento
            e colore dinamico ad alto contrasto.
          </p>

          {/* Subtitle simulation box */}
          <div
            style={{
              backgroundColor: tokens.colors.bg,
              border: `1px solid ${tokens.colors.border}`,
              borderRadius: 12,
              padding: "36px 20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            {words.map((w, idx) => {
              const isActive = frame >= w.start && frame < w.end;
              const hasAppeared = frame >= w.start;

              return (
                <span
                  key={idx}
                  style={{
                    fontSize: isActive ? 28 : 22,
                    fontWeight: 800,
                    fontFamily: tokens.typography.fontFamily,
                    color: isActive
                      ? tokens.colors.accentAmber
                      : hasAppeared
                      ? tokens.colors.textPrimary
                      : "rgba(255, 255, 255, 0.2)",
                    transform: isActive ? "scale(1.1)" : "scale(1)",
                    textShadow: isActive ? `0 0 20px ${tokens.colors.accentAmber}88` : "none",
                    transition: "all 0.1s ease",
                  }}
                >
                  {w.text}
                </span>
              );
            })}
          </div>

          <div
            style={{
              fontSize: 13,
              color: tokens.colors.textMuted,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <CheckCircleIcon size={16} color={tokens.colors.accentGreen} />
            <span>Supporto multilingua, karaoke highlight ed esportazione file .srt / .vtt</span>
          </div>
        </div>

        {/* Right: QA & Impeccable Checklist */}
        <div
          style={{
            backgroundColor: tokens.colors.bgElevated,
            border: `1px solid ${tokens.colors.border}`,
            borderRadius: 14,
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <CheckCircleIcon size={22} color={tokens.colors.accentGreen} />
            <h3 style={{ margin: 0, fontSize: 18, color: tokens.colors.textPrimary }}>
              Agente QA: Impeccable Audit & Polish
            </h3>
          </div>

          <p style={{ margin: 0, fontSize: 14, color: tokens.colors.textSecondary }}>
            Prima della consegna, l'agente QA esamina ogni frame per eliminare difetti visivi
            e garantire standard elevati.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { rule: "Contrasto Testo WCAG AA (>= 4.5:1)", status: "PASSED (15.4:1)", ok: true },
              { rule: "Anti-Slop (No gradienti kitsch o layout finti)", status: "VERIFICATO", ok: true },
              { rule: "Gerarchia Tipografica & Spaziature", status: "OTTIMIZZATO", ok: true },
              { rule: "Sincronizzazione Frame & Audio", status: "ZERO GLITCH", ok: true },
              { rule: "Durata conforme al target (30s)", status: "CONFORME", ok: true },
            ].map((check, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 14px",
                  backgroundColor: tokens.colors.bgCard,
                  borderRadius: 8,
                  border: `1px solid ${tokens.colors.border}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <CheckCircleIcon size={16} color={tokens.colors.accentGreen} />
                  <span style={{ fontSize: 13, color: tokens.colors.textPrimary }}>
                    {check.rule}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: tokens.typography.fontMono,
                    fontSize: 11,
                    fontWeight: 700,
                    color: tokens.colors.accentGreen,
                    backgroundColor: "rgba(16, 185, 129, 0.1)",
                    padding: "3px 8px",
                    borderRadius: 4,
                  }}
                >
                  {check.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
