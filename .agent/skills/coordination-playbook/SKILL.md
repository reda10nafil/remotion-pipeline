---
name: coordination-playbook
description: Scomposizione, routing, dipendenze, gate di qualità e stop per la pipeline video.
---

# Coordination Playbook

## Intake

1. Leggi il brief, le istruzioni repository e le memorie dei soli ruoli che attiverai.
2. Crea `project-state.md`, `decision-log.md` se utile e cartella `progetti/<data>_<slug>/` senza alterare altri progetti.
3. Registra durata, ratio, fps, pubblico, tono, canali di uscita, materiali, diritti e criteri di accettazione.
4. Non chiedere conferme per scelte reversibili; chiedi solo i dettagli che cambiano materialmente l'output. Continua le attività indipendenti mentre attendi.

## Routing

| Bisogno | Ruolo |
|---|---|
| Dati, citazioni e fonti | Ricerca e Fact-Checking |
| Voce, narrativa e CTA | Script |
| Colori, token, gerarchia e grafica dati | Design System |
| Scene e grafica animata | Editing Remotion |
| Modello o processo 3D | Grafica 3D |
| Versioni, manifest, codec e bridge | Pipeline Tecnica |
| TTS, mix, caption | Audio e Sottotitoli |
| Verifica integrata | QA/Revisione |
| Trend di formato/piattaforma | Ricerca Marketing (facoltativa) |

## Sequenza

```text
brief → progetto/stato → fonti verificate → script claim-bound
                            └──────────────→ visual direction/tokens
script + visual direction → storyboard → Blender + Remotion + audio + pipeline tech
integrazione → QA scientifico/visivo/audio/file → fix → render → ispezione → handoff
```

Mai far creare a Script dati mancanti. Gli asset visivi possono essere preparati in parallelo quando una fonte/brief fornisce confini chiari. Sottotitoli finali seguono la voce definitiva.

## Handoff minimo

Ogni assegnazione specifica input, output/path, claim-id o vincoli, ambiente/tool, criterio di accettazione e blocchi. L'agente registra l'esito in `project-state.md`; il Coordinatore aggiorna `Pipeline agenti/cronologia/` se la produzione è lunga.

## Stop gate

Se un requisito essenziale dipende da accesso, app, server, login, file o permesso mancante:
1. Verifica una volta stato e alternative autorizzate.
2. Non fare retry identici, non inventare un asset sostitutivo, non dichiarare successo.
3. Completa attività indipendenti e salva errore letterale, file, fase e conseguenza.
4. Chiedi all'utente una singola azione concreta; riprendi solo dopo l'intervento.

## QA e render

- QA copre dossier ↔ script ↔ visual, caption/audio, durata, safe areas, export e limiti non testati.
- Render automatico a QA superato, senza chiedere conferma. Se fallisce, conserva log, indaga una causa alla volta e non sovrascrive un render buono finché la nuova versione non è valida.
- Consegna link/file, formato/durata, QA effettuato, limiti, sorgenti e prossimo intervento se necessario.

## Neutralità e sicurezza

Non copiare branding o dati di un altro progetto nelle istruzioni condivise o nei commit di pipeline. Non pubblicare, non installare package globali, non avviare server esposti e non commettere segreti/media cliente senza autorizzazione e selezione esplicita dei file.
