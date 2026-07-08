"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DEFAULT_EVENTS, createSession, formatGBP, saveSession } from "@/lib/maccumulator";
import { FIXTURES, fixtureLabel, type Fixture } from "@/lib/fixtures";
import { Flag } from "@/components/Flag";

export default function SetupPage() {
  const router = useRouter();
  const [amounts, setAmounts] = useState<Record<string, number>>(() => {
    const seed: Record<string, number> = {};
    DEFAULT_EVENTS.forEach((e) => (seed[e.id] = e.suggestedAmount));
    return seed;
  });
  const [selectedId, setSelectedId] = useState<string>(FIXTURES[0].id);

  const selected = FIXTURES.find((f) => f.id === selectedId) ?? FIXTURES[0];

  function stepAmount(id: string, direction: 1 | -1) {
    setAmounts((a) => {
      const current = a[id] ?? 0;
      // Coarse 50p steps at/above 50p; fine 10p steps below 50p.
      let step: number;
      if (direction === 1) {
        step = current < 0.5 ? 0.1 : 0.5;
      } else {
        step = current <= 0.5 ? 0.1 : 0.5;
      }
      const next = Math.max(0, Math.round((current + direction * step) * 100) / 100);
      return { ...a, [id]: next };
    });
  }

  function handleStart(fixture: Fixture) {
    const session = createSession({
      matchName: `${fixtureLabel(fixture)} · ${fixture.round}`,
      teamA: fixture.homeName,
      teamB: fixture.awayName,
      teamACode: fixture.homeCode,
      teamBCode: fixture.awayCode,
      amounts,
    });
    saveSession(session);
    router.push(`/track/${session.id}`);
  }

  return (
    <>
      <section className="mac-hero">
        <h1>The Maccumulator</h1>
        <p>
          Pick your donation amount for goals, cards, penalties, VAR reviews and
          more. Keep track as the match unfolds, then donate your final total
          after the final whistle.
        </p>
      </section>

      <div className="mac-card">
        <h2>Pick your match</h2>
        <p className="mac-muted">Choose a World Cup quarter-final to follow.</p>
        <ul className="mac-fixture-list">
          {FIXTURES.map((f) => {
            const active = f.id === selectedId;
            return (
              <li key={f.id}>
                <button
                  type="button"
                  className={`mac-fixture${active ? " is-active" : ""}`}
                  aria-pressed={active}
                  onClick={() => setSelectedId(f.id)}
                >
                  <span className="mac-fixture-teams">
                    <span className="team">
                      <Flag code={f.homeCode} name={f.homeName} />
                      {f.homeName}
                    </span>
                    <span className="mac-fixture-v">v</span>
                    <span className="team">
                      <Flag code={f.awayCode} name={f.awayName} />
                      {f.awayName}
                    </span>
                  </span>
                  <span className="mac-fixture-meta">
                    <span className="round">{f.round}</span>
                    <span className="kickoff">{f.kickoff}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mac-card">
        <h2>Choose your donation amounts</h2>
        <p className="mac-muted">
          Set how much each match event is worth. Steps in 50p up to bigger
          amounts, and 10p below 50p. We&apos;ve pre-filled suggested amounts.
        </p>
        {DEFAULT_EVENTS.map((ev) => {
          const value = amounts[ev.id] ?? 0;
          return (
            <div className="mac-event-config" key={ev.id}>
              <span className="mac-event-emoji" aria-hidden>
                {ev.emoji}
              </span>
              <div className="mac-event-meta">
                <div className="name">{ev.name}</div>
                <div className="desc">{ev.description}</div>
              </div>
              <div className="mac-counter">
                <button
                  type="button"
                  className="mac-step mac-step--minus"
                  aria-label={`Decrease amount for ${ev.name}`}
                  onClick={() => stepAmount(ev.id, -1)}
                  disabled={value <= 0}
                >
                  −
                </button>
                <span
                  className="count amount"
                  aria-label={`Amount for ${ev.name}: ${formatGBP(value)}`}
                >
                  {formatGBP(value)}
                </span>
                <button
                  type="button"
                  className="mac-step mac-step--plus"
                  aria-label={`Increase amount for ${ev.name}`}
                  onClick={() => stepAmount(ev.id, 1)}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mac-sticky-cta">
        <button
          className="mac-btn mac-btn--block"
          onClick={() => handleStart(selected)}
        >
          <Flag code={selected.homeCode} name={selected.homeName} />
          Start {fixtureLabel(selected)}
          <Flag code={selected.awayCode} name={selected.awayName} />
        </button>
      </div>
    </>
  );
}
