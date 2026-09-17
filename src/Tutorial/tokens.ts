export const tokens = {
  colors: {
    // Fondamentali di contrasto elevato (Dark Theme)
    bg: "#090A0F",
    bgElevated: "#12141F",
    bgCard: "#181B29",
    bgCardHover: "#212538",

    // Bordi (rhythm & elevation chiara, 1px)
    border: "#2A2E45",
    borderActive: "#4F46E5",
    borderGlow: "rgba(99, 102, 241, 0.3)",

    // Testi rigorosamente WCAG AA su sfondo scuro
    textPrimary: "#F8FAFC",    // Contrast ratio > 16:1
    textSecondary: "#CBD5E1",  // Contrast ratio > 10:1
    textMuted: "#94A3B8",      // Contrast ratio 5.2:1 (supera 4.5:1)
    textInverse: "#090A0F",

    // Palette Semantica
    brand: "#6366F1",          // Indigo primario
    brandLight: "#818CF8",
    accentCyan: "#06B6D4",     // Dati / Remotion highlight
    accentGreen: "#10B981",    // Success / QA Passed
    accentAmber: "#F59E0B",    // Warning / In progress
    accentPurple: "#A855F7",   // Blender 3D / Creative
    accentRose: "#F43F5E",     // Hook / Retention

    // Gradienti controllati di sfondo (sottili, non testo slop)
    meshGradient: "radial-gradient(circle at 50% -20%, rgba(99, 102, 241, 0.15), transparent 70%)",
  },
  typography: {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    fontMono: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
  },
  timing: {
    fps: 30,
    scenes: {
      intro: 600,             // 20s
      pipeline: 1050,         // 35s
      workflow: 900,          // 30s
      script: 1050,           // 35s
      editing: 1200,          // 40s
      blender: 1050,          // 35s
      audioQa: 1050,          // 35s
      recap: 600,             // 20s
    },
  },
} as const;

export const totalDurationInFrames =
  tokens.timing.scenes.intro +
  tokens.timing.scenes.pipeline +
  tokens.timing.scenes.workflow +
  tokens.timing.scenes.script +
  tokens.timing.scenes.editing +
  tokens.timing.scenes.blender +
  tokens.timing.scenes.audioQa +
  tokens.timing.scenes.recap;
