"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import {
  adjust,
  formatGBP,
  loadSession,
  saveSession,
  subtotal,
  total,
  type Session,
} from "@/lib/maccumulator";
import { useHydrated } from "@/lib/hooks";
import { Flag } from "@/components/Flag";

export default function TrackPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const hydrated = useHydrated();
  const [session, setSession] = useState<Session | null>(() => loadSession(id));

  function step(eventId: string, delta: number) {
    setSession((prev) => {
      if (!prev) return prev;
      const next = adjust(prev, eventId, delta);
      saveSession(next);
      return next;
    });
  }

  if (!hydrated) {
    return <p className="mac-muted">Loading your Maccumulator…</p>;
  }

  if (!session) {
    return (
      <div className="mac-card">
        <p className="mac-error">We couldn&apos;t find that Maccumulator.</p>
        <button
          className="mac-btn mac-btn--ghost"
          onClick={() => router.push("/")}
        >
          Start again
        </button>
      </div>
    );
  }

  const runningTotal = total(session);

  return (
    <>
      <div className="mac-scoreboard">
        <div>
          <div className="total-label">{session.matchName}</div>
          <div className="teams">
            {session.teamACode && (
              <Flag code={session.teamACode} name={session.teamA} size={18} />
            )}
            {session.teamA} v {session.teamB}
            {session.teamBCode && (
              <Flag code={session.teamBCode} name={session.teamB} size={18} />
            )}
          </div>
        </div>
        <div className="mac-scoreboard-total">
          <div className="total-label">Maccumulator total</div>
          <div className="total-value">{formatGBP(runningTotal)}</div>
        </div>
      </div>

      <div className="mac-card">
        <h2>Tap the action as it happens</h2>
        {session.lines.map((line) => (
          <div className="mac-tracker-row" key={line.id}>
            <span className="mac-event-emoji" aria-hidden>
              {line.emoji}
            </span>
            <div className="mac-tracker-meta">
              <div className="name">{line.name}</div>
              <div className="rate">{formatGBP(line.amount)} each</div>
            </div>
            <div className="mac-counter">
              <button
                className="mac-step mac-step--minus"
                aria-label={`Remove one ${line.name}`}
                onClick={() => step(line.id, -1)}
                disabled={line.count === 0}
              >
                −
              </button>
              <span className="count">{line.count}</span>
              <button
                className="mac-step mac-step--plus"
                aria-label={`Add one ${line.name}`}
                onClick={() => step(line.id, 1)}
              >
                +
              </button>
            </div>
            <span className="mac-subtotal">{formatGBP(subtotal(line))}</span>
          </div>
        ))}
      </div>

      <div className="mac-sticky-cta">
        <button
          className="mac-btn mac-btn--block"
          onClick={() => router.push(`/donate/${id}`)}
        >
          Final whistle — donate {formatGBP(runningTotal)}
        </button>
      </div>
    </>
  );
}
