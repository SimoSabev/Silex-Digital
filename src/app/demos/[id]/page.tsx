import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import DemoContainer from "@/components/demos/DemoContainer";
import EmailAutomationDemo from "@/components/demos/EmailAutomationDemo";
import LeadQualificationDemo from "@/components/demos/LeadQualificationDemo";
import ChatbotDemo from "@/components/demos/ChatbotDemo";
import { MessageSquare, Zap } from "lucide-react";

const DEMOS = {
  "email-automation": {
    title:       "Omnichannel automation demo — Silex Digital",
    description: "See how Silex Digital automates omnichannel workflows: Viber, Messenger and WhatsApp orders flow directly into your ERP.",
    heading:     "Omnichannel automation",
    icon:        <MessageSquare className="h-6 w-6" />,
    component:   <EmailAutomationDemo />,
  },
  "lead-qualification": {
    title:       "AI lead qualification demo — Silex Digital",
    description: "Watch the AI score and prioritise your leads automatically, so your team focuses on the best opportunities.",
    heading:     "AI lead qualification",
    icon:        <Zap className="h-6 w-6" />,
    component:   <LeadQualificationDemo />,
  },
  chatbot: {
    title:       "AI chatbot demo — Silex Digital",
    description: "Try the virtual assistant that handles client inquiries 24/7 with instant, intelligent replies.",
    heading:     "AI chatbot",
    icon:        <MessageSquare className="h-6 w-6" />,
    component:   <ChatbotDemo />,
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
  if (!demo) notFound();

  return (
    <main className="min-h-screen bg-[var(--bg-page)] pt-24 pb-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
              Interactive Demo · Silex Digital
            </p>
            <h1 className="text-3xl font-bold text-[var(--text-main)] font-[family-name:var(--font-display)]">
              {demo.heading}
            </h1>
            <p className="text-[var(--text-sub)] mt-2">{demo.description}</p>
          </div>

          <DemoContainer
            demoId={id}
            title={demo.heading}
            description={demo.description}
            icon={demo.icon}
            ctaText="Book this exact setup"
            ctaLink={`/contact?source=demo-share&demo=${id}`}
          >
            {demo.component}
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
