import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import DemoContainer from "@/components/demos/DemoContainer";
import EmailAutomationDemo from "@/components/demos/EmailAutomationDemo";
import LeadQualificationDemo from "@/components/demos/LeadQualificationDemo";
import ChatbotDemo from "@/components/demos/ChatbotDemo";
import { MessageSquare, Zap, Bot } from "lucide-react";

const DEMOS = {
  "email-automation": {
    title:       "Omnichannel automation demo — SilexBrand",
    description: "See how SilexBrand automates omnichannel workflows: Viber, Messenger and WhatsApp orders flow directly into your ERP.",
    heading:     "Omnichannel automation",
    Icon:        MessageSquare,
    Component:   EmailAutomationDemo,
  },
  "lead-qualification": {
    title:       "AI lead qualification demo — SilexBrand",
    description: "Watch the AI score and prioritise your leads automatically, so your team focuses on the best opportunities.",
    heading:     "AI lead qualification",
    Icon:        Zap,
    Component:   LeadQualificationDemo,
  },
  chatbot: {
    title:       "AI chatbot demo — SilexBrand",
    description: "Try the virtual assistant that handles client inquiries 24/7 with instant, intelligent replies.",
    heading:     "AI chatbot",
    Icon:        Bot,
    Component:   ChatbotDemo,
  },
} as const;

type DemoId = keyof typeof DEMOS;

export function generateStaticParams() {
  return (Object.keys(DEMOS) as DemoId[]).map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const demo = DEMOS[id as DemoId];
  if (!demo) return {};
  return { title: demo.title, description: demo.description };
}

export default async function DemoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const demo = DEMOS[id as DemoId];
  if (!demo) return notFound();

  const { Icon, Component, heading, description } = demo;

  return (
    <main className="min-h-screen bg-[var(--bg-page)] pt-24 pb-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
              Interactive Demo · SilexBrand
            </p>
            <h1 className="text-3xl font-bold text-[var(--text-main)] font-[family-name:var(--font-display)]">
              {heading}
            </h1>
            <p className="text-[var(--text-sub)] mt-2">{description}</p>
          </div>

          <DemoContainer
            demoId={id}
            title={heading}
            description={description}
            icon={<Icon className="h-6 w-6" />}
            ctaText="Book this exact setup"
            ctaLink={`/contact?source=demo-share&demo=${id}`}
          >
            <Component />
          </DemoContainer>

          <div className="mt-10 text-center">
            <p className="text-sm text-[var(--text-sub)] mb-4">
              Want this running for your business?
            </p>
            <a
              href={`/contact?source=demo-share&demo=${id}`}
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--violet)] px-7 py-3 text-white font-bold hover:opacity-90 transition-opacity shadow-lg"
            >
              Get a free consultation →
            </a>
          </div>
        </div>
      </Container>
    </main>
  );
}
