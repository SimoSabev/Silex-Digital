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
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
} from "@/config/seo";

const golosText = Golos_Text({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
  display: "swap",
});

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SilexBrand | Сайт, Google и Viber за местния бизнес",
    template: "%s | SilexBrand",
  },
  description:
    "Не губете клиенти, защото отговаряте късно. Viber помощник и сайт, изградени за вашия бизнес — знае цените ви, записва час и отговаря денем и нощем. Безплатна консултация.",
  keywords: [
    "автоматизация на бизнеса",
    "бизнес автоматизация България",
    "AI чатбот за бизнес",
    "Viber бот за бизнес",
    "уеб сайт за малкия бизнес",
    "автоматизация на процеси",
    "дигитализация на бизнес",
    "омниканална автоматизация",
    "автоматизация маркетинг",
    "уеб разработка България",
    "чатбот за бизнес",
    "интеграция Viber Messenger WhatsApp",
    "генериране на лийдове",
    "бизнес автоматизация София",
    "бизнес автоматизация Варна",
    "business automation Bulgaria",
    "AI chatbot Bulgaria",
    "web development Bulgaria",
    "Viber chatbot Bulgaria",
    "automation agency Bulgaria",
  ],
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
    title: "SilexBrand | Не губете клиенти заради бавен отговор",
    description:
      "Viber помощник и сайт за местния бизнес — записва час, знае цените ви, отговаря денем и нощем. Изграден специално за вас.",
    type: "website",
    locale: "bg_BG",
    alternateLocale: ["en_US"],
    siteName: "SilexBrand",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "SilexBrand — Сайт и Viber помощник за местния бизнес в България",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SilexBrand | Не губете клиенти заради бавен отговор",
    description:
      "Viber помощник и сайт за местния бизнес — записва час и отговаря 24/7. Безплатна консултация.",
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
        {[organizationSchema, localBusinessSchema, websiteSchema].map((schema) => (
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
