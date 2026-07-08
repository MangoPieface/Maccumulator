import Image from "next/image";

type FlagProps = {
  /** flagcdn code, e.g. "fr", "gb-eng". */
  code: string;
  name: string;
  size?: number;
};

/**
 * Renders a country flag as an image (flagcdn) so it looks identical on every
 * platform — unlike emoji flags, which don't render on Windows.
 *
 * We always request a fixed, valid flagcdn resolution (w160) and scale it down
 * via width/height, because flagcdn only serves specific sizes.
 */
export function Flag({ code, name, size = 20 }: FlagProps) {
  const height = size;
  const width = Math.round(size * 1.5);
  return (
    <Image
      className="mac-flag"
      src={`https://flagcdn.com/w160/${code}.png`}
      alt={`${name} flag`}
      width={width}
      height={height}
      unoptimized
    />
  );
}
