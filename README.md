# The Maccumulator — Digital MVP

A digital version of Macmillan's **[Maccumulator](https://www.macmillan.org.uk/fundraise/fundraising-ideas/social/maccumulator)**
fundraising idea. Instead of a printable score sheet, you set a donation amount
for football match events (goals, cards, penalties, VAR reviews, corners...),
tap them live as the match unfolds, and donate your running total to Macmillan
at the final whistle.

This is an MVP with **mocked data**. The final "Donate" button hands off to the
Macmillan donation flow with the total pre-filled, standing in for a real
integration.

## Stack

A single **Next.js** app (App Router, TypeScript) — no backend required. All the
logic (event catalogue, running total, donation hand-off URL) lives client-side,
and in-progress matches are kept in `localStorage`. This deploys straight to
Vercel as a static/edge app.

> An earlier version had a .NET API, but at this MVP level it only served a
> hardcoded list and did trivial arithmetic, so it was removed to keep the app
> deployable to Vercel with zero infrastructure. Reintroduce a backend when you
> need real persistence, shared multi-device sessions, auth, or a genuine
> server-side donation integration.

## Screens / flow

1. **Setup** (`/`) — name the match, set the teams, choose the donation amount
   per event (suggested amounts pre-filled).
2. **Live tracker** (`/track/[id]`) — tap `+` / `−` per event, watch the
   Maccumulator total climb on the scoreboard. State persists on refresh.
3. **Full time** (`/donate/[id]`) — breakdown + total, then donate to Macmillan
   via the mocked deep-link.

## Brand

Styled strictly to the Macmillan brand: greens `#008A26` / `#01D664`, Cera Pro
font family (Arial/Helvetica fallback), rounded 12px cards & 4px buttons, and the
signature bright-green button that flips to black-on-white on hover.

## Running locally

```powershell
cd frontend
npm install
npm run dev
```

Then open <http://localhost:3000>.

## Deploying to Vercel

Point Vercel at the `frontend/` directory (set it as the project root / "Root
Directory"). No environment variables are required.

## Notes

- Matches are stored in the browser's `localStorage`, keyed by a generated id in
  the URL — fine for a demo/MVP. Clearing site data resets them.
- The donation hand-off links to Macmillan's real single-donation flow with the
  total passed through:
  `https://donation.macmillan.org.uk/donation/makewith?fc=default&type=One_Off&amount=…`
