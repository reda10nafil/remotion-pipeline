# Graph Report - Rimotion  (2026-09-17)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 2008 nodes · 5440 edges · 77 communities (71 shown, 6 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 141 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Potenziamenti/skills/impeccable/scripts/live-browser.js
- connectSSE
- connectSSE
- setLiveState
- el
- .agents/skills/impeccable/scripts/modern-screenshot.umd.js
- Potenziamenti/skills/impeccable/scripts/modern-screenshot.umd.js
- setLiveState
- el
- initPageChat
- renderDesignVisual
- react
- initGlobalBar
- actOnAgentTarget
- initPageChat
- renderDesignVisual
- applyEditing
- documentRefForElement
- initGlobalBar
- remotion-best-practices/remotion-markup/remotion-maps/techniques/cesium/assets/CesiumFlythrough.tsx
- mountSvelteComponentVariant
- .agents/skills/impeccable/scripts/live-browser.js
- remotion-best-practices/remotion-markup/remotion-maps/techniques/maptiler/assets/RiverReveal.tsx
- remotion-best-practices/remotion-maps/techniques/maptiler/assets/RiverReveal.tsx
- package.json
- skills/remotion-maps/techniques/maptiler/assets/RiverReveal.tsx
- skills/remotion-markup/remotion-maps/techniques/maptiler/assets/RiverReveal.tsx
- DesignSystemGenerator
- remotion
- .agent/skills/ui-ux-pro-max/scripts/design_system.py
- remotion-best-practices/remotion-maps/techniques/maptiler/scripts/prep-geo.mjs
- showToast
- captureElementToBlob
- remotion-best-practices/remotion-markup/remotion-maps/techniques/maptiler/scripts/prep-geo.mjs
- skills/remotion-maps/techniques/maptiler/scripts/prep-geo.mjs
- skills/remotion-markup/remotion-maps/techniques/maptiler/scripts/prep-geo.mjs
- handleManualEditActivity
- captureElementToBlob
- onAnnotDown
- Potenziamenti/skills/ui-ux-pro-max/scripts/design_system.py
- remotion-best-practices/remotion-maps/techniques/cesium/scripts/prep-cesium-path.mjs
- remotion-best-practices/remotion-markup/remotion-maps/techniques/cesium/scripts/prep-cesium-path.mjs
- skills/remotion-maps/techniques/cesium/scripts/prep-cesium-path.mjs
- dependencies
- createLiveBrowserSessionState
- skills/remotion-markup/remotion-maps/techniques/cesium/scripts/prep-cesium-path.mjs
- createLiveBrowserSessionState
- onAnnotDown
- remotion-best-practices/remotion-maps/techniques/cesium/assets/CesiumFlythrough.tsx
- skills/remotion-markup/remotion-maps/techniques/cesium/assets/CesiumFlythrough.tsx
- showToast
- createLiveBrowserDomHelpers
- focusSteerChat
- createLiveBrowserDomHelpers
- BM25
- claimAndActOnAgentTarget
- compilerOptions
- handleMouseMove
- buildSveltePropValuesV2
- .agent/skills/ui-ux-pro-max/scripts/search.py
- bpy
- devDependencies
- applyPlaceholderDimensions
- generate_design_system
- releaseDiscardedStaticWrappers
- .agents/skills/impeccable/scripts/live-browser-ignores.js
- Potenziamenti/skills/impeccable/scripts/live-browser-ignores.js
- .agents/skills/impeccable/scripts/impeccable
- resolveInsertHover
- Potenziamenti/skills/impeccable/scripts/impeccable
- remotion-best-practices/remotion-maps/techniques/maptiler/assets/MapTilerVectorElement.ts
- remotion-best-practices/remotion-markup/remotion-maps/techniques/maptiler/assets/MapTilerVectorElement.ts
- skills/remotion-maps/techniques/maptiler/assets/MapTilerVectorElement.ts
- skills/remotion-markup/remotion-maps/techniques/maptiler/assets/MapTilerVectorElement.ts
- scripts
- @remotion/tailwind-v4
- @remotion/eslint-config-flat

