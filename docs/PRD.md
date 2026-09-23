# PRD — Pipeline video assistita da agenti

**Ambito:** produzione locale con Remotion, Blender, audio e strumenti di ricerca. La pubblicazione è esclusa finché non esiste un flusso autorizzato e credenziali configurate.

## 1. Obiettivo e principi

Trasformare un brief in un video locale verificabile, modificabile e riproducibile, mantenendo separate ricerca, scrittura, direzione visiva, modellazione, montaggio, audio e QA.

Principi non negoziabili:

1. Il brief e le fonti controllate sono la base: niente numeri, citazioni o causalità inventati.
2. Un'immagine deve essere ciò che dichiara: un diagramma è un diagramma; un'illustrazione concettuale non si spaccia per un dispositivo reale.
3. Sistema visivo, animazione, audio e sottotitoli sono specificati e controllati, non affidati a preset ciechi.
4. Tool e file vengono verificati prima di dichiarare un risultato. Se un requisito essenziale è bloccato, si fermano solo i passaggi dipendenti e si chiede all'utente l'intervento preciso.
5. Output, sorgenti, fonti, licenze e decisioni sono registrati per rendere il lavoro ripetibile.
6. La documentazione comune e i commit di pipeline restano neutri: nessun nome, logo, CTA, asset o dato appartenente a progetti cliente precedenti, salvo esplicita richiesta.

## 2. Ruoli (dieci)

Il Coordinatore attiva solo i ruoli necessari; alcune fasi sono parallele, ma gli handoff e le dipendenze restano espliciti.

| Ruolo | File agente | Responsabilità |
|---|---|---|
| Coordinatore / Creative Director | `.agent/agents/coordinatore.md` | Brief, scomposizione, sequenza, stato, handoff, stop gate e consegna |
| Ricerca e Fact-Checking | `.agent/agents/ricerca-fact-check.md` | Dossier di claim, fonti, citazioni, certezza e trappole |
| Script | `.agent/agents/script.md` | Voice-over, struttura, pacing e claim-id per ogni fatto |
| Design System | `.agent/agents/design-system.md` | Direzione visiva, token, tipografia, griglia, grafica dati e motion rules |
| Editing Remotion | `.agent/agents/editing-remotion.md` | Scene, animazione deterministica, asset integration e composition |
| Grafica 3D | `.agent/agents/grafica-3d.md` | Modello, cutaway, simulazione visuale qualitativa, animazione, `.blend` e render |
| Pipeline Tecnica | `.agent/agents/pipeline-technical.md` | Ambiente, bridge tra strumenti, manifest, codec, automazione e riproducibilità |
| Audio e Sottotitoli | `.agent/agents/audio-sottotitoli.md` | Voce, musica con licenza, mix, forced alignment/caption export |
| QA / Revisione | `.agent/agents/qa-revisione.md` | Audit scientifico, visivo, audio, accessibilità e file esportato |
| Ricerca Marketing e Piattaforme | `.agent/agents/ricerca-marketing.md` | Trend e documentazione di piattaforme; raccomandazioni non fattuali |

## 3. Sequenza di produzione e dipendenze

```text
Brief → stato iniziale e inventario asset
             ├─ Ricerca/fact-check → dossier con claim-id ─→ Script finale
             └─ Design System → direzione visiva + token
Script + direzione visiva → storyboard/beat sheet
              ├─ Blender 3D → modello .blend + render/preview
              ├─ Editing Remotion ← asset, token e timing
              ├─ Audio/sottotitoli ← script definitivo + voce finale
              └─ Pipeline tecnica → manifest, integrazione e controlli formato
Assembla → QA → fix puntuali → render → verifica MP4 → archivio/consegna
```

Marketing è facoltativo e non alimenta claim scientifici o di attualità senza passare per Fact-Checking. Audio può procedere insieme a Editing solo quando il testo parlato è bloccato. Blender può procedere dopo uno storyboard tecnico con fonti e limiti di fedeltà.

## 4. Dossier delle fonti

Per ogni claim, registrare:

- `claim_id` stabile e formulazione atomica;
- autore/ente, titolo, URL diretto, data della fonte e data di accesso;
- citazione breve esatta o localizzatore (pagina, tabella, sezione, timecode), senza estratti inventati;
- certezza e tipo di evidenza: osservato, peer-reviewed, consenso, discusso, stima, obiettivo o tradizione;
- limiti, unità, condizioni sperimentali e formulazione accessibile;
- destinazione prevista: parlato, grafica, caption o escluso.

Aprire e leggere la fonte primaria, non fidarsi solo di snippet. Verificare che la parafrasi conservi attori, condizioni, denominatori e incertezza. Citazioni insufficienti non sostengono il claim. Se non si trova una fonte affidabile, si rimuove/qualifica il fatto o si chiede una fonte all'utente.

## 5. Direzione visiva e design system

Prima di animare, consegnare `design-system.md` con concept, palette semantica, typography scale, griglia, safe area, scale numeriche, gerarchia informativa, stili diagramma, motion curves, contrasto e fallback locali. I colori e gli spazi vivono in token condivisi.

Per immagini originali professionali:

