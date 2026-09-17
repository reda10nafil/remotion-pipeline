# Tutorial Rimotion — Pipeline Agenti Video

Guida completa per usare Rimotion con la pipeline di agenti coordinati per la produzione automatica di video.

---

## Indice

1. [Cos'è la pipeline](#1-cosè-la-pipeline)
2. [Struttura del progetto](#2-struttura-del-progetto)
3. [Come creare un nuovo video](#3-come-creare-un-nuovo-video)
4. [Comandi disponibili](#4-comandi-disponibili)
5. [Esempi di prompt](#5-esempi-di-prompt)
6. [Gli agenti — chi fa cosa](#6-gli-agenti--chi-fa-cosa)
7. [Sistema di memoria](#7-sistema-di-memoria)
8. [Strumenti MCP](#8-strumenti-mcp)
9. [Troubleshooting](#9-troubleshooting)

---

## 1. Cos'è la pipeline

La pipeline è un sistema di **7 agenti AI coordinati** che prendono un'idea di video e producono in autonomia:
- Sceneggiatura completa
- Montaggio (codice Remotion)
- Audio e sottotitoli
- Asset 3D (se necessari)
- Controllo qualità

**Tu dai il brief → il sistema produce il video pronto per la revisione.**

Non serve intervento manuale nel montaggio: l'unico momento in cui intervieni è:
- All'inizio (brief)
- Alla fine (approvazione)

---

## 2. Struttura del progetto

```
Rimotion/
├── video_da_editare/       ← Trascina qui le tue clip grezze, audio o registrazioni
├── video_renderizzati/     ← Qui trovi i video finali renderizzati pronti da guardare
├── src/                    ← codice Remotion (componenti e scene video)
├── public/                 ← asset statici (immagini, font, audio)
├── .agent/
│   ├── agents/             ← definizione ruoli agenti (7 file .md)
│   ├── skills/             ← competenze specializzate (coordination, hook, remotion, impeccable)
│   ├── memory/             ← "secondo cervello" di ogni agente (knowledge.md)
│   └── mcp_config.json     ← server MCP configurati (Blender, 21st.dev Magic)
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

### Regole importanti
- Ogni agente lavora SOLO nel suo ambito.
- Se un compito non è di sua competenza, lo rimanda al Coordinatore.
- L'agente Grafica 3D non tocca MAI il codice Remotion.
- L'agente Script non fa MAI editing visivo.

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

## 8. Strumenti MCP e Skill Integrate

| Strumento / MCP | Tipo | Usato da | Scopo |
|---|---|---|---|
| **Blender MCP** | MCP Server (porta 9876) | Grafica 3D | Modellazione, animazione, rendering ed esportazione asset 3D |
| **21st.dev Magic** | MCP (`@21st-dev/cli@latest`) | Editing Remotion | Generazione componenti UI, card e overlay moderni |
| **UI/UX Pro Max** | Skill di Progetto | Editing Remotion | Design system coerente, palette colori e tipografia |
| **Impeccable** | Skill di Progetto | QA & Editing | Standard anti-slop, WCAG AA contrast, comandi `/impeccable audit` e `/impeccable polish` |
| **Video Hook Writing** | Skill di Progetto | Script | Tecniche di apertura nei primi 3s, retention e CTA |
| **Coordination Playbook** | Skill di Progetto | Coordinatore | Regole di scomposizione e sequenziamento pipeline |

> **Nota:** La ricerca web per mercati e trend è integrata nativamente in Antigravity per gli agenti Script e Ricerca Marketing.  
> La pubblicazione automatica su social network è riservata alla Fase 2 dopo l'integrazione delle relative chiavi API.

### Requisiti MCP
- **Blender:** Blender in esecuzione con l'addon MCP attivo sulla porta 9876.
- **21st.dev:** Variabile d'ambiente `TWENTYFIRST_DEV_API_KEY` (configurabile con la tua chiave da 21st.dev).

---

## 9. Troubleshooting

### "Il video non si renderizza"
1. Verifica che Remotion sia aggiornato: `npm run upgrade`
2. Controlla gli errori nel terminale: `npm run dev`
3. Verifica che il codice usi `useCurrentFrame()` e `interpolate()`, non animazioni CSS pure che congelano nei frame.

### "I sottotitoli non sono sincronizzati"
1. Verifica che `@remotion/captions` sia installato.
2. Controlla il timing dei frame nel codice di sincronizzazione.
3. Chiedi all'agente QA un controllo automatico del timing.

### "L'asset 3D non appare"
1. Verifica che Blender sia in esecuzione con il MCP attivo.
2. Controlla che il file sia stato esportato nella cartella `public/` o `output/` (formato PNG con alpha o MP4).
3. Usa `staticFile("nome-asset.png")` per importarlo nel componente Remotion.

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
