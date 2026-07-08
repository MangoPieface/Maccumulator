export type Team = {
  /** ISO 3166-1 alpha-2 country code (lower-case) used to derive the flag. */
  code: string;
  name: string;
};

/**
 * A broad catalogue of nations for the World Cup team picker. Used both as the
 * default/offline picker and to resolve flags for teams returned by the live
 * fixtures API.
 */
export const TEAMS: Team[] = [
  { code: "ar", name: "Argentina" },
  { code: "au", name: "Australia" },
  { code: "at", name: "Austria" },
  { code: "be", name: "Belgium" },
  { code: "br", name: "Brazil" },
  { code: "ca", name: "Canada" },
  { code: "cl", name: "Chile" },
  { code: "co", name: "Colombia" },
  { code: "hr", name: "Croatia" },
  { code: "dk", name: "Denmark" },
  { code: "ec", name: "Ecuador" },
  { code: "eg", name: "Egypt" },
  { code: "gb-eng", name: "England" },
  { code: "fr", name: "France" },
  { code: "de", name: "Germany" },
  { code: "gh", name: "Ghana" },
  { code: "gr", name: "Greece" },
  { code: "ir", name: "Iran" },
  { code: "it", name: "Italy" },
  { code: "ci", name: "Ivory Coast" },
  { code: "jp", name: "Japan" },
  { code: "kr", name: "South Korea" },
  { code: "mx", name: "Mexico" },
  { code: "ma", name: "Morocco" },
  { code: "nl", name: "Netherlands" },
  { code: "ng", name: "Nigeria" },
  { code: "gb-nir", name: "Northern Ireland" },
  { code: "no", name: "Norway" },
  { code: "pa", name: "Panama" },
  { code: "py", name: "Paraguay" },
  { code: "pe", name: "Peru" },
  { code: "pl", name: "Poland" },
  { code: "pt", name: "Portugal" },
  { code: "ie", name: "Republic of Ireland" },
  { code: "sa", name: "Saudi Arabia" },
  { code: "gb-sct", name: "Scotland" },
  { code: "sn", name: "Senegal" },
  { code: "rs", name: "Serbia" },
  { code: "za", name: "South Africa" },
  { code: "es", name: "Spain" },
  { code: "se", name: "Sweden" },
  { code: "ch", name: "Switzerland" },
  { code: "tn", name: "Tunisia" },
  { code: "tr", name: "Turkey" },
  { code: "us", name: "USA" },
  { code: "uy", name: "Uruguay" },
  { code: "gb-wls", name: "Wales" },
];

/**
 * Turns an ISO 3166-1 alpha-2 code into a flag emoji. Handles the special
 * "gb-eng"/"gb-sct"/"gb-wls" home-nation codes via their subdivision flags,
 * with a Union Jack fallback for platforms that don't render them.
 */
export function flagEmoji(code: string): string {
  const c = code.toLowerCase();
  const subdivision: Record<string, string> = {
    "gb-eng": "\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}",
    "gb-sct": "\u{1F3F4}\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}",
    "gb-wls": "\u{1F3F4}\u{E0067}\u{E0062}\u{E0077}\u{E006C}\u{E0073}\u{E007F}",
    "gb-nir": "\u{1F1EC}\u{1F1E7}",
  };
  if (subdivision[c]) return subdivision[c];
  if (c.length !== 2) return "\u{1F3F3}"; // white flag fallback
  const A = 0x1f1e6;
  const first = A + (c.charCodeAt(0) - 97);
  const second = A + (c.charCodeAt(1) - 97);
  return String.fromCodePoint(first) + String.fromCodePoint(second);
}

const byName = new Map(TEAMS.map((t) => [normalise(t.name), t]));

function normalise(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, " ");
}

/** Resolves a flag emoji for an arbitrary team name (e.g. from the API). */
export function flagForName(name: string): string {
  const team = byName.get(normalise(name));
  return team ? flagEmoji(team.code) : "\u{1F3F3}";
}