## God Nodes (most connected - your core abstractions)
1. `remotion` - 42 edges
2. `react` - 39 edges
3. `connectSSE()` - 34 edges
4. `connectSSE()` - 34 edges
5. `resumeSession()` - 33 edges
6. `resumeSession()` - 33 edges
7. `setLiveState()` - 33 edges
8. `setLiveState()` - 33 edges
9. `showToast()` - 31 edges
10. `showToast()` - 31 edges

## Surprising Connections (you probably didn't know these)
- `Main entry point for design system generation. Args: query: Search query (e.g.,…` --rationale_for--> `generate_design_system()`  [EXTRACTED]
  .agent/skills/ui-ux-pro-max/scripts/design_system.py → Potenziamenti/skills/ui-ux-pro-max/scripts/design_system.py
- `Generates design system recommendations from aggregated searches.` --rationale_for--> `DesignSystemGenerator`  [EXTRACTED]
  .agent/skills/ui-ux-pro-max/scripts/design_system.py → Potenziamenti/skills/ui-ux-pro-max/scripts/design_system.py
- `BM25 ranking algorithm for text search` --rationale_for--> `BM25`  [EXTRACTED]
  .agent/skills/ui-ux-pro-max/scripts/core.py → Potenziamenti/skills/ui-ux-pro-max/scripts/core.py
- `Main search function with auto-domain detection` --rationale_for--> `search()`  [EXTRACTED]
  .agent/skills/ui-ux-pro-max/scripts/core.py → Potenziamenti/skills/ui-ux-pro-max/scripts/core.py
- `Core search function using BM25` --rationale_for--> `_search_csv()`  [EXTRACTED]
  .agent/skills/ui-ux-pro-max/scripts/core.py → Potenziamenti/skills/ui-ux-pro-max/scripts/core.py

## Import Cycles
- None detected.

## Communities (77 total, 6 thin omitted)

### Community 0 - "Potenziamenti/skills/impeccable/scripts/live-browser.js"
Cohesion: 0.04
Nodes (101): acceptedDomAlreadyClean(), applyGlobalBarLabelState(), applyLiveBarPreference(), applyOriginalAttrsToSvelteAnchor(), applyPlaceholderSizingStyles(), bindEditBadgeProxy(), bufferToBase64(), buildPlaceholderResizeHandles() (+93 more)

### Community 1 - "connectSSE"
Cohesion: 0.06
Nodes (81): applyParamDefaults(), applyParamValue(), applySavedSessionMeta(), buildParamsPanel(), checkpointPayload(), clampVariantIndex(), clearSession(), closedClipPath() (+73 more)

### Community 2 - "connectSSE"
Cohesion: 0.06
Nodes (80): applyParamDefaults(), applySavedSessionMeta(), checkpointPayload(), clampVariantIndex(), clearHandled(), clearSession(), closedClipPath(), commitAcceptedVariantToDom() (+72 more)

### Community 3 - "setLiveState"
Cohesion: 0.11
Nodes (61): abortSvelteComponentInjection(), actOnAgentTarget(), applyEditing(), beginNewLiveConfiguration(), cancelEditing(), cancelEditingToPicking(), cancelInsertConfigure(), cleanup() (+53 more)

### Community 4 - "el"
Cohesion: 0.07
Nodes (59): actionLabel(), applyConfigureBarChrome(), bindConfigureCountPillTooltip(), bindConfigureInlineControlHover(), bindConfigureModifierPillHover(), buildConfigureActionControl(), buildConfigureCountControl(), buildConfigureRow() (+51 more)

### Community 5 - ".agents/skills/impeccable/scripts/modern-screenshot.umd.js"
Cohesion: 0.09
Nodes (55): ae(), be(), bt(), Ce(), s(), Ct(), de(), dt() (+47 more)

### Community 6 - "Potenziamenti/skills/impeccable/scripts/modern-screenshot.umd.js"
Cohesion: 0.09
Nodes (55): ae(), be(), bt(), Ce(), s(), Ct(), de(), dt() (+47 more)

