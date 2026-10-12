import "@/styles/globals.css";
import { type Metadata } from "next";
import { Golos_Text, Unbounded, JetBrains_Mono } from "next/font/google";

import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import { I18nProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import PremiumHybridBackground from "@/components/ui/PremiumHybridBackground";
import {
  siteConfig,
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
  offerCatalogSchema,
} from "@/config/seo";

// Typography: see the type scale in src/styles/globals.css (@theme).
// Bulgarian only needs the base "cyrillic" subset (cyrillic-ext covers
// Abkhaz/Chuvash/etc. — not used). All three families are variable fonts on
// Google Fonts, so Golos and JetBrains Mono load the single variable file;
// Unbounded is pinned to the only weights the scale uses (700 h3/h4, 800
// display/h1/h2) so no faux-bold or stray weights ship.
const golosText = Golos_Text({
  subsets: ["latin", "cyrillic"],
  variable: "--font-golos",
  display: "swap",
});

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["700", "800"],
  variable: "--font-unbounded",
  display: "swap",
});

// Accent face (kickers, stats, demo UI) — not needed for first paint, so it
// is not preloaded and doesn't compete with the hero's display/body fonts.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: "%s | SilexBrand",
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  metadataBase: new URL("https://silexbrand.com"),
  // NOTE: no "en-US" alternate — locale switching today is client-side
  // (I18nProvider), not routed. Declaring a hreflang to a URL that doesn't
  // resolve (e.g. "/en") is worse than declaring none: it either gets
  // ignored or logged as a Search Console error. Add the alternate back
  // once real localized routes exist (see STRATEGY.md §2).
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    type: "website",
    locale: "bg_BG",
    alternateLocale: ["en_US"],
    siteName: "SilexBrand",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "SilexBrand — идентичност, уебсайт, съдържание, реклама, SEO и AI автоматизация",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: "@silexbrand",
    site: "@silexbrand",
  },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Google Search Console verification omitted on purpose: the previous
  // value was a literal placeholder string, which is worse than no tag at
  // all (it renders a meaningless meta tag and gives false confidence that
  // verification is set up). Add the real token here once the site is
  // verified in Search Console — see AUDIT.md C4.
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bg" className={`${golosText.variable} ${unbounded.variable} ${jetbrainsMono.variable}`}>
      <body className="font-body flex min-h-dvh flex-col antialiased bg-(--bg-page) text-(--text-main)">
        {[organizationSchema, localBusinessSchema, websiteSchema, offerCatalogSchema].map((schema) => (
          <script
            key={schema["@type"]}
            type="application/ld+json"
            // Schema objects are static, developer-authored config (src/config/seo.ts),
            // not user input — safe to serialize directly. Escaping "<" prevents the
            // JSON payload from accidentally closing the script tag early.
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
            }}
          />
        ))}
        <SmoothScroll>
          <PremiumHybridBackground />
          <ThemeProvider>
            <I18nProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Analytics />
              <SpeedInsights />
              <Footer />
            </I18nProvider>
          </ThemeProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
