import { type Metadata } from "next";
import HomeContent from "./_components/HomeContent";

export const metadata: Metadata = {
  title: "SilexBrand | Автоматизация на бизнеса в България — AI чатбот и CRM",
  description:
    "Спести над 15 часа на месец с AI автоматизация. Чатбот за бизнес, CRM интеграция, омниканални съобщения (Viber, Messenger, WhatsApp). Безплатна консултация за малкия бизнес в България.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return <HomeContent />;
}
