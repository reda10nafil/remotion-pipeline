$ErrorActionPreference = "Stop"

$ProjectRoot = Split-Path -Parent $PSScriptRoot
$BlenderScript = Join-Path $ProjectRoot "assets_blender\tokamak_demo\build_tokamak.py"
$RemotionCli = Join-Path $ProjectRoot "node_modules\@remotion\cli\remotion-cli.js"
$FrameSource = Join-Path $ProjectRoot "assets_blender\tokamak_demo\frames"
$FrameTarget = Join-Path $ProjectRoot "public\assets\tokamak-demo"
$OutputVideo = Join-Path $ProjectRoot "video_renderizzati\tokamak-illustrativo.mp4"

$Blender = Get-Command blender -ErrorAction SilentlyContinue
if ($Blender) {
  $BlenderPath = $Blender.Source
} else {
  $BlenderPath = "C:\Program Files\Blender Foundation\Blender 5.2\blender.exe"
}
if (-not (Test-Path -LiteralPath $BlenderPath)) {
  throw "Blender non trovato. Installa o avvia una versione supportata, poi ripeti questo comando."
}
if (-not (Test-Path -LiteralPath (Join-Path $ProjectRoot "node_modules\remotion"))) {
  throw "Dipendenze Remotion non disponibili in node_modules. Serve l'intervento dell'utente o l'ambiente corretto."
}
if (-not (Test-Path -LiteralPath $RemotionCli)) {
  throw "CLI Remotion locale non disponibile. Serve l'ambiente Node configurato per il progetto."
}

Push-Location $ProjectRoot
try {
  & $BlenderPath -b --python $BlenderScript -- --render
  if ($LASTEXITCODE -ne 0) { throw "Blender è terminato con codice $LASTEXITCODE." }
  if (-not (Test-Path -LiteralPath (Join-Path $FrameSource "frame_0001.png"))) {
    throw "Blender non ha prodotto la sequenza di frame attesa."
  }

  New-Item -ItemType Directory -Force -Path $FrameTarget | Out-Null
  Copy-Item -Path (Join-Path $FrameSource "frame_*.png") -Destination $FrameTarget -Force
  New-Item -ItemType Directory -Force -Path (Split-Path -Parent $OutputVideo) | Out-Null
  $PreviousMinimalRender = $env:RIMOTION_MINIMAL_RENDER
  try {
    $env:RIMOTION_MINIMAL_RENDER = "1"
    node $RemotionCli render src/tokamak-entry.ts TokamakSequence $OutputVideo --overwrite
  } finally {
    if ($null -eq $PreviousMinimalRender) {
      Remove-Item Env:RIMOTION_MINIMAL_RENDER -ErrorAction SilentlyContinue
    } else {
      $env:RIMOTION_MINIMAL_RENDER = $PreviousMinimalRender
    }
  }
  if ($LASTEXITCODE -ne 0) { throw "Remotion è terminato con codice $LASTEXITCODE." }
  if (-not (Test-Path -LiteralPath $OutputVideo)) { throw "Il file video finale non è stato trovato." }
  Write-Output "Video verificabile: $OutputVideo"
} finally {
  Pop-Location
}
