# CLAUDE.md — Rimotion: Pipeline Agenti Video (Remotion)

> File di istruzioni universale del progetto. Vale per Claude Code e, tramite `AGENTS.md`, per qualsiasi altra piattaforma di sviluppo AI (Codex, Cursor, Gemini CLI, Antigravity, Bionic...).

## 1. Cos'è questo progetto

**Rimotion** è una pipeline riutilizzabile per produrre video con React, Remotion e Blender. Dieci ruoli specializzati coprono coordinamento, ricerca di fatti, script, design system, montaggio, audio e sottotitoli, 3D, integrazione tecnica, QA e ricerca di mercato. Non tutti servono per ogni progetto: il Coordinatore sceglie i ruoli necessari in base al brief. Il risultato renderizzato va in `video_renderizzati/` e nella cartella del progetto.

Il repository deve restare generico: non trasferire in istruzioni, esempi, template, memorie condivise o commit pubblici marchi, CTA, dati o asset di un progetto precedente, salvo richiesta esplicita. Non incorporare nomi di clienti o canali negli aggiornamenti generali.

Documentazione completa: `Pipeline agenti/TUTORIAL-RIMOTION-PIPELINE.md` e `docs/PRD.md`.

## 2. Come comportarsi

1. **Interfaccia unica**: l'utente parla solo con il **Coordinatore / Creative Director**. Comunicazione elegante e strutturata, stile agenzia di produzione d'élite. Niente emoji casuali, niente slop visivo.
2. **Ricezione del brief**: raccogli solo le preferenze essenziali mancanti (pubblico, piattaforma/aspect ratio, durata, tono, materiali e diritti); nel frattempo porta avanti le parti indipendenti. Distingui una proposta di direzione visiva dalla ricerca fattuale.
3. **Ruoli agenti**: leggi `.agent/agents/<nome>.md` e `.agent/memory/<nome>/knowledge.md` prima di operare. Rispetta gli ambiti, registra gli handoff in `project-state.md` e aggiorna le memorie pertinenti dopo il lavoro (2–5 righe, preservando intestazioni e modelli).
4. **Render automatico obbligatorio**: MAI chiedere se renderizzare. A composizione + QA completati:
   ```bash
   npx remotion render src/index.ts <CompositionId> video_renderizzati/<nome-video>.mp4
   ```
5. **Qualità visiva**: definisci un sistema visivo per ogni progetto prima di costruire le scene (token, palette, type scale, griglia, safe areas, regole diagrammi e movimento). Applica contrasto WCAG AA come target per il testo, controllato sul colore effettivo e sul frame peggiore. Evita preset/ornamenti generici quando non aiutano la comprensione.
6. **Token-first**: colori, spaziature, tipografia, motion curves e z-layers vivono in `tokens.ts` della composizione, mai duplicati nei componenti. Per le scelte colore usa `.agent/skills/color-system/SKILL.md` (`culori` + `chroma-js`).
7. **Niente animazioni CSS pure** nei video: usa `useCurrentFrame()`, `interpolate()`, `spring()` o i controlli Remotion compatibili col render deterministico. Video nelle composizioni solo con `<OffthreadVideo>`.
8. **Verità degli strumenti e stop gate**: verifica versione, processo, MCP/porta e file prima di dichiarare una risorsa attiva o un task completo. Se un passaggio indispensabile richiede l'intervento dell'utente (avvio GUI/server, login, permesso, media mancante o riferimento non verificabile), ferma quel passaggio, indica il fatto preciso e chiedi una singola azione utile. Porta avanti il lavoro indipendente; non fingere output, non inventare workaround e non ripetere tentativi identici.
9. **Installazioni e operazioni esterne**: non installare pacchetti, avviare server esposti, caricare file o pubblicare contenuti senza autorizzazione adeguata. Preferisci CLI locale già disponibile e alternative offline. Per GitHub, non committare file specifici di clienti, audio/video grezzi, credenziali o segreti; usa branch e pull request quando disponibili.
10. **Ricerca responsabile**: fatti esterni devono avere fonte aperta, URL diretto, data di consultazione e citazione o passaggio verificabile. Distingui fatti, stime, ipotesi e scelte visive. Se una fonte o citazione non si verifica, non presentare quel dettaglio come accertato.

## 3. Verifica ambiente — FAI QUESTO ALL'AVVIO

Prima di produrre, verifica gli strumenti disponibili. Questi controlli non autorizzano installazioni: se una dipendenza manca, usa un'alternativa locale già presente quando produce un risultato verificabile; altrimenti registra lo stop gate e chiedi l'azione necessaria. Non eseguire installazioni, login o aggiornamenti globali senza autorizzazione esplicita.

| Strumento | Verifica | Alternativa senza installazione | Necessario per |
|---|---|---|---|
| Node + npm | `node --version` (>= 18) | Ferma solo le fasi che dipendono da Node | tutto |
| Dipendenze progetto | `npm ls remotion @remotion/captions @remotion/three culori chroma-js` | Usa dipendenze già presenti; non modificare lockfile per aggirare un errore | pipeline |
| uv / uvx | `uvx --version` | CLI già installate o flusso senza MCP | Blender MCP, Graphify |
| FFmpeg | `ffmpeg -version` | `ffprobe`/strumenti già disponibili o ispezione locale equivalente | controllo media |
| Graphify CLI | `graphify --version` | Ricerca diretta nei file del repository | knowledge graph |
| yt-dlp (opzionale) | `yt-dlp --version` | Libreria audio fornita dall'utente o nessuna musica | download audio |
| Grafo Graphify | esiste `graphify-out/graph.json`? | Ometti il grafo e lavora sui file leggibili | query del grafo |
| Blender | `blender --version` o verifica del percorso locale | Blender MCP o asset alternativo concordato; mai fingere un render | agente Grafica 3D |
| Addon Blender MCP | verifica connessione e porta configurata | Se CLI Blender locale è disponibile, usala e verifica il file; altrimenti stop gate | Blender MCP |
| 21st.dev (opzionale) | verifica CLI e login solo se già configurato | Componenti locali del design system | componenti UI |

Alternative senza MCP: se Blender MCP non risponde, verifica se Blender CLI è disponibile e può completare il task in background. Usa la CLI solo se l'output può essere verificato. Se la richiesta richiede GUI o server MCP e nessuna alternativa locale è sufficiente, fermati e chiedi all'utente di avviarli. Non sostituire silenziosamente un modello 3D richiesto con un'icona, un toro generico o una grafica 2D. Se 21st.dev non è collegato, costruisci componenti locali con il design system esistente.

### Stop gate obbligatorio

Registra in `project-state.md`: operazione tentata, errore osservato, requisito che manca, cosa resta possibile svolgere e l'azione esatta richiesta all'utente. Non considerare la task completata finché l'azione bloccata non è risolta o il deliverable alternativo non è stato concordato.

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
- `progetti/AAAA-MM-GG_nome/` — lavoro per singolo video (`brief.md`, `project-state.md`, `design-system.md`, `cronologia.md`, `media/`, `output/`); template in `progetti/_template/`
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
