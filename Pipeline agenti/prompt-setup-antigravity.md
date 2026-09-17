# Prompt da incollare in Antigravity

Prima copia `PRD-pipeline-agenti-video.md` dentro `docs/PRD.md` nel tuo repository Remotion (Antigravity deve poterlo leggere), poi incolla questo messaggio nella chat dell'Agent Manager.

---

Leggi `docs/PRD.md` in questo repository e usalo come specifica completa. Esegui questi passi in ordine, chiedendomi conferma solo prima di installare pacchetti o eseguire comandi che modificano cose fuori dal progetto:

1. **Struttura cartelle** — crea l'albero descritto nella sezione 2 del PRD (`.agent/agents/`, `.agent/skills/`, `.agent/memory/`, `progetti/_template/`, `docs/`), senza toccare `src/` e `public/` esistenti.

2. **Skill** — installa la Remotion Skill ufficiale (verifica il metodo di installazione corretto per Antigravity, es. `.agent/skills/remotion/SKILL.md` o `npx skills add remotion-dev/skills`). Scrivi tu le due skill locali `coordination-playbook` e `video-hook-writing` descritte nella sezione 6, come file `SKILL.md` completi di istruzioni pratiche.

3. **File agente** — per ciascuno dei sei agenti nella sezione 3 del PRD, crea il file corrispondente in `.agent/agents/` con: ruolo, competenze/skill assegnate, strumenti MCP consentiti, cosa NON deve fare, e il percorso del proprio file di memoria.

4. **Memoria** — crea per ciascun agente il file `.agent/memory/<agente>/knowledge.md` vuoto, con in cima il formato di voce descritto nella sezione 4 del PRD, così ogni agente sa come scriverci.

5. **MCP** — prima di installare Ruflo, verifica che la versione disponibile sia >= 3.16.3 (per via del CVE-2026-59726) e configuralo per restare accessibile solo in locale, non esposto in rete. Aggiungi gli altri MCP indicati nella sezione 5 **solo se non già coperti da funzionalità native** (verifica prima). Non installare nessun MCP di pubblicazione: è escluso in questa fase.

6. Al termine, mostrami un riepilogo di cosa hai creato/installato e cosa hai deciso di saltare (es. un MCP che risultava già coperto da una funzione nativa) prima di procedere con qualunque test.

Non generare contenuti reali (script, render) in questo passaggio: è solo setup della struttura.
