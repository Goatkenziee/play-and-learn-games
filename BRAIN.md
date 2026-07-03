# BRAIN.md

## What this app does
Educational games site for K-3rd grade, all curriculum-based.

## Current state
✅ **Game previews added** — Each game card now shows a unique inline SVG preview illustration before the card content. Previews are colorful, subject-specific mini-scenes (e.g., a bridge for Adventure Addition, a bee for Spelling Bee, a lion for Sight Word Safari).

## Tech stack
Next.js 14, TypeScript, Tailwind CSS, React, lucide-react icons.

## What has been built
- 28 files total
- **New:** `components/ui/game-preview.tsx` — Inline SVG game previews (no external images needed). Each of the 9 games gets a unique illustrated SVG scene matching the game's theme.
- **Modified:** `app/page.tsx` — Cards now have `p-0`, `overflow-hidden`, and render `<GamePreview>` at the top above the card body content.
- 9 game components: CountTheObjects, AdventureAddition, SubtractionSplash, MultiplicationMountain, ShapeSorter, PhonicsFun, SightWordSafari, SpellingBee, WordFamilies
- UI components: button, card, game-preview
- Search + subject/grade filtering + hero section + footer

## Latest verification
- ✅ TypeScript checks pass (only error is undici-types in node_modules, not our code)
- ✅ GamePreview component renders inline SVGs for all 9 games
- ✅ Cards use p-0 + overflow-hidden so previews sit flush at the top
- ❌ Vercel deploy blocked — user needs to reconnect Vercel integration

## User preferences
- Keep changes focused, modern, and production-ready.
- No external image dependencies — all previews are inline SVG.

## Run notes
- Last updated: 2026-07-03T18:00:00.000Z
- Feature: Game card previews (inline SVG illustrations)
