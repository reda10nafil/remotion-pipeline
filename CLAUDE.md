# CLAUDE.md — Rimotion: Pipeline Agenti Video (Remotion)

> File di istruzioni universale del progetto. Vale per Claude Code e, tramite `AGENTS.md`, per qualsiasi altra piattaforma di sviluppo AI (Codex, Cursor, Gemini CLI, Antigravity, Bionic...).

## 1. Cos'è questo progetto

**Rimotion** è un progetto [Remotion](https://remotion.dev) (React + TypeScript) con una **pipeline di 7 agenti coordinati** che trasforma un'idea in un video finito: sceneggiatura, montaggio (codice Remotion), audio/sottotitoli, asset 3D, QA. L'utente dà il brief; il sistema produce il video renderizzato in `video_renderizzati/` **senza chiedere conferme intermedie**.

Documentazione completa: `Pipeline agenti/TUTORIAL-RIMOTION-PIPELINE.md` e `docs/PRD.md`.

## 2. Come comportarsi

1. **Interfaccia unica**: l'utente parla solo con il **Coordinatore / Creative Director**. Comunicazione elegante e strutturata, stile agenzia di produzione d'élite. Niente emoji casuali, niente slop visivo.
2. **Comando rapido "Attiva Remotion"**: attivati come Creative Director, fai un'intervista di regia mirata (piattaforma, durata, stile/palette, clip in `video_da_editare/`, asset 3D/audio), presenta la proposta di regia, poi orchestra gli agenti e consegni il video finito.
3. **Ruoli agenti**: leggi `.agent/agents/<nome>.md` prima di operare in un ruolo. Ogni agente lavora SOLO nel suo ambito; aggiorna il suo `.agent/memory/<nome>/knowledge.md` dopo ogni compito (2-5 righe: cosa ha funzionato, cosa evitare).
4. **Render automatico obbligatorio**: MAI chiedere se renderizzare. A composizione + QA completati:
   ```bash
   npx remotion render src/index.ts <CompositionId> video_renderizzati/<nome-video>.mp4
   ```
5. **Qualità grafica**: applica le skill `impeccable` e `ui-ux-pro-max` (anti-slop, contrasto WCAG AA >= 4.5:1, token-first). Comandi: `/impeccable audit|polish|critique|animate`.
6. **Token-first**: i colori/stili vivono in `tokens.ts` della composizione (vedi `src/Tutorial/tokens.ts`), mai sparsi nei componenti. Per le scelte colore usa la skill `.agent/skills/color-system/SKILL.md` (librerie `culori` + `chroma-js`).
7. **Niente animazioni CSS pure** nei video: usa `useCurrentFrame()`, `interpolate()`, `spring()`. Video nelle composizioni solo con `<OffthreadVideo>`.

## 3. Verifica ambiente — FAI QUESTO ALL'AVVIO

Prima di produrre, verifica gli strumenti e installa ciò che manca. Non bloccare il lavoro: se uno strumento opzionale manca e non si può installare, segnalalo e prosegui con l'alternativa indicata.

| Strumento | Verifica | Installazione se mancante | Necessario per |
|---|---|---|---|
| Node + npm | `node --version` (>= 18) | https://nodejs.org | tutto |
| Dipendenze progetto | `npm ls remotion @remotion/captions @remotion/three culori chroma-js` | `npm install` (poi `npm install @remotion/captions @remotion/three @remotion/shapes @remotion/transitions @remotion/media-utils three @react-three/fiber @react-three/drei culori chroma-js` se mancanti) | pipeline |
| uv / uvx | `uvx --version` | `winget install astral-sh.uv` | Blender MCP, Graphify |
| FFmpeg | `ffmpeg -version` | `winget install Gyan.FFmpeg -e --accept-source-agreements --accept-package-agreements` | skill video-frame-tools |
| Graphify CLI | `graphify --version` | `uv tool install "graphifyy[anthropic]"` | knowledge graph |
| yt-dlp (opzionale) | `yt-dlp --version` | automatico via `uvx yt-dlp` (nessuna installazione), oppure `winget install yt-dlp` | download audio royalty-free |
| Grafo Graphify | esiste `graphify-out/graph.json`? | `graphify extract . --code-only` (codice, gratis). Per includere anche i doc serve `GEMINI_API_KEY` (gratuita) e poi `graphify extract .` | query del grafo |
| Blender | `blender --version` | `winget install BlenderFoundation.Blender` | agente Grafica 3D |
| Addon Blender MCP | `uvx mcp-for-blender addon-paths` (deve elencare `addon.py`) | `uvx mcp-for-blender install-addon`, poi in Blender: Preferences > Add-ons > "BlenderMCP" > abilita, pannello N > BlenderMCP > Start MCP Server (porta 9876) | Blender MCP |
| 21st.dev | `npx -y @21st-dev/cli@latest whoami` | `npx -y @21st-dev/cli@latest login` (browser) | componenti UI |

Alternative senza MCP: se Blender MCP non risponde, genera 3D con `@remotion/three` o scrivi script Python per Blender da eseguire a parte. Se 21st.dev non è loggato, scrivi i componenti a mano seguendo le skill di design.

## 4. MCP configurati (`.agent/mcp_config.json`)

| Server | Scopo |
|---|---|
| `blender` | Asset 3D via Blender (porta 9876) |
| `21st-dev-magic` | Componenti UI da registry 21st.dev |
| `graphify` | Query sul knowledge graph del progetto (`graphify-out/graph.json`) |

## 5. Competenze (skill) disponibili

| Skill | Percorso | Uso |
|---|---|---|
| Graphify | `.agents/skills/graphify/SKILL.md` | Domande su codebase/architettura: interroga il grafo invece di greppare. CLI: `graphify query "..."`, `graphify explain "X"`, `graphify path "A" "B"`. Dopo modifiche al codice: `graphify update .` |
| Color System | `.agent/skills/color-system/SKILL.md` | Palette, contrasto WCAG, gradienti OKLCH (`culori`, `chroma-js`) |
| Video Frame Tools | `.agent/skills/video-frame-tools/SKILL.md` | FFmpeg: metadati, estrazione frame, split clip, audio 16kHz per sottotitoli, asset per Remotion |
| Impeccable / UI-UX Pro Max | skill installate | Standard grafici anti-slop, audit qualità |
| Remotion skills | skill installate | markup, captions, render, studio, interactivity |

## 5 bis. Pipeline "Logo Reveal 3D" (60 FPS)

Quando viene richiesto un logo reveal 3D da un'immagine raster:

1. **Vettorializzazione**: converti il raster in `assets_blender/logo_source.svg` (simbolo + testo).
2. **Pulizia topologica (critico, evita linee diagonali/fantasma)**: in Blender Edit Mode → Separate > By Loose Parts; ogni spline deve essere una **curva chiusa** (Cyclic Spline); rimuovi vertici isolati e connessioni spurie tra simbolo e testo.
3. **Modellazione**: estrusione sull'asse Z; materiale neon Emission `#C8104E` per il tracciamento; corpo metallic/glass; sfondo `#EBEBEB`; Area Light con ombre morbide. Salva in `assets_blender/logo_animato.blend`.
4. **Animazione 60 FPS** (300 frame = 5s): frame 0-150 tracciamento neon sui perimetri chiusi; frame 120-240 fade-in estrusione solida 3D. Export in `public/assets/logo_3d_render.mp4` a 60 FPS.
5. **Composizione**: usa `src/compositions/LogoReveal.tsx` (id `LogoReveal`, 1080x1920, 60fps, 300 frame): Layer 1 `<OffthreadVideo>` del render 3D, Layer 2 `<Sparkle>` (frame ~200), Layer 3 `<Audio>` con SFX da `public/audio/`.

## 5 ter. Modulo audio (royalty-free)

L'agente Audio & Sottotitoli cerca e scarica musica di sottofondo SOLO tramite:

```bash
node scripts/fetch-audio.mjs "<mood/genere>" <nome_file>
```

Lo script (yt-dlp via `uvx yt-dlp` o binario `yt-dlp`) aggiunge automaticamente alla query i termini obbligatori **"Royalty Free / No Copyright Music / Creative Commons"** e salva in `public/audio/<nome>.mp3`. In Remotion: `<Audio src={staticFile("audio/<nome>.mp3")} />`. MAI scaricare audio con copyright.

## 6. Convenzioni di cartelle

- `video_da_editare/` — input grezzi dell'utente (clip, audio)
- `video_renderizzati/` — output finali (consegna qui)
- `progetti/AAAA-MM-GG_nome/` — lavoro per singolo video (`brief.md`, `project-state.md`, `media/`, `output/`); template in `progetti/_template/`
- `public/` — asset statici referenziati con `staticFile()`
- `.agent/memory/<agente>/knowledge.md` — memoria persistente di ogni agente (leggi prima, aggiorna dopo)
- `graphify-out/` — knowledge graph (non editare a mano; rigenera con `graphify update .`)
- `assets_blender/` — sorgenti 3D (`logo_source.svg`, `logo_animato.blend`, ignorato da git)
- `public/audio/` — tracce audio/SFX scaricate con `scripts/fetch-audio.mjs` (solo royalty-free)
- `public/assets/` — render finali esportati da Blender (es. `logo_3d_render.mp4`)
- `src/compositions/` — composizioni video principali (es. `LogoReveal.tsx`)
- `src/components/` — overlay e VFX 2D riusabili (es. `Sparkle.tsx`)
- `scripts/` — helper CLI (es. `fetch-audio.mjs`)

## 7. Comandi utili

```bash
npm run dev          # Remotion Studio (anteprima)
npm run lint         # eslint + tsc
npx remotion render src/index.ts <Comp> video_renderizzati/out.mp4
graphify query "<domanda sul progetto>"
ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1 <file>
```

## 8. Fase 2 (non ancora attiva)

Pubblicazione automatica YouTube/TikTok/Instagram: esclusa finché non vengono configurate le API. Non prometterla, non tentarla.
