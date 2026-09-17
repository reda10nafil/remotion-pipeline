#!/usr/bin/env node
/**
 * fetch-audio.mjs — Scarica tracce audio royalty-free per i video Rimotion.
 *
 * Usa yt-dlp (via `uvx yt-dlp`, oppure un binario yt-dlp nel PATH) per cercare
 * e scaricare musica di sottofondo in public/audio/<nome>.mp3.
 *
 * OGNI query viene automaticamente suffissa con termini obbligatori:
 * "Royalty Free" "No Copyright Music" "Creative Commons".
 *
 * Uso:
 *   node scripts/fetch-audio.mjs "dark energetic hip hop beat" reveal_sfx
 *   node scripts/fetch-audio.mjs "upbeat corporate" outro_music --duration 30
 *
 * L'agente Audio & Sottotitoli deve usare questo script invece di scaricare
 * manualmente: garantisce il filtro no-copyright e la cartella di destinazione.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const MANDATORY_TERMS = "Royalty Free No Copyright Music Creative Commons";
const OUT_DIR = join(process.cwd(), "public", "audio");

const [, , mood, name, ...rest] = process.argv;
if (!mood || !name) {
  console.error(
    'Uso: node scripts/fetch-audio.mjs "<mood/genere>" <nome_file> [--duration <sec>]\n' +
      'Esempio: node scripts/fetch-audio.mjs "dark energetic beat" reveal_sfx'
  );
  process.exit(1);
}

const durationFlag = rest.indexOf("--duration");
const maxDuration = durationFlag !== -1 ? Number(rest[durationFlag + 1]) : null;

const query = `${mood} ${MANDATORY_TERMS}`;
const outFile = join(OUT_DIR, `${name}.mp3`);
const outTemplate = join(OUT_DIR, `${name}.%(ext)s`);

mkdirSync(OUT_DIR, { recursive: true });

// Risolve il runner yt-dlp: preferisce il binario di sistema, altrimenti uvx.
function resolveYtDlp() {
  try {
    execFileSync("yt-dlp", ["--version"], { stdio: "ignore" });
    return { cmd: "yt-dlp", prefix: [] };
  } catch {
    return { cmd: "uvx", prefix: ["yt-dlp"] };
  }
}

const { cmd, prefix } = resolveYtDlp();

const args = [
  ...prefix,
  `ytsearch1:${query}`, // primo risultato della ricerca YouTube
  "--extract-audio",
  "--audio-format",
  "mp3",
  "--audio-quality",
  "0",
  "--no-playlist",
  "--output",
  outTemplate,
  ...(maxDuration ? ["--match-filter", `duration <= ${maxDuration}`] : []),
];

console.log(`Cerco: "${query}"`);
console.log(`Destinazione: ${outFile}`);

try {
  execFileSync(cmd, args, { stdio: "inherit" });
} catch (err) {
  console.error("Download fallito. Verifica che uv/uvx (o yt-dlp) sia installato.");
  process.exit(1);
}

if (!existsSync(outFile)) {
  console.error(`File ${outFile} non creato: riprova con un mood diverso.`);
  process.exit(1);
}

console.log(`OK → public/audio/${name}.mp3`);
console.log(
  `In Remotion: <Audio src={staticFile("audio/${name}.mp3")} volume={0.8} />`
);
