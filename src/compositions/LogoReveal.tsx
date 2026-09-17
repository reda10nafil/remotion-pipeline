import React from "react";
import {
  AbsoluteFill,
  Audio,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  interpolate,
} from "remotion";
import { Sparkle } from "../components/Sparkle";

/**
 * LogoReveal — Composizione Logo Reveal 3D (1080x1920 verticale, 60 FPS, 300 frame = 5s).
 *
 * Layering:
 * 1. Render 3D esportato da Blender MCP    → public/assets/logo_3d_render.mp4
 * 2. Sparkle 2D overlay (basso a destra)   → appare attorno al frame 200
 * 3. SFX audio sincronizzato con il neon   → public/audio/reveal_sfx.mp3
 *
 * Pipeline 3D (vedi CLAUDE.md e .agent/agents/grafica-3d.md):
 * vettorializza il logo in assets_blender/logo_source.svg → pulizia topologica
 * (Separate by Loose Parts + Cyclic Spline, niente linee diagonali fantasma) →
 * estrusione 3D con neon #C8104E → render 60fps → public/assets/logo_3d_render.mp4
 */

export const LOGO_REVEAL = {
  width: 1080,
  height: 1920,
  fps: 60,
  durationInFrames: 300,
  colors: {
    background: "#EBEBEB",
    neon: "#C8104E",
  },
} as const;

export const LogoReveal: React.FC<{
  videoSrc?: string;
  audioSrc?: string;
  showSparkle?: boolean;
}> = ({
  videoSrc = "assets/logo_3d_render.mp4",
  audioSrc = "audio/reveal_sfx.mp3",
  showSparkle = true,
}) => {
  const frame = useCurrentFrame();

  // Leggero fade-in del video 3D nei primi frame, fade-out alla fine
  const videoOpacity = interpolate(
    frame,
    [0, 12, LOGO_REVEAL.durationInFrames - 12, LOGO_REVEAL.durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: LOGO_REVEAL.colors.background }}>
      {/* Layer 1 — Render 3D Blender (60 FPS) */}
      <AbsoluteFill style={{ opacity: videoOpacity }}>
        <OffthreadVideo
          src={staticFile(videoSrc)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>

      {/* Layer 2 — Sparkle 2D in basso a destra, sincronizzato ~frame 200 */}
      {showSparkle ? (
        <Sparkle
          startFrame={200}
          x={LOGO_REVEAL.width - 260}
          y={LOGO_REVEAL.height - 340}
          size={140}
        />
      ) : null}

      {/* Layer 3 — SFX audio all'avvio dell'animazione neon */}
      <Audio src={staticFile(audioSrc)} volume={0.8} />
    </AbsoluteFill>
  );
};
