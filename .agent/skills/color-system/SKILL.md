---
name: color-system
description: "Usa per qualsiasi scelta di colori nei video Remotion: palette, accenti, sfondi, contrasto testo/sfondo, gradienti, temi chiaro/scuro. Garantisce coerenza visiva e leggibilita (WCAG AA) usando le librerie culori e chroma-js gia installate nel progetto."
---

# Color System — palette e contrasto per i video Rimotion

Skill degli agenti **Editing Remotion**, **QA/Revisione** e **Script** (per le indicazioni di mood cromatico nel brief).

## Librerie disponibili (gia installate)

| Libreria | Uso principale |
|---|---|
| `culori` | Conversioni colore (oklch, hsl, rgb), contrasto WCAG, differenza percettiva, interpolazione in spazi percettivi |
| `chroma-js` | Generazione scale cromatiche, palette armoniche (complementari, analoghe, triadiche), blend |

Importa solo cio che serve (tree-shaking):

```ts
import { converter, wcagContrast, interpolate } from 'culori';
import chroma from 'chroma-js';
```

## Regole d'oro per i video

1. **Contrasto testo/sfondo >= 4.5:1** (WCAG AA). Per titoli grandi (>= 24px bold) >= 3:1. Verifica SEMPRE prima di consegnare.
2. **Massimo 3 colori d'accento** per video + neutri (sfondo, testo, muti).
3. **Interpola in OKLCH**, mai in RGB: gradienti e transizioni colore vengono piu pulite.
4. Su sfondo scuro, alza la luminosita degli accenti (~+10%) rispetto al tema chiaro.
5. Definisci la palette in un unico file `tokens.ts` della composizione (vedi `src/Tutorial/tokens.ts` come riferimento) — mai colori sparsi nei componenti.

## Ricette pronte

### Verifica contrasto (obbligatoria in fase QA)

```ts
import { wcagContrast } from 'culori';

const ratio = wcagContrast('#FFFFFF', '#0A0A0A'); // 21 -> ottimo
// ratio >= 4.5 ? ok per body text : aumenta il contrasto
```

### Generare una scala da un colore brand

```ts
import chroma from 'chroma-js';

const scale = chroma.scale(['#0A0A0A', '#00FF88']).mode('oklch').colors(6);
// ['#0a0a0a', '#1d4a34', '#2f7d55', '#46b176', '#6fe39b', '#00ff88'-ish]
```

### Palette armonica da un accento

```ts
const brand = chroma('#00FF88');
const complementare = brand.set('hsl.h', '+180').hex();
const analoghi = [brand.set('hsl.h', '-30').hex(), brand.set('hsl.h', '+30').hex()];
```

### Gradienti smooth in Remotion

```ts
import { interpolate } from 'culori';
const mix = interpolate(['#0A0A0A', '#1A1A2E'], 'oklch');
const bg = mix(t); // t da 0 a 1 (es. da useCurrentFrame)
```

## Palette di default del progetto (fallback)

```ts
export const colors = {
  bg: '#0A0A0A',        // sfondo scuro principale
  surface: '#141414',   // card e overlay
  text: '#FAFAFA',      // testo primario (contrasto 19:1 su bg)
  textMuted: '#A3A3A3', // testo secondario (contrasto 8.6:1 su bg)
  accent: '#00FF88',    // accento principale
  accentAlt: '#FF4D6D', // accento secondario (CTA, alert)
} as const;
```

## Checklist QA colore

- [ ] Ogni testo supera il contrasto minimo sul suo sfondo effettivo
- [ ] Gli accenti sono <= 3 e coerenti con il brief
- [ ] Gradienti interpolati in OKLCH
- [ ] Colori definiti solo in `tokens.ts`
- [ ] Leggibilita verificata anche al 50% di zoom (anteprima mobile)
