# The Maccumulator — digital MVP

A digital version of Macmillan Cancer Support's [Maccumulator](https://www.macmillan.org.uk/fundraise/fundraising-ideas/social/maccumulator)
fundraising idea: a football watch-party game where you assign a donation amount
to match events (goals, cards, penalties, VAR reviews, corners, saves…), tap them
live as the match unfolds, and donate the running total to Macmillan at full time.

This is a mocked-data MVP built strictly to the Macmillan look & feel. At full time
it hands off to the real Macmillan single-donation flow with the computed amount
pre-filled.

## Stack

- **Next.js (App Router, TypeScript)** — a single frontend app, no backend.
- All game logic runs client-side (`lib/maccumulator.ts`) and state persists in
  `localStorage`, so it deploys straight to **Vercel** with no server.

## Screens

1. **Setup** (`app/page.tsx`) — pick one of the four World Cup quarter-finals
   (hardcoded for the demo, with country flags) and set the donation amount per event.
2. **Tracker** (`app/track/[id]/page.tsx`) — tap `+`/`-` on each event as it happens;
   a running Maccumulator total updates live.
3. **Full time** (`app/donate/[id]/page.tsx`) — match breakdown plus a
   "Donate £X to Macmillan" button that deep-links to
   `https://donation.macmillan.org.uk/donation/makewith`
   with `amount` pre-filled.

## Notes

- Flags are rendered as images via [flagcdn.com](https://flagcdn.com) (see
  `components/Flag.tsx`) because emoji flags don't render on all platforms.
  `next.config.ts` allow-lists `flagcdn.com` for `next/image`.
- Fixtures live in `lib/fixtures.ts` — swap these out to change the matches.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Push to a Git repo and import into [Vercel](https://vercel.com/new) — no environment
variables or backend required.
