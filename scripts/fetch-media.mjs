#!/usr/bin/env node
/**
 * fetch-media.mjs — Modulo Ricerca, Metriche & Media Retrieval (audio MP3 + video B-roll).
 *
 * Implementa la spec del modulo:
 *  §2 ranking qualitativo su metriche social (views, like, freshness, segnali copyright),
 *  §3 filtro copyright obbligatorio su OGNI query,
 *  §4 download + taglio server-side del SOLO spezzone autorizzato,
 *  §5 handoff JSON all'agente Editing Remotion.
 *
 * Uso:
 *   node scripts/fetch-media.mjs --type audio --query "dark energetic beat" --name reveal_sfx
 *   node scripts/fetch-media.mjs --type video --query "milan skyline night" --name milan_skyline --section 10-22
 *   node scripts/fetch-media.mjs --type audio --query "upbeat corporate" --name test --probe-only
 *
 * Flag:
 *   --type audio|video     (obbligatorio)
 *   --query "..."          (obbligatorio, SENZA termini copyright: li aggiunge lo script)
 *   --name <nome_file>     (obbligatorio, senza estensione)
 *   --section A-B          (opzionale, secondi: scarica/taglia solo lo spezzone)
 *   --max-candidates N     (default 5: candidati valutati nel ranking)
 *   --probe-only           (solo ranking + metriche, nessun download)
 *   --fps N                (default 60: frame = secondi * fps per l'handoff)
 *
 * Output:
 *   audio → public/audio/<nome>.mp3
 *   video → public/assets/videos/<nome>.mp4
 *   Su stdout: oggetto handoff JSON (§5) pronto per l'agente Editing Remotion.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";

const FPS_DEFAULT = 60;
const AUDIO_TERMS = "Royalty Free No Copyright Music Creative Commons";
const VIDEO_TERMS = "Royalty Free No Copyright Stock Footage Creative Commons";
const AUDIO_DIR = join(process.cwd(), "public", "audio");
const VIDEO_DIR = join(process.cwd(), "public", "assets", "videos");

// ---------- parsing argomenti ----------
function getFlag(name) {
  const i = process.argv.indexOf(name);
  return i !== -1 ? process.argv[i + 1] : null;
}

const type = getFlag("--type");
const queryRaw = getFlag("--query");
const name = getFlag("--name");
const section = getFlag("--section");
const maxCandidates = Number(getFlag("--max-candidates") || 5);
const probeOnly = process.argv.includes("--probe-only");
const fps = Number(getFlag("--fps") || FPS_DEFAULT);

if (!type || !["audio", "video"].includes(type) || !queryRaw || !name) {
  console.error(
    'Uso: node scripts/fetch-media.mjs --type audio|video --query "..." --name <nome> [--section A-B] [--max-candidates N] [--probe-only] [--fps 60]'
  );
  process.exit(1);
}
if (section && !/^\d+-\d+$/.test(section)) {
  console.error('Formato --section non valido. Usa A-B in secondi, es. --section 10-22');
  process.exit(1);
}
if (section) {
  const [a, b] = section.split("-").map(Number);
  if (a >= b) {
    console.error("--section non valida: il secondo deve essere maggiore del primo.");
    process.exit(1);
  }
}

const MANDATORY = type === "audio" ? AUDIO_TERMS : VIDEO_TERMS;
const query = `${queryRaw} ${MANDATORY}`;
const outDir = type === "audio" ? AUDIO_DIR : VIDEO_DIR;
const ext = type === "audio" ? "mp3" : "mp4";
mkdirSync(outDir, { recursive: true });

// ---------- runner yt-dlp / ffprobe ----------
function resolveYtDlp() {
  try {
    execFileSync("yt-dlp", ["--version"], { stdio: "ignore" });
    return { cmd: "yt-dlp", prefix: [] };
  } catch {
    return { cmd: "uvx", prefix: ["yt-dlp"] };
  }
}
const { cmd, prefix } = resolveYtDlp();
const runYtDlp = (args, capture) =>
  execFileSync(cmd, [...prefix, ...args], capture ? { encoding: "utf-8" } : { stdio: "inherit" });

// FFmpeg: yt-dlp --download-sections lo richiede. Se non è nel PATH (shell vecchie),
// lo cerca nel percorso di installazione WinGet e lo passa esplicitamente.
function resolveFfmpegDir() {
  try {
    execFileSync("ffmpeg", ["-version"], { stdio: "ignore" });
    return null; // nel PATH: niente da fare
  } catch {
    const base = join(process.env.LOCALAPPDATA || "", "Microsoft", "WinGet", "Packages");
    try {
      for (const pkg of readdirSync(base)) {
        if (!pkg.startsWith("Gyan.FFmpeg")) continue;
        const stack = [join(base, pkg)];
        while (stack.length) {
          const dir = stack.pop();
          let entries = [];
          try {
            entries = readdirSync(dir, { withFileTypes: true });
          } catch {
            continue;
          }
          for (const e of entries) {
            const p = join(dir, e.name);
            if (e.isFile() && e.name.toLowerCase() === "ffmpeg.exe") return dirname(p);
            if (e.isDirectory()) stack.push(p);
          }
        }
      }
    } catch {
      /* ignora */
    }
    return null;
  }
}
const ffmpegDir = resolveFfmpegDir();
const ffmpegArgs = ffmpegDir ? ["--ffmpeg-location", ffmpegDir] : [];
const ffprobeBin = ffmpegDir ? join(ffmpegDir, "ffprobe.exe") : "ffprobe";
if (ffmpegDir) console.log(`FFmpeg trovato in: ${ffmpegDir}`);

