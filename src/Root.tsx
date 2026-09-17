import "./index.css";
import { Composition } from "remotion";
import { HelloWorld } from "./HelloWorld";
import { Logo } from "./HelloWorld/Logo";
import { TutorialPipeline } from "./Tutorial";
import { totalDurationInFrames } from "./Tutorial/tokens";
import { LogoReveal, LOGO_REVEAL } from "./compositions/LogoReveal";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        // You can take the "id" to render a video:
        // npx remotion render HelloWorld
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        // You can override these props for each render:
        // https://www.remotion.dev/docs/parametrized-rendering
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
          logoColor1: "#91EAE4",
          logoColor2: "#86A8E7",
        }}
      />

      {/* Mount any React component to make it show up in the sidebar and work on it individually! */}
      <Composition
        id="OnlyLogo"
        component={Logo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          logoColor1: "#91dAE2",
          logoColor2: "#86A8E7",
        }}
      />
      {/* Tutorial Completo della Pipeline Agenti (4 min e 10s) */}
      <Composition
        id="TutorialPipeline"
        component={TutorialPipeline}
        durationInFrames={totalDurationInFrames}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Logo Reveal 3D — verticale 9:16, 60 FPS, 5s. Richiede il render Blender in public/assets/logo_3d_render.mp4 */}
      <Composition
        id="LogoReveal"
        component={LogoReveal}
        durationInFrames={LOGO_REVEAL.durationInFrames}
        fps={LOGO_REVEAL.fps}
        width={LOGO_REVEAL.width}
        height={LOGO_REVEAL.height}
      />
    </>
  );
};
