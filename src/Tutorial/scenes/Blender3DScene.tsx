import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { tokens } from "../tokens";
import { Header } from "../components/Header";
import { CubeIcon } from "../icons";

export const Blender3DScene: React.FC = () => {
  const frame = useCurrentFrame();

  // 3D rotation simulation
  const rotateDeg = interpolate(frame, [0, 600], [0, 360], {
    extrapolateRight: "extend",
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
        step="Passo 4"
        title="Agente Grafica 3D: Integrazione Nativa MCP Blender"
        badge="MCP Server :9876"
        sceneDuration={tokens.timing.scenes.blender}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 32,
          marginTop: 20,
        }}
      >
        {/* Left: Workflow Description */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
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
              <CubeIcon size={22} color={tokens.colors.accentPurple} />
              <h3 style={{ margin: 0, fontSize: 18, color: tokens.colors.textPrimary }}>
                Automazione Blender via MCP
              </h3>
            </div>

            <p style={{ margin: 0, fontSize: 14, color: tokens.colors.textSecondary, lineHeight: 1.5 }}>
              Quando il video necessita di elementi tridimensionali (loghi metallici, mockup 3D,
              intro spettacolari), l'agente <strong>Grafica 3D</strong> controlla Blender da remoto.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { step: "1. Modellazione", desc: "Generazione mesh procedurale o import asset" },
                { step: "2. Shader & PBR", desc: "Materiali metallici, rugosità e luci da studio" },
                { step: "3. Animazione", desc: "Keyframe camera, rotazioni ed effetti di camera" },
                { step: "4. Esportazione", desc: "File MP4 con Alpha o sequenza PNG in public/" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "10px 14px",
                    backgroundColor: tokens.colors.bgCard,
                    borderRadius: 8,
                    border: `1px solid ${tokens.colors.border}`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: tokens.typography.fontMono,
                      fontSize: 12,
                      fontWeight: 700,
                      color: tokens.colors.accentPurple,
                      width: 110,
                    }}
                  >
                    {item.step}
                  </span>
                  <span style={{ fontSize: 13, color: tokens.colors.textSecondary }}>
                    {item.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Strict Role Isolation Rule */}
          <div
            style={{
              backgroundColor: "rgba(168, 85, 247, 0.08)",
              border: "1px solid rgba(168, 85, 247, 0.25)",
              borderRadius: 12,
              padding: "14px 18px",
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 700, color: tokens.colors.accentPurple, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Regola di Sicurezza del Ruolo
            </span>
            <p style={{ margin: "6px 0 0 0", fontSize: 13, color: tokens.colors.textSecondary }}>
              L'agente Grafica 3D <strong>non tocca mai</strong> il codice in <code>src/</code>.
              Consegna unicamente i render pronti all'agente Editing.
            </p>
          </div>
        </div>

        {/* Right: 3D Isometric Simulation */}
        <div
          style={{
            backgroundColor: tokens.colors.bgElevated,
            border: `1px solid ${tokens.colors.border}`,
            borderRadius: 14,
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Ambient Glow */}
          <div
            style={{
              position: "absolute",
              width: 250,
              height: 250,
              borderRadius: "50%",
              backgroundColor: "rgba(168, 85, 247, 0.15)",
              filter: "blur(60px)",
            }}
          />

          {/* Simulated 3D Cube with perspective */}
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: 24,
              background: "linear-gradient(135deg, #A855F7 0%, #6366F1 50%, #06B6D4 100%)",
              transform: `rotateX(25deg) rotateY(${rotateDeg}deg) rotateZ(10deg)`,
              boxShadow: "0 25px 50px -12px rgba(168, 85, 247, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 32,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              zIndex: 2,
            }}
          >
            3D
          </div>

          <div
            style={{
              marginTop: 40,
              textAlign: "center",
              zIndex: 2,
            }}
          >
            <div
              style={{
                fontFamily: tokens.typography.fontMono,
                fontSize: 13,
                color: tokens.colors.accentPurple,
                fontWeight: 600,
              }}
            >
              output/logo_3d_metallic.webm
            </div>
            <div style={{ fontSize: 13, color: tokens.colors.textMuted, marginTop: 4 }}>
              Canale Alfa trasparente • 60 FPS • Pronto per il layer Remotion
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
