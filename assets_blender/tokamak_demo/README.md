# Tokamak: modello visivo illustrativo

Prototipo generico per la pipeline: sezione trasparente della camera, bobine toroidali a D, bobine di campo poloidale, solenoide centrale, vessel e divertore; il plasma compare gradualmente, raggiunge una forma luminosa stabile e viene osservato da linee diagnostiche.

Il progetto è un modello qualitativo, non in scala e non è una simulazione MHD. I tracciati del campo magnetico e le particelle sono espedienti grafici. La scena mostra confinamento e diagnostica, non dimostra un guadagno netto d'energia né una produzione elettrica. La conversione del calore in elettricità è una parte distinta di un ipotetico impianto futuro e non è rappresentata come funzione del tokamak sperimentale.

## Riproduzione

Con Blender 5.2 o successivo:

```powershell
& "C:\Program Files\Blender Foundation\Blender 5.2\blender.exe" -b --python assets_blender/tokamak_demo/build_tokamak.py -- --render
```

La pipeline esegue Blender in background per generare il file `.blend`, la preview PNG e i 180 frame numerati; Remotion assembla la sequenza in H.264, a 720 per 1280 pixel e trenta fotogrammi al secondo.

Dal terminale PowerShell nella root del progetto:

```powershell
.\scripts\render-tokamak.ps1
```

## Riferimenti verificati

Consultate il 24 settembre 2026. ASIPP descrive le bobine EAST come «十六个D形线圈沿环向均布组成» (sedici bobine a D distribuite lungo la circonferenza) e indica il solenoide centrale con quattro coppie di grandi bobine poloidali: https://ipp.cas.cn/kxcb/kpzs/sqdcd/201310/t20131031_346125.html

ITER descrive la funzione generale delle bobine toroidali come confinamento del plasma, di quelle poloidali come modellamento/stabilità e del solenoide centrale come induzione e mantenimento della corrente: https://www.iter.org/machine/magnets

ITER spiega che, in una centrale a fusione, l'energia dei neutroni rallentati nel blanket diventa calore e può essere usata per produrre elettricità: https://www.iter.org/machine/blanket. ITER è un dispositivo sperimentale, non una centrale elettrica: https://www.iter.org/node/20687/turning-neutrons-electricity

Le fonti documentano la funzione e l'architettura generale, non la geometria esatta del modello. Il numero di avvolgimenti, le proporzioni e il comportamento luminoso del plasma sono scelte illustrative.