// ---------- §2 ranking metriche ----------
function compact(n) {
  if (n == null) return "n/d";
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
  return String(n);
}

function daysSince(yyyymmdd) {
  if (!yyyymmdd || yyyymmdd.length !== 8) return null;
  const d = new Date(`${yyyymmdd.slice(0, 4)}-${yyyymmdd.slice(4, 6)}-${yyyymmdd.slice(6, 8)}`);
  if (Number.isNaN(d.getTime())) return null;
  return Math.max(0, Math.round((Date.now() - d.getTime()) / 86400000));
}

function scoreCandidate(c) {
  const views = c.view_count || 0;
  const likes = c.like_count || 0;
  const text = `${c.title || ""} ${c.description || ""}`.toLowerCase();
  const reasons = [];

  // Regola di scarto: nessun segnale di trazione
  if (views < 100 && likes < 5) {
    return { keep: false, reason: `metriche scarse (views=${views}, likes=${likes})` };
  }

  let score = Math.log10(views + 1) + Math.log10(likes + 1) * 0.5;

  // Freshness: bonus che decade in ~2 anni
  const days = daysSince(c.upload_date);
  if (days != null) {
    score += Math.max(0, 1 - days / 730) * 2;
  } else {
    reasons.push("data upload ignota (no bonus freshness)");
  }

  // Segnali copyright: licenza CC o termini nel titolo/descrizione
  const license = String(c.license || "").toLowerCase();
  if (license.includes("creative commons")) {
    score += 1.5;
    reasons.push("licenza Creative Commons rilevata");
  }
  if (/(no copyright|royalty free|creative commons)/.test(text)) {
    score += 0.5;
  } else {
    reasons.push("termini copyright non trovati in titolo/descrizione");
  }
  // Red flag: segnalazioni nei metadati/età sospetta
  if (/(copyright strike|blocked|deleted)/.test(text)) {
    return { keep: false, reason: "red flag copyright nei metadati" };
  }

  return { keep: true, score, reasons };
}

console.log(`Query (con filtro copyright): "${query}"`);
const searchOut = runYtDlp(
  [`ytsearch${maxCandidates}:${query}`, "--dump-json", "--no-playlist", "--no-warnings"],
  true
);

