# Daily Mulank Guide

A numerology (Mulank / Driver Number) and Vedic-astrology-inspired daily guide, built with
**React + TypeScript + Tailwind CSS + Vite**. Everything is calculated client-side — no backend,
no API keys, no database.

## Project structure

```
mulank-guide/
├─ index.html
├─ package.json
├─ vite.config.ts
├─ tailwind.config.js
├─ tsconfig.json
└─ src/
   ├─ main.tsx              # React entry point
   ├─ App.tsx                # Top-level layout, IST midnight rollover
   ├─ index.css              # Tailwind directives + small custom styles
   ├─ components/
   │  ├─ Header.tsx
   │  ├─ ISTClock.tsx
   │  ├─ MuhuratCard.tsx      # city select + 4 muhurat tiles
   │  ├─ Timeline.tsx         # sun/muhurat timeline visual
   │  ├─ MulankLookup.tsx     # DOB → Mulank finder
   │  ├─ MulankGrid.tsx
   │  ├─ MulankCard.tsx
   │  └─ Disclaimer.tsx
   └─ utils/
      ├─ dateUtils.ts         # IST + per-city local time helpers
      ├─ cities.ts            # city list (lat/lon/timezone)
      ├─ sunCalc.ts           # sunrise/sunset equation
      ├─ muhurat.ts           # Rahu Kaal / Amrit Kaal / Abhijit / Brahma Muhurat
      └─ numerology.ts        # Mulank calc, lucky colors, deterministic forecasts
```

## Run locally

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview   # optional: preview the production build locally
```

The static output goes to `dist/`.

## Deploy to Vercel

**Option A — Vercel CLI**

```bash
npm install -g vercel
vercel
```

Vercel auto-detects Vite projects. Framework preset: **Vite**, build command `npm run build`,
output directory `dist`.

**Option B — Git integration**

1. Push this folder to a GitHub/GitLab/Bitbucket repo.
2. Import the repo in the Vercel dashboard.
3. Vercel will detect Vite automatically — no extra configuration needed.

## Notes

- All dates/times are calculated in **Asia/Kolkata (IST)** for the Mulank report and daily rollover.
  The Muhurat panel additionally supports selecting other world cities, in which case sunrise/sunset
  and Muhurat timings are shown in **that city's own local time** (DST-aware), while the report date
  above always stays on IST.
- Muhurat timings are computed with the standard sunrise/sunset equation (no external API), so there's
  nothing to configure or pay for.
- Daily forecasts, lucky colors, and ratings are generated deterministically from the date + Mulank, so
  refreshing the page never changes the day's content, but each day differs.