### Community 7 - "setLiveState"
Cohesion: 0.10
Nodes (53): abortSvelteComponentInjection(), beginNewLiveConfiguration(), buildInsertPlaceholderSnapshotFromDom(), cancelEditing(), cancelEditingToPicking(), cancelInsertConfigure(), cleanupAcceptedSession(), clearAnnotations() (+45 more)

### Community 8 - "el"
Cohesion: 0.07
Nodes (53): actionLabel(), applyConfigureBarChrome(), bindConfigureCountPillTooltip(), bindConfigureInlineControlHover(), bindConfigureModifierPillHover(), buildConfigureActionControl(), buildConfigureCountControl(), buildConfigureRow() (+45 more)

### Community 9 - "initPageChat"
Cohesion: 0.08
Nodes (53): armPageChatForTyping(), attachSteerFocusDebug(), attachSteerFocusGuard(), buildSteerProcessingDots(), buildSteerQueueHint(), clearSteerAwaitTimer(), clearSteerFocusRecoverTimer(), collapsePageChat() (+45 more)

### Community 10 - "renderDesignVisual"
Cohesion: 0.06
Nodes (47): bindEditBadgeProxy(), buildCollapsible(), buildColorModels(), buildDesignHeader(), buildListHtml(), buildRadiiModels(), buildTypographyModels(), cssSafe() (+39 more)

### Community 11 - "react"
Cohesion: 0.13
Nodes (31): react, AgentCard(), AgentCardProps, ChatMessage, ChatSimulation(), ChatSimulationProps, CodeLine, CodeWindow() (+23 more)

### Community 12 - "initGlobalBar"
Cohesion: 0.08
Nodes (39): agentHasWorkInFlight(), agentStatusText(), barPaletteForTheme(), brandMarkSvg(), buildParamsPanel(), cursorForInsertAxis(), designPanelCss(), detectPageTheme() (+31 more)

### Community 13 - "actOnAgentTarget"
Cohesion: 0.12
Nodes (40): actOnAgentTarget(), agentTargetBusyReason(), agentTargetOverlayGone(), agentTargetTaken(), claimAgentTarget(), claimAndActOnAgentTarget(), clearStoredManualApplyState(), declineAgentTargetBusy() (+32 more)

### Community 14 - "initPageChat"
Cohesion: 0.11
Nodes (39): agentHasWorkInFlight(), armPageChatForTyping(), buildSteerProcessingDots(), buildSteerQueueHint(), clearSteerAwaitTimer(), collapsePageChat(), expandPageChat(), finishVoiceSession() (+31 more)

### Community 15 - "renderDesignVisual"
Cohesion: 0.08
Nodes (39): buildCollapsible(), buildColorModels(), buildDesignHeader(), buildListHtml(), buildRadiiModels(), buildTypographyModels(), cssSafe(), designEmptyMessage() (+31 more)

### Community 16 - "applyEditing"
Cohesion: 0.08
Nodes (37): addManualContextText(), applyEditing(), buildLocatorForLeaf(), canRestoreManualEditElement(), collectManualContextPieces(), walk(), contextElementForManualEdit(), copyEditContainerContext() (+29 more)

### Community 17 - "documentRefForElement"
Cohesion: 0.07
Nodes (36): addManualContextText(), canRestoreManualEditElement(), collectEditableTextRows(), visit(), collectManualContextPieces(), walk(), contextElementForManualEdit(), copyEditContainerContext() (+28 more)

### Community 18 - "initGlobalBar"
Cohesion: 0.10
Nodes (34): agentStatusText(), barPaletteForTheme(), brandMarkSvg(), cursorForInsertAxis(), designPanelCss(), detectPageTheme(), ensureAgentPollTooltip(), fetchAgentPollingStatus() (+26 more)

### Community 19 - "remotion-best-practices/remotion-markup/remotion-maps/techniques/cesium/assets/CesiumFlythrough.tsx"
Cohesion: 0.10
Nodes (26): agents_skills_remotion_best_practices_remotion_markup_remotion_maps_techniques_cesium_assets_cesium_path, bearing(), CesiumFlythrough(), CesiumFlythroughProps, clamp(), FlyoverMode, havKm(), lerp() (+18 more)

