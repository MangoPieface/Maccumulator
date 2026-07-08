"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DEFAULT_EVENTS, createSession, saveSession } from "@/lib/maccumulator";
import { FIXTURES, fixtureLabel, type Fixture } from "@/lib/fixtures";
import { Flag } from "@/components/Flag";

export default function SetupPage() {
  const router = useRouter();
  const [amounts, setAmounts] = useState<Record<string, string>>(() => {
    const seed: Record<string, string> = {};
    DEFAULT_EVENTS.forEach((e) => (seed[e.id] = e.suggestedAmount.toFixed(2)));
    return seed;
  });
  const [selectedId, setSelectedId] = useState<string>(FIXTURES[0].id);

  const selected = FIXTURES.find((f) => f.id === selectedId) ?? FIXTURES[0];

  function handleStart(fixture: Fixture) {
    const numericAmounts: Record<string, number> = {};
    for (const [id, val] of Object.entries(amounts)) {
      const n = Number.parseFloat(val);
      numericAmounts[id] = Number.isFinite(n) && n >= 0 ? n : 0;
    }
    const session = createSession({
      matchName: `${fixtureLabel(fixture)} · ${fixture.round}`,
      teamA: fixture.homeName,
      teamB: fixture.awayName,
      teamACode: fixture.homeCode,
      teamBCode: fixture.awayCode,
      amounts: numericAmounts,
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
          Set how much each match event is worth. We&apos;ve pre-filled suggested
          amounts.
        </p>
        {DEFAULT_EVENTS.map((ev) => (
          <div className="mac-event-config" key={ev.id}>
            <span className="mac-event-emoji" aria-hidden>
              {ev.emoji}
            </span>
            <div className="mac-event-meta">
              <div className="name">{ev.name}</div>
              <div className="desc">{ev.description}</div>
            </div>
            <div className="mac-amount-input">
              <span className="prefix">£</span>
              <input
                type="number"
                inputMode="decimal"
                min="0"
                step="0.10"
                aria-label={`Donation amount for ${ev.name}`}
                value={amounts[ev.id] ?? ""}
                onChange={(e) =>
                  setAmounts((a) => ({ ...a, [ev.id]: e.target.value }))
                }
              />
            </div>
          </div>
        ))}
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
