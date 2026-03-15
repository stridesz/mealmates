# MealMates — Waitlist Landing Page

A minimal Next.js App Router landing page for **MealMates**: exclusive restaurant discounts for college students who dine out in groups.

## Tech stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Waitlist storage**: Google Sheets via `googleapis` (optional)

---

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Fill in the Google Sheets credentials in `.env.local` (see `.env.example` for details). The app works without them — emails are logged to stdout instead.

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Google Sheets setup (optional)

1. Create a Google Sheet and note its **Sheet ID** (from the URL).
2. In [Google Cloud Console](https://console.cloud.google.com), create a **Service Account** and download its JSON key.
3. Share your sheet with the service account email (`Editor` role).
4. Copy values from the JSON key into `.env.local`:
   - `GOOGLE_SHEET_ID`
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY` (replace literal newlines with `\n`)

---

## Build

```bash
npm run build
```

---

## Deploy to Vercel

1. Push the repo to GitHub.
2. Import the project in [Vercel](https://vercel.com).
3. Add the three `GOOGLE_*` environment variables in the Vercel dashboard.
4. Deploy — Vercel auto-detects Next.js.

> **Note**: The `GOOGLE_PRIVATE_KEY` value in Vercel should be pasted as-is (Vercel handles multi-line env vars correctly in its dashboard).