### Community 20 - "mountSvelteComponentVariant"
Cohesion: 0.10
Nodes (33): acceptedDomAlreadyClean(), applyOriginalAttrsToSvelteAnchor(), clearHandledWrapperReloadStamp(), commitAcceptedSvelteComponentToDom(), componentModuleCandidates(), deferredRecoverySuperseded(), describeMountFailure(), detectDevServerBase() (+25 more)

### Community 21 - ".agents/skills/impeccable/scripts/live-browser.js"
Cohesion: 0.09
Nodes (31): applyGlobalBarLabelState(), applyLiveBarPreference(), applyParamValue(), buildInsertPlaceholderSnapshotFromDom(), buildLocatorForLeaf(), buildPickedAnchorSnapshot(), findMatchingCssBrace(), forbiddenManualTextChars() (+23 more)

### Community 22 - "remotion-best-practices/remotion-markup/remotion-maps/techniques/maptiler/assets/RiverReveal.tsx"
Cohesion: 0.09
Nodes (26): CountryLabel(), clamp01(), Country, countryPolygons, DRAW, EMPTY, END, lerp() (+18 more)

### Community 23 - "remotion-best-practices/remotion-maps/techniques/maptiler/assets/RiverReveal.tsx"
Cohesion: 0.09
Nodes (25): CountryLabel(), clamp01(), Country, countryPolygons, DRAW, EMPTY, END, lerp() (+17 more)

### Community 24 - "package.json"
Cohesion: 0.07
Nodes (29): description, license, name, private, repository, sideEffects, version, chroma-js (+21 more)

### Community 25 - "skills/remotion-maps/techniques/maptiler/assets/RiverReveal.tsx"
Cohesion: 0.09
Nodes (24): CountryLabel(), clamp01(), Country, countryPolygons, DRAW, EMPTY, END, lerp() (+16 more)

### Community 26 - "skills/remotion-markup/remotion-maps/techniques/maptiler/assets/RiverReveal.tsx"
Cohesion: 0.09
Nodes (24): CountryLabel(), clamp01(), Country, countryPolygons, DRAW, EMPTY, END, lerp() (+16 more)

### Community 27 - "DesignSystemGenerator"
Cohesion: 0.12
Nodes (12): Main search function with auto-domain detection, DesignSystemGenerator, Select best matching result based on priority keywords., Extract results list from search result dict., Generate complete design system recommendation., Generates design system recommendations from aggregated searches., Load reasoning rules from CSV., Execute searches across multiple domains. (+4 more)

### Community 28 - "remotion"
Cohesion: 0.13
Nodes (17): remotion, Arc(), arcLength, Atom(), COLOR_1, FONT_FAMILY, HelloWorld(), HelloWorldProps (+9 more)

### Community 29 - ".agent/skills/ui-ux-pro-max/scripts/design_system.py"
Cohesion: 0.14
Nodes (23): detect_domain(), _load_csv(), Load CSV and return list of dicts, Core search function using BM25, Auto-detect the most relevant domain from query, Search stack-specific guidelines, UI/UX Pro Max Core - BM25 search engine for UI/UX style guides, search() (+15 more)

### Community 30 - "remotion-best-practices/remotion-maps/techniques/maptiler/scripts/prep-geo.mjs"
Cohesion: 0.08
Nodes (18): ANCHOR_BBOX, biggestPoly(), borders, COUNTRIES, countryMeta, __dir, flowKm, FRAME_BBOX (+10 more)

### Community 31 - "showToast"
Cohesion: 0.13
Nodes (25): abandonForeignSession(), abandonSupersededGo(), cleanup(), clearScrollY(), copyToClipboard(), discardedWrappers(), discardOrphanedSession(), discardStateStyleId() (+17 more)

### Community 32 - "captureElementToBlob"
Cohesion: 0.10
Nodes (24): averageRgb01(), bufferToBase64(), captureAndEmit(), captureChromeNodes(), captureElementFromRenderedAncestor(), captureElementToBlob(), collectFontCssText(), compileShader() (+16 more)

### Community 33 - "remotion-best-practices/remotion-markup/remotion-maps/techniques/maptiler/scripts/prep-geo.mjs"
Cohesion: 0.08
Nodes (18): ANCHOR_BBOX, biggestPoly(), borders, COUNTRIES, countryMeta, __dir, flowKm, FRAME_BBOX (+10 more)

