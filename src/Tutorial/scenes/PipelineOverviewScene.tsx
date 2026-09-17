import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { tokens } from "../tokens";
import { Header } from "../components/Header";
import { AgentCard } from "../components/AgentCard";
import {
  BrainIcon,
  SparklesIcon,
  VideoIcon,
  AudioIcon,
  CubeIcon,
  CheckCircleIcon,
  SearchIcon,
} from "../icons";

export const PipelineOverviewScene: React.FC = () => {
  const frame = useCurrentFrame();

  const agents = [
    {
      name: "Coordinatore",
      role: "Scomposizione compiti & routing",
      tools: "coordination-playbook",
      icon: <BrainIcon size={20} />,
      accentColor: tokens.colors.brand,
      isActive: frame >= 20 && frame < 180,
      statusText: frame >= 20 && frame < 180 ? "Scomposizione brief" : "Supervisione attiva",
      delay: 5,
    },
    {
      name: "Script",
      role: "Hook, pacing & narrativa",
      tools: "video-hook-writing",
      icon: <SparklesIcon size={20} />,
      accentColor: tokens.colors.accentRose,
      isActive: frame >= 180 && frame < 360,
      statusText: frame >= 180 && frame < 360 ? "Stesura sceneggiatura" : "Pronto",
      delay: 15,
    },
    {
      name: "Editing Remotion",
      role: "Scene, transizioni & codice",
      tools: "Remotion + 21st.dev Magic",
      icon: <VideoIcon size={20} />,
      accentColor: tokens.colors.accentCyan,
      isActive: frame >= 360 && frame < 540,
      statusText: frame >= 360 && frame < 540 ? "Composizione React" : "Pronto",
      delay: 25,
    },
    {
      name: "Grafica 3D",
      role: "Modellazione, animazioni 3D",
      tools: "Blender MCP (porta 9876)",
      icon: <CubeIcon size={20} />,
      accentColor: tokens.colors.accentPurple,
      isActive: frame >= 480 && frame < 660,
      statusText: frame >= 480 && frame < 660 ? "Render asset 3D" : "In attesa richiesta",
      delay: 35,
    },
    {
      name: "Audio & Sottotitoli",
      role: "Sottotitoli sync & music mix",
      tools: "@remotion/captions",
      icon: <AudioIcon size={20} />,
      accentColor: tokens.colors.accentAmber,
      isActive: frame >= 660 && frame < 840,
      statusText: frame >= 660 && frame < 840 ? "Sincronizzazione audio" : "Pronto",
      delay: 45,
    },
    {
      name: "QA / Revisione",
      role: "Controllo qualità & audit",
      tools: "Skill Impeccable",
      icon: <CheckCircleIcon size={20} />,
      accentColor: tokens.colors.accentGreen,
      isActive: frame >= 840 && frame < 1000,
      statusText: frame >= 840 && frame < 1000 ? "Audit Impeccable" : "Pronto",
      delay: 55,
    },
    {
      name: "Ricerca Marketing",
      role: "Trend TikTok/Reels & retention",
      tools: "Web Search integrata",
      icon: <SearchIcon size={20} />,
      accentColor: "#38BDF8",
      isActive: frame >= 20 && frame < 180,
      statusText: "Trend feed",
      delay: 65,
    },
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
        step="Architettura"
        title="I 7 Agenti Specializzati e il loro Flusso"
        badge="Coordinamento Autonomo"
        sceneDuration={tokens.timing.scenes.pipeline}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 20,
          marginTop: 20,
        }}
      >
        {agents.slice(0, 4).map((agent, i) => (
          <AgentCard
            key={i}
            name={agent.name}
            role={agent.role}
            tools={agent.tools}
            icon={agent.icon}
            accentColor={agent.accentColor}
            isActive={agent.isActive}
            statusText={agent.statusText}
            delayFrame={agent.delay}
          />
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
          marginTop: 20,
          maxWidth: "75%",
          marginRight: "auto",
          marginLeft: "auto",
          width: "100%",
        }}
      >
        {agents.slice(4).map((agent, i) => (
          <AgentCard
            key={i}
            name={agent.name}
            role={agent.role}
            tools={agent.tools}
            icon={agent.icon}
            accentColor={agent.accentColor}
            isActive={agent.isActive}
            statusText={agent.statusText}
            delayFrame={agent.delay}
          />
        ))}
      </div>

      {/* Bottom explanation */}
      <div
        style={{
          marginTop: 36,
          backgroundColor: tokens.colors.bgElevated,
          border: `1px solid ${tokens.colors.border}`,
          borderRadius: 12,
          padding: "16px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <BrainIcon size={22} color={tokens.colors.brandLight} />
          <span style={{ color: tokens.colors.textSecondary, fontSize: 16 }}>
            Nessun agente lavora fuori dal proprio perimetro: il Coordinatore sincronizza
            gli output sequenziali e paralleli.
          </span>
        </div>
        <span
          style={{
            fontFamily: tokens.typography.fontMono,
            color: tokens.colors.brandLight,
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          Regola: zero codice duplicato o fuori ruolo
        </span>
      </div>
    </AbsoluteFill>
  );
};
