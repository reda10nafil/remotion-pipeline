import { Composition } from "remotion";
import { TokamakSequence, TOKAMAK_SEQUENCE } from "./compositions/TokamakSequence";

/** Minimal root for the scientific Blender sequence; avoids unrelated project CSS/plugins. */
export const TokamakRoot: React.FC = () => (
  <Composition
    id={TOKAMAK_SEQUENCE.id}
    component={TokamakSequence}
    durationInFrames={TOKAMAK_SEQUENCE.durationInFrames}
    fps={TOKAMAK_SEQUENCE.fps}
    width={TOKAMAK_SEQUENCE.width}
    height={TOKAMAK_SEQUENCE.height}
  />
);
