import "@/styles/globals.css";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";

import { type Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import { I18nProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Silex Digital | Business Automation in Bulgaria",
  description:
    "A modern automation platform that generates clients for Bulgarian businesses. Respond instantly, capture every lead, and grow automatically.",
  keywords: [
    "business automation",
    "client generation",
    "business automation Bulgaria",
    "automated response",
    "CRM Bulgaria",
    "online booking",
    "chatbot for business",
    "small business website",
    "modern website",
    "business automation Bulgaria",
  ],
  metadataBase: new URL("https://silex-digital.com"),
  alternates: {
    canonical: "/",
    languages: {
      "bg-BG": "/",
      "en-US": "/en",
    },
  },
  openGraph: {
    title: "Silex Digital | Business Automation",
    description:
      "Automation platform that turns every contact into a client. Three layers: Automation, CMS, Code.",
    type: "website",
    locale: "en_US",
    alternateLocale: ["en_US"],
    siteName: "Silex Digital",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Silex Digital - Business Automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Silex Digital | Business Automation",
    description:
      "Modern automation for Bulgarian businesses. Respond instantly and capture every client.",
    creator: "@silexdigital",
    site: "@silexdigital",
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
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bg" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-body flex min-h-dvh flex-col antialiased bg-[var(--bg-page)] text-[var(--text-main)]">
        <div className="bg-noise" aria-hidden="true" />
        <ThemeProvider>
          <I18nProvider>
            <Navbar />
            <main className="w-full grow">{children}</main>
            <Footer />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
