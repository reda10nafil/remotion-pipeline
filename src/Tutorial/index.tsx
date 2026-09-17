import React from "react";
import { Series } from "remotion";
import { tokens } from "./tokens";
import { IntroScene } from "./scenes/IntroScene";
import { PipelineOverviewScene } from "./scenes/PipelineOverviewScene";
import { BriefWorkflowScene } from "./scenes/BriefWorkflowScene";
import { ScriptHookScene } from "./scenes/ScriptHookScene";
import { EditingRemotionScene } from "./scenes/EditingRemotionScene";
import { Blender3DScene } from "./scenes/Blender3DScene";
import { AudioQaScene } from "./scenes/AudioQaScene";
import { RecapOutputScene } from "./scenes/RecapOutputScene";

export const TutorialPipeline: React.FC = () => {
  return (
    <Series>
      {/* 1. Intro (20s) */}
      <Series.Sequence durationInFrames={tokens.timing.scenes.intro}>
        <IntroScene />
      </Series.Sequence>

      {/* 2. Panoramica 7 Agenti (35s) */}
      <Series.Sequence durationInFrames={tokens.timing.scenes.pipeline}>
        <PipelineOverviewScene />
      </Series.Sequence>

      {/* 3. Workflow Diretto & Cartelle (30s) */}
      <Series.Sequence durationInFrames={tokens.timing.scenes.workflow}>
        <BriefWorkflowScene />
      </Series.Sequence>

      {/* 4. Script & Hook nei primi 3s (35s) */}
      <Series.Sequence durationInFrames={tokens.timing.scenes.script}>
        <ScriptHookScene />
      </Series.Sequence>

      {/* 5. Editing Remotion & Codice (40s) */}
      <Series.Sequence durationInFrames={tokens.timing.scenes.editing}>
        <EditingRemotionScene />
      </Series.Sequence>

      {/* 6. Grafica 3D & MCP Blender (35s) */}
      <Series.Sequence durationInFrames={tokens.timing.scenes.blender}>
        <Blender3DScene />
      </Series.Sequence>

      {/* 7. Audio, Sottotitoli & QA Impeccable (35s) */}
      <Series.Sequence durationInFrames={tokens.timing.scenes.audioQa}>
        <AudioQaScene />
      </Series.Sequence>

      {/* 8. Recap, Memoria & Output (20s) */}
      <Series.Sequence durationInFrames={tokens.timing.scenes.recap}>
        <RecapOutputScene />
      </Series.Sequence>
    </Series>
  );
};
