import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { tokens } from "../tokens";
import { Header } from "../components/Header";
import { ChatSimulation, ChatMessage } from "../components/ChatSimulation";
import { VideoIcon, ArrowRightIcon, CheckCircleIcon } from "../icons";

export const BriefWorkflowScene: React.FC = () => {
  const frame = useCurrentFrame();

  const chatMessages: ChatMessage[] = [
    {
      sender: "user",
      text: "Ho messo un video in video_da_editare/demo.mp4. Crea un reel di 30 secondi su 3 consigli pratici per programmatori React. Voglio un hook forte, sottotitoli dinamici e uno stile moderno.",
      delayFrame: 30,
    },
    {
      sender: "coordinatore",
      agentName: "Coordinatore",
      avatarColor: tokens.colors.brand,
      text: "Ricevuto! Inizializzo il progetto in progetti/2026-09-17_react-tips/. Assegno lo Script all'agente Script con skill video-hook-writing. L'editing e i sottotitoli partiranno appena lo script è approvato.",
      delayFrame: 150,
    },
    {
      sender: "agent",
      agentName: "Script",
      avatarColor: tokens.colors.accentRose,
      text: "Script completato! Hook: 'Il 90% dei developer React spreca memoria così...'. Durata stimata: 28s. Passo il controllo a Editing Remotion.",
      delayFrame: 320,
    },
  ];

  const cardEntrance = interpolate(frame, [10, 40], [0, 1], {
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
        step="Passo 1"
        title="Il Workflow Semplificato: Zero Template Manuali"
        badge="Zero Config"
        sceneDuration={tokens.timing.scenes.workflow}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "40% 60%",
          gap: 32,
          marginTop: 20,
          alignItems: "start",
        }}
      >
        {/* Left Side: The 2 Folders Concept */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            opacity: cardEntrance,
          }}
        >
          {/* Box 1: video_da_editare */}
          <div
            style={{
              backgroundColor: tokens.colors.bgElevated,
              border: `1px solid ${tokens.colors.brandLight}`,
              borderRadius: 14,
              padding: "22px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              boxShadow: "0 8px 24px rgba(99, 102, 241, 0.15)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  backgroundColor: "rgba(99, 102, 241, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: tokens.colors.brandLight,
                }}
              >
                <VideoIcon size={18} />
              </div>
              <span
                style={{
                  fontFamily: tokens.typography.fontMono,
                  fontSize: 16,
                  fontWeight: 700,
                  color: tokens.colors.textPrimary,
                }}
              >
                video_da_editare/
              </span>
            </div>
            <p style={{ margin: 0, fontSize: 14, color: tokens.colors.textSecondary, lineHeight: 1.5 }}>
              Trascina qui le tue registrazioni, video grezzi, schermate o file audio. Non devi
              rinominare o strutturare nulla.
            </p>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <ArrowRightIcon size={28} color={tokens.colors.textMuted} />
          </div>

          {/* Box 2: video_renderizzati */}
          <div
            style={{
              backgroundColor: tokens.colors.bgElevated,
              border: `1px solid ${tokens.colors.border}`,
              borderRadius: 14,
              padding: "22px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  backgroundColor: "rgba(16, 185, 129, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: tokens.colors.accentGreen,
                }}
              >
                <CheckCircleIcon size={18} />
              </div>
              <span
                style={{
                  fontFamily: tokens.typography.fontMono,
                  fontSize: 16,
                  fontWeight: 700,
                  color: tokens.colors.textPrimary,
                }}
              >
                video_renderizzati/
              </span>
            </div>
            <p style={{ margin: 0, fontSize: 14, color: tokens.colors.textSecondary, lineHeight: 1.5 }}>
              I render finali validati dal QA compaiono direttamente qui, già compressi e pronti
              per la visualizzazione o la condivisione.
            </p>
          </div>
        </div>

        {/* Right Side: Chat simulation */}
        <ChatSimulation messages={chatMessages} />
      </div>
    </AbsoluteFill>
  );
};
