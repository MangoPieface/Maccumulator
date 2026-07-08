import type { Metadata, Viewport } from "next";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
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
      <head>
        {/* OneTrust Cookies Consent Notice — the same provider Macmillan uses */}
        <Script
          src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"
          type="text/javascript"
          charSet="UTF-8"
          data-domain-script="6d3073ec-cb15-435e-ae8e-6106662d0c47"
          strategy="beforeInteractive"
        />
        <Script id="onetrust-optanon-wrapper" strategy="beforeInteractive">
          {`function OptanonWrapper() { }`}
        </Script>
      </head>
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
          <div className="mac-footer-support">
            <div className="mac-footer-support-inner">
              <div>
                <h2>Talk to us</h2>
                <p>
                  Whatever you want to talk about, we&apos;re here to listen.
                  Call the Macmillan Support Line free, 7 days a week, 8am–8pm.
                </p>
              </div>
              <a className="mac-footer-phone" href="tel:08088080000">
                0808 808 00 00
              </a>
            </div>
          </div>

          <div className="mac-footer-main">
            <nav className="mac-footer-cols" aria-label="Footer">
              <div className="mac-footer-col">
                <h3>Cancer information</h3>
                <ul>
                  <li>
                    <a href="https://www.macmillan.org.uk/cancer-information-and-support">
                      Information &amp; support
                    </a>
                  </li>
                  <li>
                    <a href="https://www.macmillan.org.uk/cancer-information-and-support/treatment">
                      Treatments
                    </a>
                  </li>
                  <li>
                    <a href="https://www.macmillan.org.uk/cancer-types">
                      Cancer types
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mac-footer-col">
                <h3>Get involved</h3>
                <ul>
                  <li>
                    <a href="https://www.macmillan.org.uk/donate">Donate</a>
                  </li>
                  <li>
                    <a href="https://www.macmillan.org.uk/fundraise">Fundraise</a>
                  </li>
                  <li>
                    <a href="https://www.macmillan.org.uk/get-involved/volunteering">
                      Volunteer
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mac-footer-col">
                <h3>About us</h3>
                <ul>
                  <li>
                    <a href="https://www.macmillan.org.uk/about-us">
                      What we do
                    </a>
                  </li>
                  <li>
                    <a href="https://www.macmillan.org.uk/get-involved/campaigns">
                      Campaigns
                    </a>
                  </li>
                  <li>
                    <a href="https://jobs.macmillan.org.uk/">Jobs</a>
                  </li>
                </ul>
              </div>
              <div className="mac-footer-col">
                <h3>Contact us</h3>
                <ul>
                  <li>
                    <a href="https://www.macmillan.org.uk/about-us/contact-us">
                      Contact us
                    </a>
                  </li>
                  <li>
                    <a href="https://community.macmillan.org.uk/">
                      Online Community
                    </a>
                  </li>
                  <li>
                    <a href="https://www.macmillan.org.uk/about-us/policies/privacy-policy">
                      Privacy policy
                    </a>
                  </li>
                </ul>
              </div>
            </nav>

            <div className="mac-footer-social" aria-label="Macmillan on social media">
              <a href="https://www.facebook.com/macmillancancer" aria-label="Facebook">
                Facebook
              </a>
              <a href="https://x.com/macmillancancer" aria-label="X (Twitter)">
                X
              </a>
              <a href="https://www.instagram.com/macmillancancer/" aria-label="Instagram">
                Instagram
              </a>
              <a href="https://www.youtube.com/macmillancancer" aria-label="YouTube">
                YouTube
              </a>
            </div>

            <p className="mac-footer-legal">
              This is a Maccumulator MVP demo — a digital take on Macmillan&apos;s
              fundraising idea. Macmillan Cancer Support, registered charity in
              England and Wales (261017), Scotland (SC039907) and the Isle of Man
              (604). Also operating in Northern Ireland. A company limited by
              guarantee, registered in England and Wales company number 2400969.
              Isle of Man company number 4694F. Registered office: 89 Albert
              Embankment, London SE1 7UQ. VAT no: 668265007.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
