# PRD — Pipeline di agenti coordinati per editing video (Remotion)

**Fase attuale:** solo produzione e test locali. Pubblicazione (YouTube/TikTok/Instagram) esclusa: nessuna API configurata. La pubblicazione è Fase 2 (vedi in fondo).

---

## 1. Obiettivo

Costruire, dentro il progetto Remotion esistente, un sistema di agenti coordinati capaci di:
- prendere un'idea di video e produrre in autonomia sceneggiatura, montaggio (codice Remotion), audio e sottotitoli;
- imparare nel tempo dai propri errori e successi (un "secondo cervello" persistente per ciascun agente);
- migliorare le proprie strategie di editing e di marketing attingendo a ricerche fatte sul web da un agente dedicato.

Non è richiesto nessun intervento umano nel montaggio linea per linea: l'utente dà il brief, il sistema produce una bozza di video pronta per la revisione.

---

## 2. Struttura di cartelle da creare

Antigravity deve creare/riorganizzare il repository così (il progetto Remotion esistente in `src/`, `public/`, ecc. resta dov'è, alla radice):

```
/ (radice progetto)
├── src/                          # già esistente (componenti Remotion)
├── public/                       # già esistente
├── .agent/
│   ├── agents/                   # un file .md per ciascun agente (system prompt, ruolo, tool ammessi)
│   │   ├── coordinatore.md
│   │   ├── script.md
│   │   ├── editing-remotion.md
│   │   ├── audio-sottotitoli.md
│   │   ├── qa-revisione.md
│   │   └── ricerca-marketing.md
│   ├── skills/                   # skill locali custom del progetto (SKILL.md)
│   │   ├── coordination-playbook/SKILL.md
│   │   └── video-hook-writing/SKILL.md
│   ├── memory/                   # "secondo cervello" di ogni agente — vedi sezione 4
│   │   ├── coordinatore/knowledge.md
│   │   ├── script/knowledge.md
│   │   ├── editing-remotion/knowledge.md
│   │   ├── audio-sottotitoli/knowledge.md
│   │   ├── qa-revisione/knowledge.md
│   │   └── ricerca-marketing/knowledge.md
│   └── mcp_config.json           # riferimento locale ai server MCP usati dal progetto (vedi sezione 5)
├── progetti/                     # una sottocartella per ogni video prodotto
│   └── _template/
│       ├── brief.md              # richiesta iniziale dell'utente
│       ├── project-state.md      # stato condiviso del progetto, letto/scritto dal coordinatore
│       └── output/               # render finali, bozze
└── docs/
    ├── PRD.md                    # questo documento
    └── prompt-setup-antigravity.md
```

Ogni nuovo video parte copiando `progetti/_template/` in `progetti/AAAA-MM-GG_nome-video/`.

---

## 3. Architettura degli agenti

Un solo **coordinatore** più cinque agenti specializzati. Nessun agente scrive codice o testo fuori dal proprio ambito: se un compito non rientra nelle sue competenze, lo rimanda al coordinatore.

### 3.1 Coordinatore
- **Ruolo:** riceve il brief dall'utente, lo scompone in compiti, decide l'ordine (es. lo script deve essere definitivo prima dei sottotitoli), assegna ogni compito all'agente giusto, aggrega i risultati, aggiorna `project-state.md`.
- **Competenze:** playbook di scomposizione/instradamento (skill `coordination-playbook`), nessuna competenza tecnica di editing.
- **Strumenti MCP:** nessuno esterno; solo lettura/scrittura file di progetto.
- **Memoria:** `.agent/memory/coordinatore/knowledge.md` — pattern di scomposizione che hanno funzionato, errori di sequenziamento da evitare.
- **Non fa:** non scrive mai direttamente codice Remotion o testo dello script.

### 3.2 Agente Script
- **Ruolo:** scrive la sceneggiatura: hook iniziale, struttura narrativa, ritmo, call-to-action finale, adattati al formato (short/reel vs video lungo).
- **Competenze:** skill locale `video-hook-writing` (tecniche di apertura, pacing, retention per contenuti brevi).
- **Strumenti MCP:** ricerca web (per argomento/trend), condivisa con l'agente Ricerca Marketing.
- **Memoria:** `.agent/memory/script/knowledge.md` — hook che hanno reso bene, strutture da evitare, note di stile personale dell'utente.

### 3.3 Agente Editing Remotion
- **Ruolo:** trasforma lo script in composizione Remotion: scene, timing, transizioni, testo animato, layout.
- **Competenze:** **Remotion Skill** ufficiale (`npx skills add remotion-dev/skills`, o equivalente per Antigravity: cartella `.agent/skills/remotion/SKILL.md`).
- **Strumenti MCP:** nessuno indispensabile — il rendering passa dal terminale/CLI di Remotion, già disponibile ad Antigravity.
- **Memoria:** `.agent/memory/editing-remotion/knowledge.md` — componenti/pattern di animazione riusabili, errori di rendering ricorrenti da non ripetere (es. artefatti con CSS animation invece di `useCurrentFrame`).

### 3.4 Agente Audio & Sottotitoli
- **Ruolo:** genera sottotitoli sincronizzati, gestisce musica di sottofondo e pulizia/mix audio.
- **Competenze:** funzionalità native di Remotion per caption e audio (es. pacchetti `@remotion/captions` e trascrizione locale) — **prima di cercare MCP esterni, verificare se questi pacchetti coprono già il bisogno**, per non aggiungere dipendenze inutili.
- **Strumenti MCP:** solo se serve trascrizione o librerie audio che Remotion non copre — vedi sezione 5, da verificare caso per caso.
- **Memoria:** `.agent/memory/audio-sottotitoli/knowledge.md` — preferenze di stile sottotitoli, librerie audio già usate e con licenza chiara.

### 3.5 Agente QA/Revisione
- **Ruolo:** controlla il render prima di consegnarlo: timing, leggibilità sottotitoli, durata rispetto al target, coerenza con il brief. Usa il browser integrato di Antigravity per ispezionare frame/anteprime.
- **Competenze:** checklist di qualità (da costruire e affinare nel tempo).
- **Strumenti MCP:** nessuno oltre agli strumenti nativi di anteprima/browser di Antigravity.
- **Memoria:** `.agent/memory/qa-revisione/knowledge.md` — difetti ricorrenti trovati e come sono stati corretti.

### 3.6 Agente Ricerca Marketing & Editing (impara dal web)
- **Ruolo:** periodicamente (o su richiesta del coordinatore) cerca sul web tendenze di editing, formati che funzionano, tecniche di hook/retention, novità su Remotion. Distilla in note sintetiche, non salva contenuti grezzi.
- **Competenze:** protocollo di ricerca: query mirate, preferenza per fonti primarie, sintesi breve.
- **Strumenti MCP:** ricerca web (se Antigravity/Gemini non la offre già nativamente, non serve installarne una a parte).
- **Memoria:** `.agent/memory/ricerca-marketing/knowledge.md` — condivisa in lettura con Coordinatore e Script.

---

## 4. Sistema di memoria — il "secondo cervello" di ogni agente

Ogni agente ha un solo file `knowledge.md` nella propria cartella sotto `.agent/memory/`. Non è un log grezzo: è un riassunto vivo che l'agente stesso mantiene.

**Ciclo obbligatorio per ogni agente, ad ogni compito:**
1. **Prima di iniziare:** legge il proprio `knowledge.md` (e quello di Ricerca Marketing, se pertinente).
2. **Dopo aver finito:** aggiunge in fondo al file 2-5 righe: cosa ha funzionato, cosa no, una regola da ricordare la prossima volta. Mai un log completo della sessione — solo la sintesi.
3. **Consolidamento periodico** (ogni 10-15 voci, o quando il coordinatore lo richiede): l'agente rilegge il proprio file, unisce i punti ripetuti, elimina ciò che è superato. Il file resta corto e utile invece di crescere all'infinito.

Formato di ogni voce:
```
### 2026-09-17 — [nome-video]
- Cosa ha funzionato: ...
- Cosa evitare la prossima volta: ...
```

---

## 5. MCP da installare ora (pubblicazione esclusa)

**Prima di tutto — nota di sicurezza su Ruflo:** Ruflo ha avuto una vulnerabilità critica divulgata (CVE-2026-59726, esecuzione di codice non autenticata sul bridge MCP) corretta nella versione 3.16.3. Prima di usarlo:
- installare/aggiornare esplicitamente alla 3.16.3 o successiva;
- non esporre il bridge MCP (porta 3001 di default) sulla rete: deve restare accessibile solo in locale;
- verificare che l'autenticazione sia attiva, non usare la configurazione di default esposta.

Elenco MCP per questa fase:
1. **Ruflo** — se lo si vuole usare per l'orchestrazione multi-agente vera e propria (in alternativa/aggiunta alla gestione via Agent Manager di Antigravity). Vedi nota sicurezza sopra.
2. **Ricerca web** — per l'agente Ricerca Marketing e per l'agente Script (verificare se già disponibile nativamente nel modello usato da Antigravity prima di aggiungerne uno).
3. **Trascrizione audio** (solo se i pacchetti nativi di Remotion non bastano) — da verificare al momento dell'installazione quali server MCP di trascrizione sono disponibili e mantenuti.

Esplicitamente **esclusi per ora**: qualunque MCP per pubblicazione/upload su YouTube, TikTok, Instagram o altri social — verranno aggiunti in Fase 2 quando saranno disponibili le credenziali API.

---

## 6. Skill da installare

- **Remotion Skill** (ufficiale, `remotion-dev/skills`) — competenza di base per Editing Remotion.
- **`coordination-playbook`** (locale, da scrivere) — regole di scomposizione ed instradamento per il Coordinatore.
- **`video-hook-writing`** (locale, da scrivere) — tecniche di apertura/ritmo/retention per l'agente Script.

---

## 7. Flusso operativo (esempio)

1. Utente scrive il brief in `progetti/AAAA-MM-GG_nome-video/brief.md`.
2. Coordinatore legge il brief, crea `project-state.md`, assegna il compito "scrivi lo script" a Script.
3. Script consulta la propria memoria e quella di Ricerca Marketing, produce lo script, lo consegna al Coordinatore.
4. Coordinatore valida che lo script sia completo, poi assegna "monta il video" a Editing Remotion.
5. Editing Remotion scrive/aggiorna i componenti in `src/`, produce una prima resa.
6. In parallelo (se lo script è già definitivo) Audio & Sottotitoli prepara sottotitoli e audio.
7. Coordinatore assembla i pezzi, passa tutto a QA/Revisione.
8. QA/Revisione controlla il render nel browser integrato; se ok, consegna all'utente; se no, torna al Coordinatore con note precise su cosa correggere.
9. Ogni agente coinvolto aggiorna il proprio `knowledge.md` con 2-5 righe di sintesi.

---

## 8. Fase 2 (non ora)

Quando saranno disponibili le API di pubblicazione: aggiungere un agente **Pubblicazione**, con MCP dedicati per YouTube/TikTok/Instagram, che pubblica solo dopo l'approvazione esplicita dell'utente in QA/Revisione. Da progettare a parte quando sarà il momento.

---

## 9. Criteri di successo per questa fase di test

- Il Coordinatore riesce a portare a termine un video da brief a render senza intervento manuale nel mezzo (salvo l'approvazione finale).
- Dopo 5-10 video, i file `knowledge.md` mostrano miglioramenti concreti e misurabili (meno correzioni richieste da QA/Revisione).
- Nessun MCP di pubblicazione installato per errore in questa fase.
