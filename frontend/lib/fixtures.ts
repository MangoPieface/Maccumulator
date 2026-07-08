export type Fixture = {
  id: string;
  round: string;
  kickoff: string;
  homeCode: string;
  homeName: string;
  awayCode: string;
  awayName: string;
};

/**
 * The remaining World Cup quarter-finals. Hardcoded for the demo — swap for a
 * live fixtures feed when integrating for real.
 */
export const FIXTURES: Fixture[] = [
  {
    id: "qf1",
    round: "Quarter-final",
    kickoff: "Tomorrow 21:00",
    homeCode: "fr",
    homeName: "France",
    awayCode: "ma",
    awayName: "Morocco",
  },
  {
    id: "qf2",
    round: "Quarter-final",
    kickoff: "Fri 10 Jul 20:00",
    homeCode: "es",
    homeName: "Spain",
    awayCode: "be",
    awayName: "Belgium",
  },
  {
    id: "qf3",
    round: "Quarter-final",
    kickoff: "Sat 11 Jul 22:00",
    homeCode: "no",
    homeName: "Norway",
    awayCode: "gb-eng",
    awayName: "England",
  },
  {
    id: "qf4",
    round: "Quarter-final",
    kickoff: "Sun 12 Jul 02:00",
    homeCode: "ar",
    homeName: "Argentina",
    awayCode: "ch",
    awayName: "Switzerland",
  },
];

export function fixtureLabel(f: Fixture): string {
  return `${f.homeName} v ${f.awayName}`;
}
