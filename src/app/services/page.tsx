import { type Metadata } from "next";
import ServicesContent from "./ServicesContent";
import { buildServicesSchema } from "./_components/servicesSchema";

const title = "Услуги: бранд, уебсайт, съдържание, реклама, SEO и AI";
const description =
  "Шест направления с ясни цени без ДДС: бранд идентичност, уебсайт, съдържание, реклама, SEO и AI асистент. Купувате поотделно или в пакет на по-ниска цена.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "бранд идентичност",
    "изработка на уебсайт",
    "лого дизайн",
    "SEO услуги",
    "Meta и Google реклама",
    "социални мрежи за бизнес",
    "AI чат асистент",
    "цени без ДДС",
    "SilexBrand",
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: `${title} | SilexBrand`,
    description,
  },
};

const servicesSchema = buildServicesSchema();

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(servicesSchema).replace(/</g, "\\u003c"),
        }}
      />
      <ServicesContent />
    </>
  );
}
