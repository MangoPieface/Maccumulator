export type Fixture = {
  id: string;
  round: string;
  /** Local kickoff datetime, ISO without timezone (treated as UK local). */
  kickoffAt: string;
  homeCode: string;
  homeName: string;
  awayCode: string;
  awayName: string;
};

/**
 * The remaining World Cup semi-finals. Hardcoded for the demo — swap for a
 * live fixtures feed when integrating for real.
 */
export const FIXTURES: Fixture[] = [
  {
    id: "sf1",
    round: "Semi-final",
    kickoffAt: "2026-08-14T20:00:00",
    homeCode: "fr",
    homeName: "France",
    awayCode: "es",
    awayName: "Spain",
  },
  {
    id: "sf2",
    round: "Semi-final",
    kickoffAt: "2026-08-15T20:00:00",
    homeCode: "gb-eng",
    homeName: "England",
    awayCode: "ar",
    awayName: "Argentina",
  },
];

export function fixtureLabel(f: Fixture): string {
  return `${f.homeName} v ${f.awayName}`;
}

/** Midnight (local) of the given date, as a fresh Date. */
function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/**
 * Fixtures still worth showing: a match stays until the end of its kickoff day
 * and disappears the following day. e.g. a match on 09 Jul is visible on
 * 09 Jul and gone from 10 Jul onwards.
 */
export function upcomingFixtures(now: Date = new Date()): Fixture[] {
  const today = startOfDay(now).getTime();
  return FIXTURES.filter(
    (f) => startOfDay(new Date(f.kickoffAt)).getTime() >= today,
  );
}

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

/**
 * A friendly kickoff label relative to "now": "Today", "Tomorrow" or a dated
 * weekday, always with the time. Computed so it never goes stale.
 */
export function kickoffLabel(f: Fixture, now: Date = new Date()): string {
  const kick = new Date(f.kickoffAt);
  const time = `${pad(kick.getHours())}:${pad(kick.getMinutes())}`;

  const diffDays = Math.round(
    (startOfDay(kick).getTime() - startOfDay(now).getTime()) / 86_400_000,
  );

  let day: string;
  if (diffDays === 0) day = "Today";
  else if (diffDays === 1) day = "Tomorrow";
  else {
    day = `${DAY_NAMES[kick.getDay()]} ${kick.getDate()} ${MONTH_NAMES[kick.getMonth()]}`;
  }

  return `${day} ${time}`;
}
