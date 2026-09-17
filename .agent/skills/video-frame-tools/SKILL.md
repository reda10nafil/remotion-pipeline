---
name: video-frame-tools
description: "Usa per lavorare su file video/audio grezzi in video_da_editare/: estrarre frame come immagini, spezzettare clip, estrarre audio, creare GIF di anteprima, leggere metadati, preparare asset per le composizioni Remotion. Basata su FFmpeg (installato)."
---

# Video Frame Tools — FFmpeg per la pipeline Rimotion

Skill degli agenti **Editing Remotion**, **Audio & Sottotitoli** e **QA/Revisione**.

FFmpeg e installato via winget (`ffmpeg`, `ffprobe`, `ffplay`). Se il comando non e nel PATH della shell corrente, riavvia la shell o usa il percorso completo:
`C:\Users\reda_\AppData\Local\Microsoft\WinGet\Links\ffmpeg.exe`

> Convenzione: input da `video_da_editare/`, output temporanei in `progetti/<nome>/media/`, asset finali per Remotion in `public/`.

## Ricette principali

### 1. Metadati di un video (SEMPRE per prima cosa)

```bash
ffprobe -v error -show_entries format=duration,size,bit_rate -show_entries stream=codec_name,width,height,r_frame_rate -of default=noprint_wrappers=1 video_da_editare/clip.mp4
```

### 2. Estrarre frame come immagini

```bash
# Un frame ogni secondo (per analisi, storyboard, QA visivo)
ffmpeg -i video_da_editare/clip.mp4 -vf fps=1 progetti/<nome>/media/frame_%04d.png

# N frame equidistanti (es. 9 per una griglia storyboard 3x3)
ffmpeg -i video_da_editare/clip.mp4 -vf "select='not(mod(n\,floor(N/9)))',scale=640:-1,tile=3x3" -frames:v 1 progetti/<nome>/media/storyboard.png

# Frame singolo a un timestamp preciso (es. thumbnail a 2.5s)
ffmpeg -ss 2.5 -i video_da_editare/clip.mp4 -frames:v 1 -q:v 2 progetti/<nome>/media/thumb.jpg
```

### 3. Spezzettare un video in clip

```bash
# Taglio preciso da 5s a 15s (re-encode, frame-accurate)
ffmpeg -ss 5 -to 15 -i video_da_editare/clip.mp4 -c:v libx264 -c:a aac progetti/<nome>/media/segmento.mp4

# Split automatico ogni 30 secondi
ffmpeg -i video_da_editare/clip.mp4 -c copy -map 0 -segment_time 30 -f segment -reset_timestamps 1 progetti/<nome>/media/part_%03d.mp4
```

### 4. Estrarre / convertire audio

```bash
# Audio per trascrizione sottotitoli (16kHz mono = ideale per whisper)
ffmpeg -i video_da_editare/clip.mp4 -vn -ac 1 -ar 16000 progetti/<nome>/media/audio.wav

# Normalizza volume per il mix finale
ffmpeg -i input.mp3 -af loudnorm=I=-14:TP=-1:LRA=11 public/musica_normalizzata.mp3
```

### 5. Preparare asset per Remotion

```bash
# Video di sfondo ottimizzato (loop, 1080x1920 verticale, senza audio)
ffmpeg -i video_da_editare/clip.mp4 -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920" -an -c:v libx264 -crf 20 public/bg_loop.mp4

# Sequenza PNG con alpha (da asset Blender con trasparenza)
ffmpeg -i render_blender.mov -vf fps=30 public/seq/logo_%04d.png

# GIF/WebP di anteprima per la revisione rapida
ffmpeg -i video_renderizzati/output.mp4 -vf "fps=12,scale=480:-1" -loop 0 anteprima.webp
```

## Integrazione con Remotion

- Sequenze di frame: usa `<Img>` + `staticFile()` oppure `@remotion/media-utils` `getVideoMetadata()` per sincronizzare
- Per video nelle composizioni usa `<OffthreadVideo src={staticFile('bg_loop.mp4')} />` (mai `<video>` HTML puro)
- L'audio estratto a 16kHz mono va passato a `@remotion/captions` / whisper per i sottotitoli

## Checklist prima dell'editing

- [ ] `ffprobe` fatto: durata, risoluzione, fps noti
- [ ] Frame/storyboard estratti per capire il contenuto
- [ ] Audio estratto in WAV 16kHz mono se servono sottotitoli
- [ ] Asset finali copiati in `public/` (non linkare da `video_da_editare/`)
