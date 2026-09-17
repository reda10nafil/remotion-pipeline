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

## 2. Struttura di cartelle

```
/ (radice progetto)
├── src/                          # già esistente (componenti Remotion)
├── public/                       # già esistente
├── .agent/
│   ├── agents/                   # un file .md per ciascun agente
│   │   ├── coordinatore.md
│   │   ├── script.md
│   │   ├── editing-remotion.md
│   │   ├── audio-sottotitoli.md
│   │   ├── qa-revisione.md
│   │   ├── ricerca-marketing.md
│   │   └── grafica-3d.md
│   ├── skills/                   # skill locali custom del progetto
│   │   ├── coordination-playbook/SKILL.md
│   │   ├── video-hook-writing/SKILL.md
│   │   ├── remotion/SKILL.md
│   │   └── ui-ux-pro-max/       # già installata
│   ├── memory/                   # "secondo cervello" di ogni agente
│   │   ├── coordinatore/knowledge.md
│   │   ├── script/knowledge.md
│   │   ├── editing-remotion/knowledge.md
│   │   ├── audio-sottotitoli/knowledge.md
│   │   ├── qa-revisione/knowledge.md
│   │   ├── ricerca-marketing/knowledge.md
│   │   └── grafica-3d/knowledge.md
│   └── mcp_config.json
├── progetti/                     # una sottocartella per ogni video prodotto
│   └── _template/
│       ├── brief.md
│       ├── project-state.md
│       └── output/
└── docs/
    └── PRD.md                    # questo documento
```

---

## 3. Architettura degli agenti

Un solo **coordinatore** più sei agenti specializzati.

### 3.1 Coordinatore
- **Ruolo:** riceve il brief dall'utente, lo scompone in compiti, decide l'ordine, assegna ogni compito all'agente giusto, aggrega i risultati, aggiorna `project-state.md`.
- **Competenze:** playbook di scomposizione/instradamento (skill `coordination-playbook`).
- **Strumenti MCP:** nessuno esterno; solo lettura/scrittura file di progetto.
- **Memoria:** `.agent/memory/coordinatore/knowledge.md`
- **Non fa:** non scrive mai direttamente codice Remotion o testo dello script.

### 3.2 Agente Script
- **Ruolo:** scrive la sceneggiatura: hook iniziale, struttura narrativa, ritmo, call-to-action finale.
- **Competenze:** skill locale `video-hook-writing`.
- **Strumenti MCP:** ricerca web.
- **Memoria:** `.agent/memory/script/knowledge.md`

### 3.3 Agente Editing Remotion
- **Ruolo:** trasforma lo script in composizione Remotion + overlay/grafica con 21st.dev Magic.
- **Competenze:** Remotion Skill ufficiale, MCP 21st.dev Magic, skill `ui-ux-pro-max` + `impeccable`.
- **Memoria:** `.agent/memory/editing-remotion/knowledge.md`

### 3.4 Agente Audio & Sottotitoli
- **Ruolo:** genera sottotitoli sincronizzati, gestisce musica e mix audio.
- **Competenze:** pacchetti nativi Remotion (`@remotion/captions`).
- **Memoria:** `.agent/memory/audio-sottotitoli/knowledge.md`

### 3.5 Agente QA/Revisione
- **Ruolo:** controlla il render + audit Impeccable su elementi grafici/UI.
- **Memoria:** `.agent/memory/qa-revisione/knowledge.md`

### 3.6 Agente Ricerca Marketing
- **Ruolo:** cerca tendenze di editing, formati, tecniche di hook/retention.
- **Memoria:** `.agent/memory/ricerca-marketing/knowledge.md` (condivisa in lettura).

### 3.7 Agente Grafica 3D
- **Ruolo:** crea asset 3D via MCP Blender. Non tocca codice Remotion.
- **Memoria:** `.agent/memory/grafica-3d/knowledge.md`

---

## 4. Sistema di memoria

Ogni agente ha un file `knowledge.md`. Formato di ogni voce:
```
### AAAA-MM-GG — [nome-video]
- Cosa ha funzionato: ...
- Cosa evitare la prossima volta: ...
```

Ciclo obbligatorio:
1. Prima di iniziare: legge il proprio `knowledge.md`.
2. Dopo aver finito: aggiunge 2-5 righe di sintesi.
3. Consolidamento ogni 10-15 voci.

---

## 5. MCP installati

1. **Blender** (porta 9876) — asset 3D
2. **21st.dev Magic** — componenti UI
3. **Ruflo** — orchestrazione (versione ≥ 3.16.3, solo locale)

Esclusi: qualunque MCP di pubblicazione (Fase 2).

---

## 6. Flusso operativo

1. Utente scrive il brief in `progetti/AAAA-MM-GG_nome-video/brief.md`.
2. Coordinatore legge il brief, crea `project-state.md`, assegna compiti.
3. Script produce lo script.
4. Editing Remotion monta il video.
5. Audio & Sottotitoli prepara audio e sottotitoli.
6. Coordinatore assembla, passa a QA/Revisione.
7. QA controlla; se ok consegna, se no torna al Coordinatore.
8. Ogni agente aggiorna il proprio `knowledge.md`.