const candidates = [];
for (const line of searchOut.split("\n")) {
  const t = line.trim();
  if (!t.startsWith("{")) continue;
  try {
    candidates.push(JSON.parse(t));
  } catch {
    /* riga non JSON: ignora */
  }
}
if (candidates.length === 0) {
  console.error("Nessun candidato trovato: refine la query e riprova.");
  process.exit(1);
}

const ranked = [];
for (const c of candidates) {
  const verdict = scoreCandidate(c);
  const entry = {
    title: c.title,
    url: c.webpage_url,
    views: c.view_count ?? null,
    likes: c.like_count ?? null,
    uploadDate: c.upload_date ?? null,
    duration: c.duration ?? null,
    license: c.license ?? null,
  };
  if (verdict.keep) ranked.push({ ...entry, score: verdict.score, notes: verdict.reasons });
  else console.log(`SCARTATO "${entry.title}" — ${verdict.reason}`);
}
if (ranked.length === 0) {
  console.error("Tutti i candidati scartati per metriche scarse: refine la query e riprova.");
  process.exit(1);
}
ranked.sort((a, b) => b.score - a.score);
const best = ranked[0];
console.log(`SELEZIONATO "${best.title}" — views=${compact(best.views)} likes=${compact(best.likes)} score=${best.score.toFixed(2)}`);

if (probeOnly) {
  console.log(JSON.stringify({ mode: "probe-only", candidates: ranked }, null, 2));
  process.exit(0);
}

// ---------- §4 download + taglio server-side ----------
const outFile = join(outDir, `${name}.${ext}`);
const outTemplate = join(outDir, `${name}.%(ext)s`);
const sectionArgs = section ? ["--download-sections", `*${section}`] : [];

if (type === "audio") {
  runYtDlp([
    best.url,
    "--extract-audio",
    "--audio-format",
    "mp3",
    "--audio-quality",
    "0",
    "--no-playlist",
    ...ffmpegArgs,
    ...sectionArgs,
    "--output",
    outTemplate,
  ]);
} else {
  runYtDlp([
    best.url,
    "-f",
    "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best",
    "--merge-output-format",
    "mp4",
    "--no-playlist",
    ...ffmpegArgs,
    ...sectionArgs,
    "--output",
    outTemplate,
  ]);
}

if (!existsSync(outFile)) {
  console.error(`File ${outFile} non creato: riprova con una query diversa.`);
  process.exit(1);
}

// Durata reale via ffprobe
let durationInSeconds = null;
try {
  const raw = execFileSync(
    ffprobeBin,
    ["-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", outFile],
    { encoding: "utf-8" }
  ).trim();
  durationInSeconds = Math.round(Number(raw) * 100) / 100;
} catch {
  console.error("ffprobe non riuscito: verifica durata manualmente.");
}
if (!Number.isFinite(durationInSeconds)) {
  console.error("Durata non rilevabile: handoff incompleto.");
  process.exit(1);
}

// ---------- §5 handoff JSON ----------
const likeRatio =
  best.views && best.likes != null
    ? `${((best.likes / Math.max(best.views, 1)) * 100).toFixed(1)}% engagement`
    : "n/d";
const handoff = {
  assetType: type,
  filePath: type === "audio" ? `audio/${name}.mp3` : `assets/videos/${name}.mp4`,
  durationInSeconds,
  durationInFrames: Math.round(durationInSeconds * fps),
  metricsSummary: {
    views: compact(best.views),
    likes: compact(best.likes),
    likeRatio,
    source: best.url,
    sourceCategory: "Creative Commons / Royalty Free (filtro query obbligatorio)",
  },
  remotionTag:
    type === "audio"
      ? `<Audio src={staticFile("audio/${name}.mp3")} />`
      : `<OffthreadVideo src={staticFile("assets/videos/${name}.mp4")} />`,
};

console.log(`OK → ${handoff.filePath} (${durationInSeconds}s = ${handoff.durationInFrames} frame @${fps}fps)`);
console.log(JSON.stringify(handoff, null, 2));