### Community 34 - "skills/remotion-maps/techniques/maptiler/scripts/prep-geo.mjs"
Cohesion: 0.08
Nodes (18): ANCHOR_BBOX, biggestPoly(), borders, COUNTRIES, countryMeta, __dir, flowKm, FRAME_BBOX (+10 more)

### Community 35 - "skills/remotion-markup/remotion-maps/techniques/maptiler/scripts/prep-geo.mjs"
Cohesion: 0.08
Nodes (18): ANCHOR_BBOX, biggestPoly(), borders, COUNTRIES, countryMeta, __dir, flowKm, FRAME_BBOX (+10 more)

### Community 36 - "handleManualEditActivity"
Cohesion: 0.20
Nodes (22): clearStoredManualApplyState(), handleManualEditActivity(), hidePendingApplyDock(), manualApplyLoadingText(), manualApplyStateKey(), manualEditEventForCurrentPage(), numberOrNull(), onPendingKeepFixingClick() (+14 more)

### Community 37 - "captureElementToBlob"
Cohesion: 0.12
Nodes (21): averageRgb01(), captureAndEmit(), captureChromeNodes(), captureElementFromRenderedAncestor(), captureElementToBlob(), compileShader(), cssColorToRgb01(), dominantRgb01() (+13 more)

### Community 38 - "onAnnotDown"
Cohesion: 0.15
Nodes (21): applyPlaceholderDimensions(), beginEditPin(), buildAnnotationsForCapture(), buildPinElement(), cancelEditingPin(), clampPlaceholderSize(), finalizeEditingPin(), initAnnotOverlay() (+13 more)

### Community 39 - "Potenziamenti/skills/ui-ux-pro-max/scripts/design_system.py"
Cohesion: 0.15
Nodes (16): Detect page type from context and search results., Design System Generator - Aggregates search results and applies reasoning to…, Persist design system to design-system/<project>/ folder using Master +…, Format design system as MASTER.md with hierarchical override logic., Format a page-specific override file with intelligent AI-generated content., Generate intelligent overrides based on page type using layered search. Uses…, datetime, os (+8 more)

### Community 40 - "remotion-best-practices/remotion-maps/techniques/cesium/scripts/prep-cesium-path.mjs"
Cohesion: 0.12
Nodes (16): A, AB, B, clip, __dir, even, havKm(), hs (+8 more)

### Community 41 - "remotion-best-practices/remotion-markup/remotion-maps/techniques/cesium/scripts/prep-cesium-path.mjs"
Cohesion: 0.12
Nodes (16): A, AB, B, clip, __dir, even, havKm(), hs (+8 more)

### Community 42 - "skills/remotion-maps/techniques/cesium/scripts/prep-cesium-path.mjs"
Cohesion: 0.12
Nodes (16): A, AB, B, clip, __dir, even, havKm(), hs (+8 more)

### Community 43 - "dependencies"
Cohesion: 0.11
Nodes (19): dependencies, chroma-js, culori, react, react-dom, @react-three/drei, @react-three/fiber, remotion (+11 more)

### Community 44 - "createLiveBrowserSessionState"
Cohesion: 0.21
Nodes (15): createLiveBrowserSessionState(), clearHandled(), clearScrollY(), clearSession(), isHandled(), loadSession(), markHandled(), nextCheckpointRevision() (+7 more)

### Community 45 - "skills/remotion-markup/remotion-maps/techniques/cesium/scripts/prep-cesium-path.mjs"
Cohesion: 0.13
Nodes (15): A, AB, B, clip, __dir, even, havKm(), hs (+7 more)

### Community 46 - "createLiveBrowserSessionState"
Cohesion: 0.21
Nodes (15): createLiveBrowserSessionState(), clearHandled(), clearScrollY(), clearSession(), isHandled(), loadSession(), markHandled(), nextCheckpointRevision() (+7 more)

