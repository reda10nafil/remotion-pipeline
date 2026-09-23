# Tutorial Rimotion — Pipeline Agenti Video

Guida completa per usare Rimotion con la pipeline di agenti coordinati per la produzione automatica di video.

---

## Indice

1. [Cos'è la pipeline](#1-cosè-la-pipeline)
2. [Comando rapido "Attiva Remotion"](#1-bis-comando-rapido-attiva-remotion-memorizzato-nel-repository)
3. [Struttura del progetto](#2-struttura-del-progetto)
4. [Come creare un nuovo video](#3-come-creare-un-nuovo-video)
5. [Comandi disponibili](#4-comandi-disponibili)
6. [Esempi di prompt](#5-esempi-di-prompt)
7. [Gli agenti — chi fa cosa](#6-gli-agenti--chi-fa-cosa)
8. [Sistema di memoria](#7-sistema-di-memoria)
9. [Strumenti MCP, Skill e Tool](#8-strumenti-mcp-skill-e-tool)
10. [Knowledge Graph (Graphify)](#8-bis-knowledge-graph-graphify--a-cosa-serve)
11. [Esempi d'uso delle nuove funzionalità](#8-ter-esempi-duso-delle-nuove-funzionalità)
12. [Troubleshooting](#9-troubleshooting)

---

## 1. Cos'è la pipeline

La pipeline comprende **10 ruoli AI coordinati**. Il Coordinatore attiva gli specialisti pertinenti per produrre:
- Sceneggiatura completa
- Montaggio (codice Remotion)
- Audio e sottotitoli
- Asset 3D (se necessari)
- Controllo qualità

**Tu dai il brief → il sistema produce il video pronto per la revisione.**

L'automazione prosegue per le fasi reversibili e chiede intervento quando una fase essenziale dipende da server/GUI/login/file non disponibile o da una decisione che il brief non contiene.

---

## 1 bis. Comando rapido: **"Attiva Remotion"** (memorizzato nel repository)

Il comando `Attiva Remotion` è **memorizzato in modo permanente nel repository** (in `CLAUDE.md`, `GEMINI.md` e in questo tutorial): qualsiasi piattaforma AI che apre il progetto (Antigravity, Codex, Cursor, Claude Code, Gemini CLI...) lo riconosce automaticamente in ogni nuova chat.

### Come usarlo

```
Attiva Remotion e fammi un video che parla di [argomento]
```
es. *"Attiva Remotion e fammi un video che parla di sport"*

### Cosa succede

1. **Ruolo istantaneo**: l'agente assume il ruolo di **Video Creative Director** — l'unica interfaccia tra te e la pipeline.
2. **Intervista di regia mirata** (breve ed elegante):
   - **Obiettivo e piattaforma**: Reel/TikTok verticale o YouTube orizzontale?
   - **Durata & ritmo**: short da 30s ad alta intensità o video medio da 1-2 minuti?
   - **Mood & stile visivo**: dark energetic, minimal motion graphics, tech, neon?
   - **Materiali**: hai caricato video/foto in `video_da_editare/` o creiamo tutto da codice, grafica e 3D Blender?
   - **Sottotitoli & audio**: sottotitoli word-by-word con karaoke highlight, musica ritmata?
3. **Pitch di regia**: ricevute le risposte, presenta il piano (Vision, Hook 0-3s, Storyboard a blocchi) in formato pulito, senza emoji infantili o slop visivo.
4. **Produzione e render**: coordina Ricerca, Script, Design System, Editing, Blender, Audio, Pipeline Tecnica e QA secondo le dipendenze; dopo il gate QA renderizza e verifica l'MP4. Se un passaggio essenziale richiede una GUI, un server, login o file mancante, fermati e chiedi l'intervento esatto.

---

## 2. Struttura del progetto

```
Rimotion/
├── video_da_editare/       ← Trascina qui le tue clip grezze, audio o registrazioni
├── video_renderizzati/     ← Qui trovi i video finali renderizzati pronti da guardare
├── src/                    ← codice Remotion (componenti e scene video)
├── public/                 ← asset statici (immagini, font, audio)
├── .agent/
│   ├── agents/             ← definizione ruoli agenti (10 file .md)
│   ├── skills/             ← competenze specializzate (coordination, hook, color-system, video-frame-tools, impeccable)
│   ├── memory/             ← "secondo cervello" di ogni agente (knowledge.md)
│   └── mcp_config.json     ← server MCP configurati (Blender, 21st.dev Magic, Graphify)
├── .agents/skills/         ← skill cross-framework (graphify, impeccable, remotion-*)
├── graphify-out/           ← knowledge graph del progetto (graph.json + report HTML)
├── CLAUDE.md / AGENTS.md / GEMINI.md ← istruzioni universali per ogni piattaforma AI
├── progetti/               ← un video = una sottocartella di lavoro
│   └── _template/          ← template per nuovi video (gestito in automatico dall'AI)
│       ├── brief.md
│       ├── project-state.md
│       └── output/
└── Pipeline agenti/        ← documentazione e guide della pipeline
```

---

## 3. Come creare un nuovo video

### 🚀 Metodo 1 — Diretto e Rapido (Consigliato)
Non serve compilare file o creare cartelle manualmente:

1. **(Opzionale) Posiziona il materiale grezzo:**  
   Se hai clip video, registrazioni o file audio, trascinali in `video_da_editare/`.
2. **Scrivi la tua idea nella chat di Antigravity:**  
   Basta una frase in italiano semplice, ad esempio:  
   > *"Ho messo una clip in video_da_editare/demo.mp4. Crea un reel di 30 secondi per TikTok con hook accattivante, sottotitoli animati parola per parola e una transizione moderna."*  
   oppure (senza video di partenza):  
   > *"Crea un video motion graphics di 45 secondi su 3 consigli per programmatori React."*
3. **La pipeline fa tutto in autonomia:**  
   L'agente Coordinatore crea la cartella in `progetti/`, compila il brief e lo stato, assegna le parti a Script, Editing, Audio, Grafica 3D e QA.
4. **Guarda il risultato:**  
   Puoi vedere l'anteprima in Remotion Studio (`npm run dev`) e troverai il file finale esportato in `video_renderizzati/`.

---

### 📝 Metodo 2 — Strutturato / Manuale (Avanzato)
Se preferisci preparare in anticipo un brief dettagliato e strutturato:
1. Copia `progetti/_template/` in `progetti/AAAA-MM-GG_nome-video/`.
2. Compila i campi in `progetti/AAAA-MM-GG_nome-video/brief.md`.
3. Scrivi in chat: *"Leggi il brief in progetti/AAAA-MM-GG_nome-video/brief.md e avvia la produzione."*
4. Quando il QA approva, il video viene esportato in `video_renderizzati/` e nella cartella `output/` del progetto.

---

## 4. Comandi disponibili

### Comandi di produzione video

| Comando | Cosa fa |
|---|---|
| `Attiva Remotion e fammi un video su [argomento]` | **Comando primario:** attiva il Creative Director, avvia l'intervista di regia e prepara la produzione |
| `Crea un nuovo video su [argomento]` | Avvia la pipeline completa |
| `Scrivi solo lo script per [argomento]` | Attiva solo l'agente Script |
| `Monta il video dallo script in [percorso]` | Attiva solo l'agente Editing |
| `Aggiungi sottotitoli al video` | Attiva l'agente Audio & Sottotitoli |
| `Controlla la qualità del render` | Attiva l'agente QA/Revisione |
| `Cerca tendenze su [argomento]` | Attiva l'agente Ricerca Marketing |
| `Crea un asset 3D: [descrizione]` | Attiva l'agente Grafica 3D |

### Comandi di gestione

| Comando | Cosa fa |
|---|---|
| `Mostra lo stato del progetto` | Legge `project-state.md` |
| `Mostra la memoria di [agente]` | Legge il `knowledge.md` dell'agente |
| `Consolida le memorie` | Chiede agli agenti di sintetizzare i propri knowledge.md |
| `remotion studio` / `npm run dev` | Avvia il preview Remotion nel browser |
| `remotion render` | Renderizza il video finale |

### Comandi Impeccable (per la qualità grafica)

| Comando | Cosa fa |
|---|---|
| `/impeccable audit` | Controlla layout, qualità tecnica, accessibilità |
| `/impeccable polish` | Corregge spaziature, font, dettagli |
| `/impeccable critique` | Trova problemi di design con punteggio |
| `/impeccable animate` | Aggiunge micro-interazioni smooth |

---

## 5. Esempi di prompt

### Esempio 1 — Video short completo (TikTok/Reels)

```
Crea un video short di 30 secondi per TikTok su "5 trucchi CSS che non conosci".
Tono: informale e veloce.
Hook: inizia con il risultato finale (before/after).
Musica: ritmo energico.
Sottotitoli: stile moderno, parola per parola.
```

### Esempio 2 — Video medio per YouTube

```
Produci un video di 2 minuti per YouTube su "Come funziona l'AI nel 2026".
Formato: video medio con grafica a schermo.
Tono: professionale ma accessibile.
Includi: overlay con dati, transizioni fluide, sottotitoli sincronizzati.
CTA finale: "Iscriviti per altri contenuti tech".
```

### Esempio 3 — Solo sceneggiatura

```
Scrivi solo lo script per un reel Instagram di 20 secondi.
Argomento: "Il miglior strumento di produttività che nessuno usa".
Struttura: hook provocatorio → spiegazione rapida → CTA.
Non montare il video, consegna solo il testo dello script.
```

### Esempio 4 — Asset 3D

```
Crea un logo 3D animato del testo "RIMOTION" con effetto metallico.
Rotazione smooth di 360° in 3 secondi.
Sfondo trasparente.
Esporta come sequenza PNG per importare in Remotion.
```

### Esempio 5 — Ricerca tendenze

```
Cerca le tendenze di editing video più popolari su TikTok questo mese.
Focus su: transizioni, stili di testo, formati che funzionano.
Salva le note nella memoria dell'agente Ricerca Marketing.
```

### Esempio 6 — Revisione qualità

```
Controlla il render del video in progetti/2026-09-17_tutorial-python/output/.
Verifica: timing, leggibilità sottotitoli, coerenza con il brief.
Esegui un audit Impeccable sugli overlay.
```

### Esempio 7 — Workflow completo con brief dettagliato

```
Ho compilato il brief in progetti/2026-09-18_react-hooks/brief.md.
Avvia la produzione completa:
1. Script con hook ad effetto
2. Editing con transizioni moderne
3. Sottotitoli word-by-word
4. Musica di sottofondo
5. QA finale con audit Impeccable
Mostrami il project-state aggiornato dopo ogni fase.
```

### Esempio 8 — Iterazione su un video esistente

```
Il QA ha trovato problemi con il timing dei sottotitoli nel video
progetti/2026-09-17_tutorial-python/.
Correggi i sottotitoli mantenendo tutto il resto invariato.
Mostrami il project-state aggiornato.
```

### Esempio 9 — Stile specifico

```
Crea un video short in stile "motion graphics" con:
- Sfondo scuro (#0a0a0a)
- Testo animato in bianco con accenti color #00ff88
- Transizioni con ease-out
- Font: Inter Bold per i titoli, Inter Regular per il body
- Nessuna musica, solo testo su schermo
Argomento: "3 motivi per imparare TypeScript"
```

### Esempio 10 — Batch di video

```
Crea 3 video short da 15 secondi ciascuno, tutti sullo stesso tema "Tips JavaScript":
1. "Destructuring in 15 secondi"
2. "Optional chaining spiegato"
3. "Nullish coalescing operatore"
Usa lo stesso stile visivo per tutti e tre.
```

---

## 6. Gli agenti — chi fa cosa

| Agente | Responsabilità | Strumenti |
|---|---|---|
| **Coordinatore** | Scompone brief, assegna compiti, aggrega risultati | Nessun MCP esterno |
| **Script** | Sceneggiatura, hook, narrativa, CTA | Ricerca web nativa |
| **Editing Remotion** | Codice Remotion, scene, transizioni, overlay | 21st.dev Magic, ui-ux-pro-max, impeccable |
| **Audio & Sottotitoli** | Sottotitoli sincronizzati, musica, mix audio | @remotion/captions |
| **QA/Revisione** | Controllo qualità, audit Impeccable | Browser Antigravity, Impeccable |
| **Ricerca Marketing** | Tendenze, best practice, analisi mercato | Ricerca web nativa |
| **Grafica 3D** | Asset 3D, loghi, intro, animazioni 3D | MCP Blender (porta 9876) |
| **Ricerca e Fact-Checking** | Dossier verificabili e claim-id | Fonti primarie e peer-reviewed |
| **Design System** | Token, tipografia, palette, diagrammi e accessibilità | Skill di design e color-system |
| **Pipeline Tecnica** | Integrazione Blender/Remotion, manifest e diagnostica export | CLI locali |

### Regole importanti
- Ogni agente lavora nel suo ambito, legge il proprio dossier/memoria e documenta l'handoff.
- Se un compito non è di sua competenza, lo rimanda al Coordinatore.
- Un asset 3D richiesto deve rappresentare componenti reali/funzioni identificate; un'icona o una primitiva non sostituiscono il macchinario.
- Se una fase essenziale richiede un server/GUI/file non disponibile, si registra l'errore e si chiede l'intervento minimo. Vietato fingere un successo o consegnare un surrogato non concordato.
- L'agente Grafica 3D non tocca MAI il codice Remotion.
- L'agente Script non fa MAI editing visivo.

### Modellazione didattica e passaggio Blender → Remotion

1. Prima di modellare, il Fact-Checker documenta i componenti reali e il Design System decide colori, gerarchia e convenzioni grafiche.
2. Suddividi l'apparato in camera, supporti, bobine, sorgente/oggetto studiato e strumenti di misura; una sezione o un cutaway deve rendere leggibile ciò che normalmente sarebbe nascosto.
3. Anima stati osservabili in ordine causale: stato iniziale, avvio, regime o evento, misure/test. Non inventare numeri, soglie o controlli che le fonti non supportano.
4. Se geometria, luce o trasparenza rendono il modello illeggibile, crea una preview statica e correggi inquadratura e occlusioni prima del render animato.
5. Etichetta modello e dati come schema, non in scala, visualizzazione qualitativa o simulazione secondo ciò che è effettivamente vero. Non presentare tracce illustrative come misura scientifica.
6. Per l'handoff usa sequenza d'immagini o video con nomi deterministici, risoluzione, fps e manifest dichiarati. Remotion sincronizza con `useCurrentFrame`; verifica il frame iniziale, uno intermedio, uno finale e i metadati del file esportato.
7. Se una fase dipende da Blender GUI/MCP non disponibile e la CLI non basta, arresta quella fase: registra l'errore preciso e chiedi l'intervento necessario.

---

## 7. Sistema di memoria

Ogni agente ha un "secondo cervello" in `.agent/memory/<nome-agente>/knowledge.md`.

### Come funziona
1. **Prima di ogni compito**: l'agente legge la sua memoria.
2. **Dopo ogni compito**: aggiunge 2-5 righe su cosa ha funzionato e cosa evitare.
3. **Ogni 10-15 video**: l'agente consolida la memoria (elimina duplicati, sintetizza).

### Esempio di voce nella memoria
```
### 2026-09-17 — tutorial-python
- Cosa ha funzionato: hook con domanda retorica + risultato anticipato = retention alta.
- Cosa evitare la prossima volta: non usare più di 3 font diversi in un short, troppo confusionario.
```

### La memoria di Ricerca Marketing è speciale
È leggibile anche dal Coordinatore e dall'agente Script, così le tendenze trovate influenzano direttamente la produzione dei video successivi.

---

## 8. Strumenti MCP, Skill e Tool

### Server MCP (configurati in `.agent/mcp_config.json`)

| MCP | Tipo | Usato da | Scopo |
|---|---|---|---|
| **Blender MCP** | MCP Server (porta 9876) | Grafica 3D | Modellazione, animazione, rendering ed esportazione asset 3D |
| **21st.dev Magic** | MCP (`@21st-dev/cli@latest`) | Editing Remotion | Generazione componenti UI, card e overlay moderni |
| **Graphify MCP** | MCP (`graphify-mcp`, 10 tool) | Tutti gli agenti | Query sul knowledge graph del progetto: `query_graph`, `shortest_path`, `god_nodes`... Risposte con citazioni file:riga precise |

### Skill di progetto

| Skill | Percorso | Usata da | Scopo |
|---|---|---|---|
| **Graphify** | `.agents/skills/graphify/` | Tutti | Domande su codebase/architettura: `graphify query`, `graphify explain`, `graphify path`. Dopo modifiche al codice: `graphify update .` |
| **Color System** | `.agent/skills/color-system/SKILL.md` | Editing, QA | Palette con `culori` + `chroma-js`: contrasto WCAG, interpolazione OKLCH, scale armoniche, checklist QA contrasto |
| **Video Frame Tools** | `.agent/skills/video-frame-tools/SKILL.md` | Editing, Audio, QA | Ricette FFmpeg pronte: metadati, estrazione frame, split clip, audio 16kHz per whisper/sottotitoli, storyboard, GIF di anteprima, asset per Remotion |
| **UI/UX Pro Max** | Skill di Progetto | Editing Remotion | Design system coerente, palette colori e tipografia |
| **Impeccable** | Skill di Progetto | QA & Editing | Standard anti-slop, WCAG AA contrast, comandi `/impeccable audit` e `/impeccable polish` |
| **Video Hook Writing** | Skill di Progetto | Script | Tecniche di apertura nei primi 3s, retention e CTA |
| **Coordination Playbook** | Skill di Progetto | Coordinatore | Regole di scomposizione e sequenziamento pipeline |

### Tool di sistema installati

| Tool | Verifica | Scopo |
|---|---|---|
| **FFmpeg** | `ffmpeg -version` | Estrazione frame, split clip, audio per sottotitoli, storyboard, GIF anteprima |
| **Graphify CLI** | `graphify --version` | Knowledge graph del progetto in `graphify-out/` (grafo + report HTML interattivo) |
| **culori + chroma-js** | pacchetti npm | Contrasto WCAG, interpolazione colore OKLCH, palette armoniche |

> **Nota:** La ricerca web per mercati e trend è integrata nativamente nella piattaforma per gli agenti Script e Ricerca Marketing.  
> La pubblicazione automatica su social network è riservata alla Fase 2 dopo l'integrazione delle relative chiavi API.

### Requisiti MCP
- **Blender:** Blender in esecuzione con l'addon MCP attivo sulla porta 9876.
- **21st.dev:** login effettuato con `npx -y @21st-dev/cli@latest login`.
- **Graphify:** grafo già generato in `graphify-out/`. L'estrazione semantica dei documenti richiede una `GEMINI_API_KEY` (gratuita) o `ANTHROPIC_API_KEY` valida; il grafo del codice è locale e gratuito. Dopo modifiche importanti al codice: `graphify update .`.

La tabella di verifica ambiente e delle alternative locali è in `CLAUDE.md` §3. La verifica non autorizza installazioni: se manca un requisito essenziale e non esiste un'alternativa, registra il blocco e chiedi l'intervento preciso.

---

## 8 bis. Knowledge Graph (Graphify) — a cosa serve

Graphify ha costruito un grafo dell'intero progetto (migliaia di nodi e archi, comunità di codice correlate) salvato in `graphify-out/`:

- **Per gli agenti:** invece di cercare a tentoni nel codice, interrogano il grafo (`graphify query "come funziona la composizione Tutorial"`) e ottengono risposte con riferimenti `file:riga` precisi → modifiche più accurate e veloci.
- **Per te:** apri `graphify-out/graph.html` nel browser per esplorare visivamente come sono collegati componenti, scene e agenti.
- **Dopo modifiche al codice:** chiedi "aggiorna il grafo" oppure esegui `graphify update .`.

---

## 8 ter. Esempi d'uso delle nuove funzionalità

### Esempio — Interrogare il grafo
```
Usa Graphify per spiegarmi come è collegata la scena IntroScene al resto della composizione Tutorial.
```

### Esempio — Video con palette verificata
```
Attiva Remotion e fammi un reel da 30s su "3 scorciatoie da tastiera".
Mood: dark tech. Verifica il contrasto dei testi con la skill color-system (WCAG AA).
```

### Esempio — Clip esistente con sottotitoli FFmpeg
```
Ho messo demo.mp4 in video_da_editare/. Estrai l'audio a 16kHz con FFmpeg,
genera i sottotitoli word-by-word e monta il reel con karaoke highlight.
```

---

## 9. Troubleshooting

### "Il video non si renderizza"
1. Leggi l'errore completo e verifica runtime/versioni già presenti; non aggiornare o installare pacchetti automaticamente.
2. Controlla gli errori del render e usa la preview solo come diagnosi, non come output finale.
3. Verifica che il codice usi `useCurrentFrame()` e `interpolate()`, non animazioni CSS pure che congelano nei frame.

### "I sottotitoli non sono sincronizzati"
1. Verifica che `@remotion/captions` sia installato.
2. Controlla il timing dei frame nel codice di sincronizzazione.
3. Chiedi all'agente QA un controllo automatico del timing.

### "L'asset 3D non appare"
1. Verifica separatamente Blender CLI, GUI e MCP/porta; la presenza dell'app non prova che il server sia attivo.
2. Controlla file, codec, durata, alpha, fps e path; apri un frame render di controllo.
3. Se serve una GUI/MCP non attiva, registra l'errore e chiedi all'utente di avviarla. Un logo o un toro stilizzato non sostituisce una ricostruzione funzionale richiesta.
4. Solo dopo la verifica importa il file con `staticFile("nome-asset.png")` o `<OffthreadVideo>` nel componente Remotion.

### "Un agente non risponde come previsto"
1. Controlla il suo file `.agent/agents/<nome>.md` per verificare il ruolo.
2. Leggi il suo `knowledge.md` in `.agent/memory/<nome>/` per errori segnalati in passato.
3. Riavvia la pipeline dal Coordinatore.

### "Come resetto la memoria di un agente?"
Cancella il contenuto sotto la linea `---` nel file `knowledge.md` dell'agente, mantenendo l'header con il formato.

---

## Quick Start (Pronti in 30 secondi)

```bash
# 1. Avvia l'anteprima visiva interattiva di Remotion
npm run dev

# 2. Crea un video parlando con Antigravity:
# "Crea un reel di 30s sul tema XYZ con hook accattivante e sottotitoli dinamici"

# 3. Oppure esporta direttamente da linea di comando:
npx remotion render src/index.ts NomeComposizione video_renderizzati/output.mp4
```
