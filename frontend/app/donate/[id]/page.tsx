"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  donationUrl,
  formatGBP,
  loadSession,
  subtotal,
  total,
  type Session,
} from "@/lib/maccumulator";
import { useHydrated } from "@/lib/hooks";
import { Flag } from "@/components/Flag";

export default function DonatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const hydrated = useHydrated();
  const [session] = useState<Session | null>(() => loadSession(id));

  if (!hydrated) {
    return <p className="mac-muted">Tallying up your Maccumulator…</p>;
  }

  if (!session) {
    return (
      <div className="mac-card">
        <p className="mac-error">We couldn&apos;t find that Maccumulator.</p>
        <Link href="/" className="mac-btn mac-btn--ghost">
          Start again
        </Link>
      </div>
    );
  }

  const finalTotal = total(session);
  const url = donationUrl(session);
  const scored = session.lines.filter((l) => l.count > 0);

  return (
    <>
      <section className="mac-hero">
        <h1>Full time!</h1>
        <p className="mac-hero-teams">
          {session.teamACode && (
            <Flag code={session.teamACode} name={session.teamA} size={18} />
          )}
          {session.teamA} v {session.teamB}
          {session.teamBCode && (
            <Flag code={session.teamBCode} name={session.teamB} size={18} />
          )}
        </p>
        <p>Here&apos;s your final Maccumulator total.</p>
      </section>

      <div className="mac-total-hero">
        <div className="mac-muted">Your Maccumulator raised</div>
        <div className="amount">{formatGBP(finalTotal)}</div>
        <div className="mac-muted">for Macmillan Cancer Support</div>
      </div>

      <div className="mac-card">
        <h2>Your match breakdown</h2>
        {scored.length === 0 ? (
          <p className="mac-muted">No events were tracked this match.</p>
        ) : (
          scored.map((line) => (
            <div className="mac-summary-row" key={line.id}>
              <span>
                {line.emoji} {line.name} × {line.count}
              </span>
              <strong>{formatGBP(subtotal(line))}</strong>
            </div>
          ))
        )}
        <div className="mac-summary-row" style={{ marginTop: "0.5rem" }}>
          <strong>Total</strong>
          <strong>{formatGBP(finalTotal)}</strong>
        </div>
      </div>

      <a
        className="mac-btn mac-btn--block"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Donate {formatGBP(finalTotal)} to Macmillan
      </a>
      <p className="mac-note">
        This MVP hands off to the Macmillan donation flow with your total
        pre-filled. Destination: <span className="mac-muted">{url}</span>
      </p>

      <div style={{ marginTop: "1rem" }}>
        <Link href="/" className="mac-btn mac-btn--ghost">
          Start another Maccumulator
        </Link>
      </div>
    </>
  );
}
