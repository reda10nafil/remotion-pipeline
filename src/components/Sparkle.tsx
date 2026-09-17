import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Sparkle — stella animata usata come overlay VFX 2D (es. LogoReveal).
 * Appare con uno spring attorno a `startFrame`, pulsa leggermente e svanisce.
 * Nessuna animazione CSS: solo useCurrentFrame / interpolate / spring.
 */
export const Sparkle: React.FC<{
  startFrame?: number;
  color?: string;
  size?: number;
  x?: number;
  y?: number;
}> = ({ startFrame = 200, color = "#FFD66B", size = 120, x = 0, y = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 12, stiffness: 160 },
  });

  const exitStart = startFrame + 2 * fps; // visibile ~2 secondi
  const exit = interpolate(frame, [exitStart, exitStart + fps], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pulse =
    1 +
    0.08 *
      Math.sin(((frame - startFrame) / fps) * Math.PI * 4) *
      (frame >= startFrame ? 1 : 0);

  const rotate = interpolate(frame, [startFrame, startFrame + 2 * fps], [0, 180], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = enter * exit;
  if (opacity <= 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        opacity,
        transform: `scale(${enter * pulse}) rotate(${rotate}deg)`,
        filter: `drop-shadow(0 0 ${size / 4}px ${color})`,
      }}
    >
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <path
          d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z"
          fill={color}
        />
      </svg>
    </div>
  );
};
