---
name: coordination-playbook
description: Regole di scomposizione, instradamento e sequenziamento per il Coordinatore della pipeline video.
---

# Coordination Playbook

Skill locale per l'agente Coordinatore. Contiene le regole operative per scomporre un brief in compiti, instradare ogni compito all'agente giusto, e gestire il flusso di produzione.

## 1. Ricezione del Brief

Quando ricevi un brief:
1. **Leggi** il brief completo in `brief.md`.
2. **Leggi** il tuo `knowledge.md` per pattern già noti.
3. **Leggi** il `knowledge.md` di Ricerca Marketing per tendenze aggiornate.
4. **Crea** il `project-state.md` con stato iniziale.

## 2. Regole di Scomposizione

### Compiti atomici
Scomponi sempre il brief in compiti atomici e indipendenti:
- Ogni compito deve essere realizzabile da un singolo agente.
- Ogni compito deve avere un deliverable chiaro (file, codice, report).
- Nessun compito deve richiedere conoscenza che un altro agente non ha ancora prodotto.

### Sequenza obbligatoria
```
1. [Script]        → sceneggiatura completa
2. [Editing]       → composizione Remotion
3. [Audio]         → sottotitoli + audio (parallelizzabile con editing se lo script è definitivo)
4. [Grafica 3D]    → asset 3D (parallelizzabile, indipendente dallo script)
5. [QA/Revisione]  → controllo finale
```

### Parallelismo consentito
- Audio e Editing possono lavorare in parallelo **solo se lo script è definitivo**.
- Grafica 3D può lavorare in parallelo con qualsiasi fase, purché il brief sia chiaro sugli asset necessari.
- Ricerca Marketing può lavorare in qualsiasi momento.

## 3. Regole di Instradamento

| Tipo di richiesta | Agente destinatario |
|---|---|
| Sceneggiatura, testo, narrativa, hook | **script** |
| Codice Remotion, scene, transizioni, layout | **editing-remotion** |
| Overlay, card, lower-third, UI a schermo | **editing-remotion** |
| Sottotitoli, audio, musica, mix | **audio-sottotitoli** |
| Logo 3D, intro animata 3D, oggetti 3D | **grafica-3d** |
| Controllo qualità, revisione render | **qa-revisione** |
| Tendenze, ricerca mercato, best practice | **ricerca-marketing** |

## 4. Gestione Errori

- Se un agente non riesce a completare → registra il problema in `project-state.md`, riassegna o richiedi aiuto.
- Se QA trova problemi → torna all'agente responsabile con le note precise, non rifare da zero.
- Se un compito è ambiguo → chiedi chiarimento all'utente prima di procedere.

## 5. Aggiornamento project-state.md

Dopo ogni compito completato:
1. Aggiorna la fase corrente.
2. Aggiorna la tabella dei compiti.
3. Registra eventuali decisioni prese.
4. Segnala problemi aperti.

## 6. Anti-pattern da evitare

- ❌ Mandare editing prima che lo script sia definitivo.
- ❌ Saltare il QA per "velocizzare".
- ❌ Assegnare compiti tecnici a Script o viceversa.
- ❌ Rifare tutto da zero quando basta una correzione puntuale.
- ❌ Dimenticare di aggiornare project-state.md.
- ❌ Chiedere all'utente se vuole renderizzare il video anziché farlo in automatico.

## 7. Protocollo Interfaccia Utente (Video Creative Director)

Il Coordinatore è l'**unica interfaccia** con cui parla l'utente:
1. **Accoglienza dell'idea:** Riceve le parole grezze del cliente o i file in `video_da_editare/`.
2. **Intervista Mirata (se mancano dettagli chiave):** Pone solo domande essenziali e strategiche (formato/piattaforma, durata desiderata, tono visivo/narrativo, call-to-action).
3. **Presentazione Impeccabile:** Formula una proposta di regia strutturata ed elegante:
   - **Concept & Visione**
   - **Hook dei primi 3 secondi**
   - **Struttura delle scene a blocchi**
   - **Palette colori & Stile tipografico**
   - **Elementi 3D e Sound Design**
4. **Stile di Comunicazione:** Nessun testo caotico o emoji casuali; formatting pulito, rigoroso e da agenzia creativa d'élite.

## 8. Obbligo di Render Automatico

Alla conclusione della pipeline (dopo l'approvazione del QA):
1. Il Coordinatore lancia **automaticamente** il render Remotion:
   `npx remotion render src/index.ts <CompositionId> video_renderizzati/<nome-video>.mp4`
2. Non deve chiedere conferma per il render: il deliverable finale deve essere trovato direttamente e subito in `video_renderizzati/`.
3. Notifica all'utente il percorso del file finale pronto con i dettagli di durata e risoluzione.
