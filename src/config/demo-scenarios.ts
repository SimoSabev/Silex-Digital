import type { DemoScenario, DemoType } from "@/types/demo";

const scenarios: DemoScenario[] = [
  {
    id: "service-leads",
    demoType: "emailAutomation",
    name: {
      bg: "Услуги: нови запитвания",
      en: "Services: new inquiries",
    },
    description: {
      bg: "Форма от сайта активира екипно известие и последващ имейл.",
      en: "Website form triggers team alert and follow-up email.",
    },
    defaults: {
      trigger: "form",
      actions: ["email", "slack"],
    },
  },
  {
    id: "ecommerce-support",
    demoType: "emailAutomation",
    name: {
      bg: "Ecommerce: клиентска поддръжка",
      en: "Ecommerce: customer support",
    },
    description: {
      bg: "Входящ имейл създава CRM запис и изпраща SMS за бърз контакт.",
      en: "Incoming email creates a CRM record and sends SMS for fast follow-up.",
    },
    defaults: {
      trigger: "email",
      actions: ["crm", "sms"],
    },
  },
  {
    id: "api-ops",
    demoType: "emailAutomation",
    name: {
      bg: "Операции: API събития",
      en: "Operations: API events",
    },
    description: {
      bg: "Webhook пуска вътрешни известия и автоматичен отговор.",
      en: "Webhook starts internal alerts and automated response.",
    },
    defaults: {
      trigger: "api",
      actions: ["slack", "email", "crm"],
    },
  },
  {
    id: "agency-hot",
    demoType: "leadQualification",
    name: {
      bg: "Агенция: висок приоритет",
      en: "Agency: high priority",
    },
    description: {
      bg: "Пълен профил с ясен проектен интерес и готовност за контакт.",
      en: "Complete profile with clear project intent and contact readiness.",
    },
    defaults: {
      name: "Мария Николова",
      company: "Nova Studio",
      email: "maria@novastudio.bg",
      phone: "0888123456",
      message: "Търсим автоматизация за квалификация на запитвания и CRM sync.",
    },
  },
  {
    id: "smb-warm",
    demoType: "leadQualification",
    name: {
      bg: "SMB: среден потенциал",
      en: "SMB: medium potential",
    },
    description: {
      bg: "Коректни контактни данни, но ограничен контекст за нуждите.",
      en: "Valid contact details but limited context about needs.",
    },
    defaults: {
      name: "Ivan",
      company: "",
      email: "ivan.shop@gmail.com",
      phone: "0888456123",
      message: "Искам оферта.",
    },
  },
  {
    id: "cold-incomplete",
    demoType: "leadQualification",
    name: {
      bg: "Нисък потенциал: непълни данни",
      en: "Low potential: incomplete data",
    },
    description: {
      bg: "Липсват фирма и конкретно намерение.",
      en: "Missing company and specific intent.",
    },
    defaults: {
      name: "Al",
      company: "",
      email: "almail.com",
      phone: "0899",
      message: "Help",
    },
  },
];

export function getScenariosByDemoType(demoType: DemoType): DemoScenario[] {
  return scenarios.filter((scenario) => scenario.demoType === demoType);
}
