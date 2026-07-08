import type { Metadata, Viewport } from "next";
import Link from "next/link";
import Image from "next/image";
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
          <Link href="/" className="mac-logo" aria-label="Macmillan Cancer Support">
            <Image
              src="/macmillan_white.png"
              alt="Macmillan Cancer Support"
              width={165}
              height={38}
              priority
            />
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
