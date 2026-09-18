# Skill Agent-Reach (wrapper di progetto)

> Da leggere insieme a `C:\Users\Primo\.agents\skills\agent-reach\SKILL.md` (riferimento completo upstream).
> Questo wrapper definisce **cosa possono usare gli agenti Rimotion** — non tutto ciò che Agent-Reach offre.

## Scopo

Dare agli agenti di ricerca (Ricerca Marketing primario, Script secondario) accesso reale a internet:
ricerca semantica, lettura pagine, sottotitoli/ricerca YouTube, GitHub pubblico, feed RSS.
Zero API a pagamento, zero credential per i canali consentiti.

## Assegnatari

| Agente | Uso |
|---|---|
| **ricerca-marketing** | Uso completo dei canali consentiti: trend editing, teardown competitor, tecniche hook/retention |
| **script** | Solo canali zero-config per fact-checking e ricerca argomento (sottotitoli YouTube, lettura pagine, Exa) |
| **ricerca-media** | Uso completo dei canali consentiti + `scripts/fetch-media.mjs` per metriche/download/taglio asset |
| altri agenti | VIETATO — passa dal Coordinatore, che instrada a ricerca-marketing |

## Canali CONSENTITI (zero-config, senza login)

| Canale | Comando | Uso in pipeline |
|---|---|---|
| Ricerca semantica web | `mcporter call exa.web_search_exa query="..." numResults=5` | trend, tecniche editing, dati aggiornati |
| Lettura pagine | `curl -s "https://r.jina.ai/<URL>"` | leggere guide/editoriali senza HTML |
| YouTube | `yt-dlp --dump-json` / `--write-subs --sub-langs it,en --skip-download` | analisi video competitor, sottotitoli come fonte |
| GitHub pubblico | `gh search repos`, `gh repo view owner/repo` | tool e template open-source (es. effetti, caption) |
| RSS | `python -c "import feedparser; ..."` | monitoraggio blog di editing/motion design |

Diagnostica: `agent-reach doctor` (mostra backend attivo per canale).

## Canali SPENTI (decisione utente — NON usare)

`twitter`, `reddit`, `facebook`, `instagram`, `xiaohongshu`, `linkedin`, `boss`, `xueqiu`, `xiaoyuzhou`.
Richiedono login/cookie con rischio ban. Riattivazione solo su approvazione esplicita dell'utente.

## Fonti di ricerca per editing (da preferire)

Siti di editor e guide "come creare il video giusto in base al prompt":

- `remotion.dev/docs` + blog Remotion — tecniche di motion graphics via codice
- `motion.dev/examples` — 330+ esempi di animazione (ispirazione per transizioni/micro-interazioni da replicare in Remotion)
- TikTok Creative Center (`ads.tiktok.com/business/creativecenter`) — trend e best practice short
- YouTube: canali di editing/tutorial (cercare via Exa o YouTube search, poi sottotitoli come fonte)
- Blog di editor NLE (Premiere/DaVinci/CapCut): timing, tagli, sound design — adattati al formato short

## Note Windows (obbligatorie in questo progetto)

- `npm.ps1`/`mcporter.ps1` sono bloccati da ExecutionPolicy → usare sempre `npm.cmd` e il percorso completo
  `C:\Users\Primo\AppData\Roaming\npm\mcporter.cmd` (oppure nuova shell: la cartella è stata aggiunta allo User PATH).
- Se un comando Python/CLI stampa caratteri strani: `$env:PYTHONUTF8='1'` prima di eseguirlo.
- Se `ffmpeg`/`gh` non vengono riconosciuti in un terminale vecchio: riavviare la shell (PATH aggiornato a registro).
- File di Agent-Reach vivono in `~/.agent-reach/` — MAI clonare/scrivere nulla dentro il workspace per conto di Agent-Reach.

## Regole di output

- Mai salvare contenuti grezzi dal web: solo sintesi strutturate nel formato note dell'agente.
- Ogni nota cita la fonte (URL) e l'applicazione pratica per la pipeline.
- Dopo ogni ricerca: aggiornare `knowledge.md` (2-5 righe) come da ciclo di memoria.