### Community 47 - "onAnnotDown"
Cohesion: 0.20
Nodes (17): beginEditPin(), buildAnnotationsForCapture(), buildPinElement(), cancelEditingPin(), clampPlaceholderSize(), finalizeEditingPin(), initAnnotOverlay(), localCoords() (+9 more)

### Community 48 - "remotion-best-practices/remotion-maps/techniques/cesium/assets/CesiumFlythrough.tsx"
Cohesion: 0.20
Nodes (13): agents_skills_remotion_best_practices_remotion_maps_techniques_cesium_assets_cesium_path, bearing(), CesiumFlythrough(), CesiumFlythroughProps, clamp(), FlyoverMode, havKm(), lerp() (+5 more)

### Community 49 - "skills/remotion-markup/remotion-maps/techniques/cesium/assets/CesiumFlythrough.tsx"
Cohesion: 0.20
Nodes (13): agents_skills_remotion_markup_remotion_maps_techniques_cesium_assets_cesium_path, bearing(), CesiumFlythrough(), CesiumFlythroughProps, clamp(), FlyoverMode, havKm(), lerp() (+5 more)

### Community 50 - "showToast"
Cohesion: 0.17
Nodes (15): abandonForeignSession(), abandonSupersededGo(), copyToClipboard(), discardOrphanedSession(), dismissToast(), markSessionHandled(), maybeCompleteSteer(), maybeShowFirstSaveToast() (+7 more)

### Community 51 - "createLiveBrowserDomHelpers"
Cohesion: 0.17
Nodes (11): createLiveBrowserDomHelpers(), activeElementDeep(), cssId(), liveUiRoot(), makeFrozenAnchor(), own(), pickable(), rectIsUsableAnchor() (+3 more)

### Community 52 - "focusSteerChat"
Cohesion: 0.20
Nodes (16): attachSteerFocusDebug(), attachSteerFocusGuard(), clearSteerFocusRecoverTimer(), focusConfigureInput(), focusSteerChat(), isInlineEditActive(), isPageEditableActive(), isPageEditableElement() (+8 more)

### Community 53 - "createLiveBrowserDomHelpers"
Cohesion: 0.17
Nodes (11): createLiveBrowserDomHelpers(), activeElementDeep(), cssId(), liveUiRoot(), makeFrozenAnchor(), own(), pickable(), rectIsUsableAnchor() (+3 more)

### Community 54 - "BM25"
Cohesion: 0.22
Nodes (6): BM25, Lowercase, split, remove punctuation, filter short words, Build BM25 index from documents, Score all documents against query, BM25 ranking algorithm for text search, BM25

### Community 55 - "claimAndActOnAgentTarget"
Cohesion: 0.31
Nodes (14): agentTargetBusyReason(), agentTargetOverlayGone(), agentTargetTaken(), claimAgentTarget(), claimAndActOnAgentTarget(), declineAgentTargetBusy(), declineAgentTargetUnresolvable(), describeAgentTargetCandidate() (+6 more)

### Community 56 - "compilerOptions"
Cohesion: 0.14
Nodes (13): compilerOptions, esModuleInterop, forceConsistentCasingInFileNames, jsx, lib, module, moduleResolution, noEmit (+5 more)

### Community 57 - "handleMouseMove"
Cohesion: 0.17
Nodes (12): applyPlaceholderSizingStyles(), createInsertPlaceholder(), detectInsertAxis(), detectInsertAxisFromStyle(), ensureInsertLine(), handleMouseMove(), hideHighlightTagTooltip(), layoutFlowChildren() (+4 more)

### Community 58 - "buildSveltePropValuesV2"
Cohesion: 0.18
Nodes (12): buildSvelteExpressionTextMap(), buildSveltePropValuesFromLiveElement(), buildSveltePropValuesV2(), cloneWithoutElements(), collectTextNodes(), collectVisibleTexts(), cssEscapeIdent(), escapeRegExp() (+4 more)

### Community 59 - ".agent/skills/ui-ux-pro-max/scripts/search.py"
Cohesion: 0.31
Nodes (8): format_output(), UI/UX Pro Max Search - BM25 search engine for UI/UX style guides Usage: python…, Format results for Claude consumption (token-optimized), argparse, io, json, format_output(), sys

