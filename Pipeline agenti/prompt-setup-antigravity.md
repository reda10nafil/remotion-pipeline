# Prompt di setup e manutenzione della pipeline

Leggi `CLAUDE.md`, `docs/PRD.md`, `AGENTS.md` e `Pipeline agenti/TUTORIAL-RIMOTION-PIPELINE.md`. Usa il PRD canonico come fonte della verità e allinea ogni duplicato alla specifica.

Per un aggiornamento:

1. Verifica prima il `git status`, branch, remote e le modifiche preesistenti. Non sovrascrivere né includere file non correlati.
2. Aggiorna i dieci ruoli in `.agent/agents/`, la skill di coordinamento, le memorie e la guida quando cambi responsabilità o gate. Preserva template/header delle memorie.
3. Mantieni la separazione tra Ricerca e Fact-Checking e ricerca di marketing; tra Design System ed Editing; tra Grafica 3D e Pipeline Tecnica.
4. Per una richiesta di asset fisico/3D, verifica fonti, componenti, ambiente e output reali. La presenza di Blender non implica che MCP o server sia attivo. Se serve l'intervento dell'utente, documenta l'errore e chiedi l'azione concreta.
5. Non installare dipendenze globali, avviare servizi in rete o aggiungere MCP per comodità. Preferisci dipendenze locali e alternative riproducibili; descrivi il limite quando una dipendenza necessaria non è disponibile.
6. Esegui i controlli pertinenti richiesti dal task; registra comando e risultato. Non dichiarare audio, timing o export verificati se non li hai ispezionati.
7. Prima di pubblicare modifiche su GitHub, controlla il diff file per file: includi solo documentazione/codice generico richiesto; escludi media e branding specifici di progetti cliente, `.env`, token e credenziali. Usa branch e pull request se il repository supporta il flusso.

Per creare un nuovo progetto video usa il template locale, un identificatore neutro e una cartella `Pipeline agenti/cronologia/` o `CRONOLOGIA.md` con fatto, esito, file e lavoro residuo.
