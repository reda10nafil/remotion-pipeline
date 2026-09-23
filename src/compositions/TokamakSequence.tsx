import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";

export const TOKAMAK_SEQUENCE = {
  id: "TokamakSequence",
  width: 720,
  height: 1280,
  fps: 30,
  durationInFrames: 180,
} as const;

/** Deterministic bridge: Blender PNG sequence -> Remotion H.264 render. */
export const TokamakSequence: React.FC = () => {
  const frame = useCurrentFrame();
  const filename = `tokamak-demo/frame_${String(frame + 1).padStart(4, "0")}.png`;
  return <Img src={staticFile(`assets/${filename}`)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />;
};