- partire dal significato della scena e assegnare a ogni visual un lavoro didattico;
- scegliere asset reali concessi o produrre illustrazioni, geometrie e diagrammi originali;
- evitare stock decorativo, “HUD” fittizi, circuiti casuali e glow che suggerisce misure inesistenti;
- includere fonti e didascalie quando si ricostruiscono oggetti reali; marcare i modelli semplificati e fuori scala;
- controllare un'anteprima mobile e i frame nei punti di taglio prima del render integrale.

## 6. Protocollo Blender scientifico

Per ricostruire una macchina/strumento e non un simbolo:

1. Ricevere uno storyboard tecnico e raccogliere diagrammi/fonti ufficiali; decidere se modello specifico, generico o illustrativo.
2. Elencare e modellare separatamente componenti che spiegano il funzionamento; prevedere vista esterna, sezione/cutaway e nomi oggetto chiari.
3. Verificare proporzioni solo se documentate; altrimenti scrivere “schema qualitativo, non in scala”. Non inventare quote.
4. Animare una sequenza comprensibile (stato iniziale, attivazione delle sottostrutture, processo, regime/controllo, misura o trasferimento energetico). Usare curve e particelle solo per visualizzare grandezze reali; dichiarare la natura qualitativa delle simulazioni.
5. Distinguere test fisici da generazione elettrica. Mostrare una conversione in turbina/rete solo come impianto concettuale futuro, separato e marcato, quando la macchina sperimentale non ha tale funzione.
6. Renderizzare still a bassa risoluzione per inizio, transizioni e fine; ispezionarli. Poi produrre export con fps, codec, alpha/color space e risoluzione definiti.
7. Consegnare `.blend`, script di generazione, reference URLs, preview ed export; registrarne i limiti e il checksum.

Se Blender MCP/GUI è richiesto ma non attivo, verificare se Blender CLI locale può compiere e far controllare il task. Se non può, interrompere la fase e chiedere di avviare il programma/server; non consegnare un placeholder come se fosse il modello richiesto.

## 7. Specifiche Remotion

- Video e grafici animati sono funzione del frame; niente animazioni CSS con tempi reali. Usare `useCurrentFrame`, `interpolate`, `spring`, `<Sequence>` e i componenti Remotion appropriati.
- Un token system per palette, tipo, spaziatura, motion, z-layer e safe areas.
- Una composition/scena modulare; dati, testo e durata provengono da props/manifest unici, non da doppie copie manuali.
- Audio video esclusivamente via componenti Remotion (`<Audio>`, `<OffthreadVideo>` o API appropriata).
- Render automatico dopo QA, salvo stop gate o istruzioni contrarie. Registrare comando, versione Remotion, risoluzione, fps, codec/CRF e path finale.

## 8. Audio e sottotitoli

1. Registrare provenienza e licenza per TTS, voce, musica ed effetti; non usare musica senza autorizzazione verificabile.
2. Misurare la durata dei file audio definitivi. Non derivarla solo dal numero di parole/sillabe.
3. Caption da forced alignment o allineamento manuale ascoltato. Timing stimato da sillabe deve essere esplicitamente etichettato come stima.
4. Esportare SRT/VTT o JSON e confrontare i timestamp con waveform/ascolto. Verificare nomi, numeri, unità, punteggiatura e safe area.
5. Mix: controllare clipping, picchi e intelligibilità con misuratore e ascolto; ducking è un processo da verificare, non una percentuale dichiarata senza test.

## 9. QA e stop gate

Il pass QA verifica dossier ↔ parlato ↔ testo a schermo; target, ritmo e durata; accuratezza del visual; contrasto e safe area; transizioni; pronuncia/caption; licenze; dimensioni, frame rate, durata e tracce del file. Ispeziona una contact sheet o frame chiave lungo l'intero video e ascolta l'audio completo se possibile.

### Regola di arresto

Quando un requisito essenziale dipende da interazione utente, server, GUI, login, accesso non disponibile, fonte o file mancante:

1. Verifica una volta strumenti e alternative autorizzate; non ripetere lo stesso tentativo.
2. Continua le parti indipendenti e registra errore letterale, attività fermata, conseguenza e lavoro già fatto.
3. Chiedi l'intervento minimo e specifico (cosa avviare, quale file o accesso fornire).
4. Non dichiarare finito il deliverable incompleto; non sostituire la richiesta con un surrogato senza concordarlo.

## 10. Repository, privacy e pubblicazione

- Un progetto = `progetti/AAAA-MM-GG_slug/` con `brief.md`, dossier/script, `project-state.md`, media, manifest, output, fonti e `CRONOLOGIA.md`.
- `video_renderizzati/` contiene gli export pronti per revisione.
- I commit di pipeline contengono solo documentazione, agenti, codice generico, asset dimostrativi neutri e test minimi pertinenti. Escludono media di cliente, nomi di canali/brand, credenziali e segreti.
- Modifiche GitHub: branch dedicato, revisione del diff, commit e push autorizzato; preferire pull request quando il provider lo consente. Non incorporare incidentalmente modifiche preesistenti della working tree.
- Nessuna pubblicazione social/upload automatico senza autorizzazione esplicita e flusso configurato.

## 11. Memoria degli agenti

Ogni ruolo legge `.agent/memory/<ruolo>/knowledge.md` all'inizio e aggiunge 2–5 righe alla fine del lavoro. Preserva header e righe esistenti; la memoria contiene pattern riutilizzabili, non log, brand o materiale sorgente copiato.
