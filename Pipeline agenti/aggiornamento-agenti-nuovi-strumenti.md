# Aggiornamento agenti — nuovi strumenti installati

Da usare dopo `PRD-pipeline-agenti-video.md` e `prompt-setup-antigravity.md`, una volta che quel setup di base è stato completato.

## 1. Cosa fanno i nuovi strumenti (contesto, non serve rispiegarlo ad Antigravity se il PRD è già in `docs/PRD.md`)

- **MCP Blender** (porta 9876) — controllo completo di Blender via AI: creazione/modifica di oggetti 3D, rigging, animazione, texturing, rendering ed esportazione. Serve per asset che il codice Remotion da solo non può produrre (loghi animati in 3D, intro/transizioni tridimensionali, oggetti renderizzati).
- **MCP 21st.dev Magic** — genera componenti UI (React/TypeScript) da descrizione testuale (`/ui crea una card con...`), con libreria di componenti moderni pronti. Richiede una API key generata su 21st.dev/magic/console: verificare che sia configurata come variabile d'ambiente, mai scritta in chiaro nei file di progetto.
- **Skill UI/UX Pro Max** — dataset di design (stili, palette colori, abbinamenti tipografici, regole UX) usato per generare sistemi di design coerenti su misura invece di scelte casuali.
- **Skill Impeccable** — livello di regole che impedisce il tipico "aspetto da AI" nei componenti frontend (spaziature casuali, colori scontati, pattern generici) e fornisce comandi di controllo/rifinitura sul risultato.
- **Ruflo** — già configurato secondo `docs/PRD.md`, nessuna modifica qui.

## 2. Come si inseriscono nella pipeline — chi usa cosa

- **Nuovo agente `grafica-3d`**: unico responsabile di MCP Blender. Crea asset 3D e li esporta come video/immagini pronte; **non tocca mai il codice Remotion** — consegna solo i file di output all'agente Editing Remotion, che li importa come asset.
- **Agente `editing-remotion`** (già esistente): aggiunge alle sue competenze MCP 21st.dev Magic (per overlay/grafica a schermo: lower-third, callout, card, non per l'animazione base delle scene, che resta gestita con Remotion puro) e le skill `ui-ux-pro-max` + `impeccable` (per dare a qualunque elemento grafico generato coerenza di stile e qualità professionale).
- **Agente `qa-revisione`** (già esistente): aggiunge alla propria checklist un controllo con Impeccable (comando di audit/polish) su ogni elemento grafico/UI prodotto, oltre ai controlli già previsti nel PRD.
- **Coordinatore** (già esistente): aggiorna la propria logica di instradamento — una richiesta che parla di loghi 3D, intro animate o oggetti tridimensionali va a `grafica-3d`; grafica 2D/overlay resta su `editing-remotion`.

## 3. Memoria

- Nuovo file `.agent/memory/grafica-3d/knowledge.md`, stesso formato di voce già definito nel PRD (sezione 4).
- Nei file di memoria già esistenti di `editing-remotion` e `qa-revisione`, aggiungere solo una riga che segnala i nuovi strumenti disponibili — non riscrivere il resto del file.

---

## Prompt da incollare in Antigravity

Nel progetto sono stati installati questi strumenti nuovi: MCP Blender (porta 9876), MCP 21st.dev Magic, skill `ui-ux-pro-max`, skill `impeccable`. I file di configurazione, skill e regole installate sono già copiati in una cartella di backup nel progetto — usa quella come riferimento per capire esattamente cosa è stato installato e come è configurato, invece di reinstallare da zero.

Aggiorna la struttura esistente creata secondo `docs/PRD.md`:

1. Crea `.agent/agents/grafica-3d.md`: nuovo agente con accesso esclusivo a MCP Blender, ruolo di creazione asset 3D (modellazione, animazione, rendering, export), regola esplicita che non modifica mai codice Remotion e consegna solo file di output all'agente `editing-remotion`. Crea anche `.agent/memory/grafica-3d/knowledge.md` vuoto con il formato di voce del PRD.

2. Aggiorna `.agent/agents/editing-remotion.md` aggiungendo: accesso a MCP 21st.dev Magic e alle skill `ui-ux-pro-max` e `impeccable`, specificando che questi strumenti si usano per overlay e grafica a schermo, non per l'animazione base delle scene. Aggiungi una riga in fondo al suo `knowledge.md` che segnala la disponibilità dei nuovi strumenti.

3. Aggiorna `.agent/agents/qa-revisione.md` aggiungendo un passaggio di controllo con Impeccable su ogni elemento grafico/UI generato, prima dell'approvazione finale. Aggiungi la stessa riga di segnalazione al suo `knowledge.md`.

4. Aggiorna `.agent/mcp_config.json` includendo i nuovi server MCP con i riferimenti già presenti nella cartella di backup; verifica che l'eventuale API key di 21st.dev Magic sia richiamata da variabile d'ambiente e non scritta nel file.

5. Non toccare in nessun modo la configurazione di Ruflo né gli agenti relativi alla pubblicazione: restano esclusi in questa fase, come da PRD.

Mostrami un riepilogo di cosa hai modificato prima di procedere con qualunque test.
