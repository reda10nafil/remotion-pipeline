# Cronologia della pipeline

Ultimo aggiornamento: 24 settembre 2026
Stato: pipeline aggiornata; modello e clip Blender renderizzati; short completo aggiornato; pull request aperta per revisione.

## Registro delle attività

| Data | Fase | Lavoro svolto | Evidenza | Esito |
|---|---|---|---|---|
| 2026-09-23 | Produzione video | Completato un breve video scientifico con dossier, voce sintetica, sottotitoli e scene Remotion; l'animazione 3D era ancora una forma schematica. | Asset precedenti conservati nell'area di lavoro locale. | Il video è stato renderizzato e controllato a campione; il modello 3D non rappresentava abbastanza il macchinario. |
| 2026-09-24 | Istruzioni | Aggiornate regole di ricerca, citazioni, design system, integrazione, verifica media, privacy e stop gate. | `CLAUDE.md`, `docs/PRD.md`, tutorial, agenti e skill di coordinamento. | Ruoli specialistici estesi da sette a dieci, con responsabili dedicati per fact-checking, design system e pipeline tecnica. |
| 2026-09-24 | Template | Aggiunti modelli per sistema visivo e cronologia; ampliato lo stato progetto e la documentazione del gate di blocco. | `progetti/_template/` | Ogni lavoro può registrare fonti, decisioni, versioni, progressi e interventi richiesti. |
| 2026-09-24 | Modellazione 3D | Creato in Blender un tokamak illustrativo sezionato con bobine toroidali, poloidali, solenoide, vessel, divertore, traccianti e fasi di avvio/confinamento. | `assets_blender/tokamak_demo/` | Preview generata e ispezionata visivamente; modello dichiarato non in scala e non simulazione MHD. |
| 2026-09-24 | Verifica scena | Riaperto il `.blend` con Blender 5.2.2 LTS e controllati i nomi degli oggetti principali. | 111 oggetti, 16 bobine toroidali, 8 bobine poloidali, un anello plasma. | Scena salvata e facilmente ispezionabile dal Blender Outliner. |
| 2026-09-24 | Integrazione | Aggiunto il passaggio deterministico Blender PNG sequence → Remotion e un entry point di rendering isolato. | `scripts/render-tokamak.ps1`, `src/compositions/TokamakSequence.tsx`, `src/tokamak-entry.ts` | La clip è stata renderizzata in H.264: 180 frame, 720×1280, 30 fps. |
| 2026-09-24 | Montaggio completo | Sostituita la scena schematica con il video Blender; il frame del plasma stabile tiene per la parte residua della scena. | Output locale `video_renderizzati/fusione-confinamento-3d.mp4` | Render Remotion completato: 3.538 frame, H.264, circa 118 s; audio e sottotitoli rimangono nella timeline esistente. |
| 2026-09-24 | Controllo immagine | Esaminato il frame della scena integrata con sottotitoli e intestazioni tradotte. | `video_renderizzati/qa-tokamak-scene-final.png` | Componenti riconoscibili, note scientifiche presenti; non è stato fatto un ascolto umano integrale dell'audio. |
| 2026-09-24 | Diagnostica ambiente | Il wrapper npm/npx globale è risultato incompleto; il render ha usato la CLI Remotion già presente nel progetto. | `scripts/render-tokamak.ps1`, `remotion.config.ts` | Nessun pacchetto installato. La scansione Tailwind è saltata solo per l'entry point isolato della clip. |
| 2026-09-24 | Consegna Git | Creato e inviato un branch dedicato; aperta la pull request con documentazione e codice riusabili selezionati esplicitamente. | `codex/pipeline-upgrade-scientific-3d` | La revisione GitHub è aperta; asset/output specifici e media temporanei non sono staged. |

## Decisioni e limiti da preservare

- Un tokamak deve apparire come un apparato con camera, bobine e solenoide riconoscibili; un toro luminoso isolato non è sufficiente.
- Le geometrie sono didattiche e non in scala; le linee magnetiche sono tracce qualitative, non risultati di una simulazione magnetoidrodinamica.
- La scena di avvio e confinamento non prova guadagno netto o generazione elettrica. La conversione futura del calore va distinta dall'esperimento.
- Il renderer Blender 5.2.2 produce una sequenza numerata di PNG; Remotion assembla la sequenza in H.264. Questo evita dipendenze dal codec video interno di Blender.
- Non installare dipendenze o avviare server in modo implicito. Se la CLI locale non basta, registrare l'errore e chiedere l'azione precisa.

## Da completare

- [x] Terminare l'esportazione della sequenza e l'assemblaggio Remotion.
- [x] Verificare il conteggio frame, il codec riportato dal render e un frame rappresentativo con sottotitolo.
- [x] Controllare l'apertura, l'animazione del plasma e le etichette delle fasi.
- [x] Controllare le modifiche staged per spazi finali e riferimenti di brand.
- [x] Pushare il branch e aprire una pull request senza output o media temporanei.
- [ ] Ascolto umano completo della traccia e verifica professionale della sincronizzazione: richiedono una revisione editoriale finale.

## File principali

- `assets_blender/tokamak_demo/build_tokamak.py`: generatore procedurale e render della preview.
- `assets_blender/tokamak_demo/tokamak_illustrative.blend`: scena Blender riapribile.
- `scripts/render-tokamak.ps1`: comando end-to-end Blender → Remotion.
- `src/compositions/TokamakSequence.tsx`: lettura deterministica della sequenza in Remotion.
- `progetti/_template/cronologia.md`: modello di registro per i progetti futuri.