### Community 60 - "bpy"
Cohesion: 0.27
Nodes (5): bpy, math, mathutils, shutil, time

### Community 61 - "devDependencies"
Cohesion: 0.22
Nodes (9): devDependencies, eslint, prettier, @remotion/eslint-config-flat, @types/chroma-js, @types/react, @types/three, @types/web (+1 more)

### Community 62 - "applyPlaceholderDimensions"
Cohesion: 0.25
Nodes (8): applyPlaceholderDimensions(), buildPlaceholderResizeHandles(), cursorForPlaceholderEdge(), materializePlaceholderWidth(), placeholderWidthIsImplicit(), positionAnnotOverlay(), startPlaceholderEdgeResize(), syncPlaceholderResizeHandles()

### Community 63 - "generate_design_system"
Cohesion: 0.29
Nodes (6): format_ascii_box(), format_markdown(), generate_design_system(), Format design system as ASCII box with emojis (MCP-style)., Format design system as markdown., Main entry point for design system generation. Args: query: Search query (e.g.,…

### Community 64 - "releaseDiscardedStaticWrappers"
Cohesion: 0.29
Nodes (7): discardedWrappers(), discardStateStyleId(), releaseDiscardedStaticWrapper(), releaseDiscardedStaticWrappers(), removeDiscardStateStylesheet(), showOriginalDuringDiscard(), watchForDiscardedFrameworkWrapperRemoval()

### Community 65 - ".agents/skills/impeccable/scripts/live-browser-ignores.js"
Cohesion: 0.52
Nodes (6): globToRegex(), matchesScope(), normalizeIgnoreRule(), normalizeIgnoreValue(), pageCandidates(), resolveDetectIgnores()

### Community 66 - "Potenziamenti/skills/impeccable/scripts/live-browser-ignores.js"
Cohesion: 0.52
Nodes (6): globToRegex(), matchesScope(), normalizeIgnoreRule(), normalizeIgnoreValue(), pageCandidates(), resolveDetectIgnores()

### Community 67 - ".agents/skills/impeccable/scripts/impeccable"
Cohesion: 0.60
Nodes (5): impeccable script, check_download(), fetch_url(), probe_ok(), setup_help()

### Community 68 - "resolveInsertHover"
Cohesion: 0.33
Nodes (6): computeInsertPosition(), groupSiblingRows(), hitSiblingInsertGap(), horizontalOverlap(), insertLineCoords(), resolveInsertHover()

### Community 69 - "Potenziamenti/skills/impeccable/scripts/impeccable"
Cohesion: 0.60
Nodes (5): impeccable script, check_download(), fetch_url(), probe_ok(), setup_help()

### Community 74 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, upgrade

## Knowledge Gaps
- **246 isolated node(s):** `AgentCardProps`, `ChatSimulationProps`, `CodeLine`, `CodeWindowProps`, `HeaderProps` (+241 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 348 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `NOTE: the compiled component imported from the dev server already carries` connect `.agents/skills/impeccable/scripts/live-browser.js` to `Potenziamenti/skills/impeccable/scripts/live-browser.js`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Why does `NOTE: do NOT clear the persistent scroll key here. startScrollLock` connect `.agents/skills/impeccable/scripts/live-browser.js` to `Potenziamenti/skills/impeccable/scripts/live-browser.js`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Why does `TODO: Enable this proxy for React/Vue/etc. adapters once their live` connect `.agents/skills/impeccable/scripts/live-browser.js` to `Potenziamenti/skills/impeccable/scripts/live-browser.js`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **What connects `AgentCardProps`, `ChatSimulationProps`, `CodeLine` to the rest of the system?**
  _246 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Potenziamenti/skills/impeccable/scripts/live-browser.js` be split into smaller, more focused modules?**
  _Cohesion score 0.042321879246748205 - nodes in this community are weakly interconnected._
- **Should `connectSSE` be split into smaller, more focused modules?**
  _Cohesion score 0.06388888888888888 - nodes in this community are weakly interconnected._
- **Should `connectSSE` be split into smaller, more focused modules?**
  _Cohesion score 0.06329113924050633 - nodes in this community are weakly interconnected._