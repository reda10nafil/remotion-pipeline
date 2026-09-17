# Rimotion — Pipeline Agenti Video (Remotion)

**Rimotion** è un progetto [Remotion](https://remotion.dev) (React + TypeScript) con una **pipeline di 7 agenti AI coordinati** che trasforma un'idea in un video finito: sceneggiatura, montaggio in codice Remotion, audio/sottotitoli, asset 3D, controllo qualità.

**Tu dai il brief → il sistema produce l'MP4 in `video_renderizzati/`, senza conferme intermedie.**

## Quick Start

```bash
npm install
npm run dev        # Anteprima in Remotion Studio
```

Poi, in qualsiasi piattaforma AI (Antigravity, Codex, Cursor, Claude Code, Gemini CLI...):

```
Attiva Remotion e fammi un video che parla di [argomento]
```

Il comando **`Attiva Remotion`** è memorizzato nel repository (`CLAUDE.md`, `AGENTS.md`, `GEMINI.md`): l'agente assume il ruolo di **Video Creative Director**, fa una breve intervista di regia (piattaforma, durata, mood, materiali, sottotitoli), presenta il pitch di regia e, al tuo ok, orchestra tutti gli specialisti fino al render finale.

## I 7 agenti

| Agente | Cosa fa |
|---|---|
| **Coordinatore / Creative Director** | Interfaccia unica con l'utente, scompone il brief, orchestra la pipeline |
| **Script** | Sceneggiatura, hook nei primi 3s, narrativa, CTA |
| **Editing Remotion** | Codice Remotion: scene, transizioni, overlay, animazioni |
| **Audio & Sottotitoli** | Sottotitoli word-by-word (karaoke highlight), musica, mix |
| **Grafica 3D** | Asset 3D via Blender MCP (loghi, intro, animazioni) |
| **QA / Revisione** | Controllo qualità, timing, audit Impeccable |
| **Ricerca Marketing** | Tendenze e best practice per piattaforma |

Ogni agente ha una memoria persistente in `.agent/memory/<nome>/knowledge.md` che legge prima di lavorare e aggiorna dopo.

## Server MCP

| MCP | Scopo |
|---|---|
| **Blender MCP** (porta 9876) | Modellazione e rendering asset 3D |
| **21st.dev Magic** | Componenti UI/card/overlay moderni |
| **Graphify** | Knowledge graph del progetto: query con citazioni `file:riga` (`graphify query`, `shortest_path`, `god_nodes`...) |

## Skill

- **Graphify** (`.agents/skills/graphify/`) — query sul grafo del codice invece di grep a tentoni
- **Color System** (`.agent/skills/color-system/`) — palette con `culori` + `chroma-js`: contrasto WCAG, OKLCH, scale armoniche
- **Video Frame Tools** (`.agent/skills/video-frame-tools/`) — ricette FFmpeg: frame, split clip, audio 16kHz per sottotitoli, storyboard, GIF anteprima
- **Impeccable / UI-UX Pro Max** — standard grafici anti-slop, audit qualità, `/impeccable audit|polish|critique|animate`
- **Video Hook Writing / Coordination Playbook** — tecniche di hook e regole di orchestrazione
- **Remotion skills** — markup, captions, render, studio, interactivity

## Tool di sistema

- **FFmpeg** — estrazione frame, split clip, audio per sottotitoli, GIF di anteprima
- **Graphify CLI** — knowledge graph in `graphify-out/` (grafo + report HTML interattivo)
- **culori + chroma-js** — verifica contrasto e generazione palette

## Struttura

```
video_da_editare/    ← clip grezze in input
video_renderizzati/  ← video finali (consegna qui)
src/                 ← composizioni e scene Remotion
progetti/            ← un video = una cartella di lavoro (brief, stato, output)
.agent/              ← agenti, skill, memoria, config MCP
.agents/skills/      ← skill cross-framework (graphify, impeccable, remotion-*)
graphify-out/        ← knowledge graph del progetto
CLAUDE.md            ← istruzioni universali per ogni piattaforma AI
```

## Documentazione

- **`Pipeline agenti/TUTORIAL-RIMOTION-PIPELINE.md`** — guida completa: comando "Attiva Remotion", esempi, troubleshooting
- **`CLAUDE.md`** — comportamento atteso, verifica ambiente, installazioni, MCP, convenzioni (letto automaticamente da qualsiasi agente AI)
- **`docs/PRD.md`** — specifiche di prodotto

## Comandi utili

```bash
npm run dev                    # Remotion Studio (anteprima)
npx remotion render src/index.ts <Comp> video_renderizzati/out.mp4
npm run lint                   # eslint + tsc
graphify query "<domanda>"     # interroga il knowledge graph
graphify update .              # aggiorna il grafo dopo modifiche al codice
```

## Licenza

Remotion richiede una licenza aziendale per alcune realtà: [termini](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).
