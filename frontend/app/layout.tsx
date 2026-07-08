import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Maccumulator | Macmillan Cancer Support",
  description:
    "Pick your donation amount for goals, cards, penalties and more. Track the match, then donate your total to Macmillan.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#008a26",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="mac-header">
          <Link href="/" className="mac-logo">
            <span className="mac-logo-badge" aria-hidden>
              &#9917;
            </span>
            Macmillan
          </Link>
          <span className="mac-tagline">The Maccumulator</span>
        </header>
        <main className="mac-main">{children}</main>
        <footer className="mac-footer">
          A digital Maccumulator MVP for Macmillan Cancer Support. Donations help
          support the almost 3.5 million people living with cancer in the UK.
        </footer>
      </body>
    </html>
  );
}
