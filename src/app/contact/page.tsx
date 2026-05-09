import { Suspense } from "react";
import ContactContent from "./ContactContent";

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-[var(--bg-page)]" />}>
      <ContactContent />
    </Suspense>
  );
}
