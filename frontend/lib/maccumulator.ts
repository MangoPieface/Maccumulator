export type EventType = {
  id: string;
  name: string;
  emoji: string;
  suggestedAmount: number;
  description: string;
};

export type EventLine = {
  id: string;
  name: string;
  emoji: string;
  amount: number;
  count: number;
};

export type Session = {
  id: string;
  matchName: string;
  teamA: string;
  teamB: string;
  teamACode?: string;
  teamBCode?: string;
  lines: EventLine[];
};

/** Mocked default event catalogue for a football match Maccumulator. */
export const DEFAULT_EVENTS: EventType[] = [
  { id: "goal", name: "Goal scored", emoji: "\u26BD", suggestedAmount: 2.0, description: "Every time a goal hits the back of the net." },
  { id: "penalty", name: "Penalty awarded", emoji: "\u{1F3AF}", suggestedAmount: 1.0, description: "A spot kick is given." },
  { id: "penalty-miss", name: "Penalty missed", emoji: "\u{1F645}", suggestedAmount: 1.0, description: "A penalty is missed or saved." },
  { id: "yellow", name: "Yellow card", emoji: "\u{1F7E8}", suggestedAmount: 0.5, description: "Booking for a bad tackle or dissent." },
  { id: "red", name: "Red card", emoji: "\u{1F7E5}", suggestedAmount: 2.0, description: "A player is sent off." },
  { id: "var", name: "VAR review", emoji: "\u{1F4FA}", suggestedAmount: 0.5, description: "The video ref takes another look." },
  { id: "corner", name: "Corner", emoji: "\u{1F6A9}", suggestedAmount: 0.2, description: "A corner kick is won." },
  { id: "save", name: "Big save", emoji: "\u{1F9E4}", suggestedAmount: 0.5, description: "The keeper pulls off a stunner." },
  { id: "own-goal", name: "Own goal", emoji: "\u{1F648}", suggestedAmount: 2.0, description: "Oops \u2013 into their own net." },
  { id: "sub", name: "Substitution", emoji: "\u{1F504}", suggestedAmount: 0.2, description: "A fresh pair of legs comes on." },
];

/** Where a real integration would hand off to the Macmillan donation flow. */
const DONATION_BASE =
  "https://donation.macmillan.org.uk/donation/makewith";

export function subtotal(line: EventLine): number {
  return line.amount * line.count;
}

export function total(session: Session): number {
  return session.lines.reduce((sum, l) => sum + subtotal(l), 0);
}

export function donationUrl(session: Session): string {
  const amount = total(session).toFixed(2);
  return `${DONATION_BASE}?fc=maccumulator&type=One_Off&amount=${amount}`;
}

export function createSession(input: {
  matchName: string;
  teamA: string;
  teamB: string;
  teamACode?: string;
  teamBCode?: string;
  amounts: Record<string, number>;
}): Session {
  const id = Math.random().toString(36).slice(2, 10);
  return {
    id,
    matchName: input.matchName.trim() || "The Big Match",
    teamA: input.teamA.trim() || "Home",
    teamB: input.teamB.trim() || "Away",
    teamACode: input.teamACode,
    teamBCode: input.teamBCode,
    lines: DEFAULT_EVENTS.map((ev) => ({
      id: ev.id,
      name: ev.name,
      emoji: ev.emoji,
      amount: Math.max(0, input.amounts[ev.id] ?? ev.suggestedAmount),
      count: 0,
    })),
  };
}

export function adjust(session: Session, eventId: string, delta: number): Session {
  return {
    ...session,
    lines: session.lines.map((l) =>
      l.id === eventId ? { ...l, count: Math.max(0, l.count + delta) } : l
    ),
  };
}

export function formatGBP(value: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(value);
}

/* ---- localStorage persistence (no backend needed) ---- */

const KEY_PREFIX = "maccumulator:";

export function saveSession(session: Session): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY_PREFIX + session.id, JSON.stringify(session));
}

export function loadSession(id: string): Session | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(KEY_PREFIX + id);
  return raw ? (JSON.parse(raw) as Session) : null;
}
