# Animations & Hookable Demos Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Three.js hero particle animation, problem-section cycling scenarios, a how-it-works animated timeline, individual shareable demo pages at `/demos/[id]`, and a share-link button in every demo modal so clients can be sent directly to a demo.

**Architecture:** Lazy-loaded Three.js component for the hero (WebGL, `useEffect`/`useRef`, IntersectionObserver pause), CSS/Tailwind animations for the two smaller visualizations, Next.js dynamic route for shareable demo pages, and a clipboard copy button inside `DemoContainer`'s modal footer.

**Tech Stack:** Next.js 14, React 18, TypeScript, Three.js r160+, framer-motion (already installed), Tailwind CSS, `useI18n` (returns `{ locale }`).

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `src/components/animations/HeroVisualization.tsx` | Create | Three.js particle animation — client journey loop |
| `src/components/animations/ProblemVisualization.tsx` | Create | CSS cycling scenarios — missed message / call / visitor |
| `src/components/animations/HowItWorksVisualization.tsx` | Create | 6-step animated timeline |
| `src/app/demos/[id]/page.tsx` | Create | Shareable individual demo page |
| `src/components/demos/DemoContainer.tsx` | Modify | Add "Share" clipboard button in modal footer |
| `src/app/_components/HomeContent.tsx` | Modify | Wire all three visualizations into page sections |

---

## Task 1 — Install Three.js

**Files:** `package.json`

- [ ] **Step 1: Install**

```bash
npm install three @types/three
```

Expected: `added N packages` with no errors.

- [ ] **Step 2: Smoke-test**

```bash
node -e "const t = require('three'); console.log(t.REVISION)"
```

Expected: prints a revision number like `160`.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add three.js dependency"
```

---

## Task 2 — HeroVisualization (Three.js particle animation)

**Files:**
- Create: `src/components/animations/HeroVisualization.tsx`

The scene: 5 input nodes (chat, email, SMS, WhatsApp, form) arranged in a ring at radius 14. A central icosahedron. 3 output nodes at radius 12. 300 particles flow from an input node → center → an output node in an 8-second cycle. Pauses when the element is off-screen.

- [ ] **Step 1: Create the file**

```tsx
"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const INPUT_NODES = [
  { label: "Chat",      color: 0x4A90E2 },
  { label: "Email",     color: 0xF5A623 },
  { label: "SMS",       color: 0x50E3C2 },
  { label: "WhatsApp",  color: 0x7ED321 },
  { label: "Form",      color: 0xB8E986 },
];

const PARTICLE_COUNT = 280;

export default function HeroVisualization() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const w = mount.clientWidth;
    const h = mount.clientHeight;

    // ── Renderer ──────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // ── Scene / Camera ────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.set(0, 0, 25);

    // ── Lights ────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0x888888));
    const pl1 = new THREE.PointLight(0x4A90E2, 1.5);
    pl1.position.set(0, 0, 15);
    scene.add(pl1);
    const pl2 = new THREE.PointLight(0xF5A623, 1);
    pl2.position.set(15, 15, 5);
    scene.add(pl2);

    // ── Central node ──────────────────────────────────────────────────────
    const centerMesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.8, 1),
      new THREE.MeshPhongMaterial({
        color: 0x1a1a2e,
        emissive: 0x4A90E2,
        emissiveIntensity: 0.6,
        transparent: true,
        opacity: 0.92,
      }),
    );
    scene.add(centerMesh);

    // ── Input nodes ───────────────────────────────────────────────────────
    const INPUT_RADIUS = 13;
    const inputMeshes = INPUT_NODES.map((node, i) => {
      const angle = (i / INPUT_NODES.length) * Math.PI * 2 - Math.PI / 2;
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(1.1, 16, 16),
        new THREE.MeshPhongMaterial({
          color: node.color,
          emissive: node.color,
          emissiveIntensity: 0.4,
        }),
      );
      mesh.position.set(
        Math.cos(angle) * INPUT_RADIUS,
        Math.sin(angle) * INPUT_RADIUS,
        0,
      );
      scene.add(mesh);
      return mesh;
    });

    // ── Output nodes ──────────────────────────────────────────────────────
    const OUTPUT_COLOR = 0x2BAB66;
    const OUTPUT_RADIUS = 11;
    const outputMeshes = [0, 1, 2].map((i) => {
      const angle = (i / 3) * Math.PI * 2 + Math.PI / 6;
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.9, 16, 16),
        new THREE.MeshPhongMaterial({
          color: OUTPUT_COLOR,
          emissive: OUTPUT_COLOR,
          emissiveIntensity: 0.5,
        }),
      );
      mesh.position.set(
        Math.cos(angle) * OUTPUT_RADIUS,
        Math.sin(angle) * OUTPUT_RADIUS,
        1,
      );
      scene.add(mesh);
      return mesh;
    });

    // ── Particles ─────────────────────────────────────────────────────────
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors   = new Float32Array(PARTICLE_COUNT * 3);

    type PData = { t: number; speed: number; srcIdx: number; dstIdx: number };
    const pdata: PData[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      t:      Math.random(),
      speed:  0.003 + Math.random() * 0.002,
      srcIdx: Math.floor(Math.random() * INPUT_NODES.length),
      dstIdx: Math.floor(Math.random() * 3),
    }));

    pdata.forEach((pd, i) => {
      const c = new THREE.Color(INPUT_NODES[pd.srcIdx]!.color);
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    });

    const geo = new THREE.BufferGeometry();
    const posAttr   = new THREE.BufferAttribute(positions, 3);
    const colorAttr = new THREE.BufferAttribute(colors, 3);
    geo.setAttribute("position", posAttr);
    geo.setAttribute("color", colorAttr);

    const points = new THREE.Points(
      geo,
      new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.85 }),
    );
    scene.add(points);

    // ── Animation ─────────────────────────────────────────────────────────
    let animId: number;
    let paused = false;

    const tick = () => {
      animId = requestAnimationFrame(tick);
      if (paused) return;

      centerMesh.rotation.y += 0.004;
      centerMesh.rotation.x += 0.002;

      pdata.forEach((pd, i) => {
        pd.t += pd.speed;
        if (pd.t >= 1) {
          pd.t      = 0;
          pd.srcIdx = Math.floor(Math.random() * INPUT_NODES.length);
          pd.dstIdx = Math.floor(Math.random() * 3);
          const c = new THREE.Color(INPUT_NODES[pd.srcIdx]!.color);
          colorAttr.setXYZ(i, c.r, c.g, c.b);
        }

        const src = inputMeshes[pd.srcIdx]!.position;
        const dst = outputMeshes[pd.dstIdx]!.position;
        let x: number, y: number, z: number;

        if (pd.t < 0.5) {
          const lt = pd.t / 0.5;
          x = src.x * (1 - lt);
          y = src.y * (1 - lt);
          z = src.z * (1 - lt);
        } else {
          const lt = (pd.t - 0.5) / 0.5;
          x = dst.x * lt;
          y = dst.y * lt;
          z = dst.z * lt;
        }
        posAttr.setXYZ(i, x, y, z);
      });

      posAttr.needsUpdate   = true;
      colorAttr.needsUpdate = true;

      const pulse = 1 + Math.sin(Date.now() * 0.0025) * 0.04;
      centerMesh.scale.setScalar(pulse);

      renderer.render(scene, camera);
    };
    tick();

    // ── Pause when off-screen ─────────────────────────────────────────────
    const observer = new IntersectionObserver(
      ([entry]) => { paused = !entry?.isIntersecting; },
      { threshold: 0.1 },
    );
    observer.observe(mount);

    // ── Resize ────────────────────────────────────────────────────────────
    const onResize = () => {
      const nw = mount.clientWidth;
      const nh = mount.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" aria-hidden="true" />;
}
```

- [ ] **Step 2: Typecheck**

```bash
npx tsc --noEmit 2>&1 | head -30
```

Expected: no errors from `HeroVisualization.tsx`.

- [ ] **Step 3: Commit**

```bash
git add src/components/animations/HeroVisualization.tsx
git commit -m "feat: add Three.js hero particle visualization"
```

---

## Task 3 — ProblemVisualization (CSS cycling scenarios)

**Files:**
- Create: `src/components/animations/ProblemVisualization.tsx`

Three scenarios auto-cycle every 4.5 s. Steps fade in with staggered delays. Tab buttons let the user jump to any scenario.

- [ ] **Step 1: Create the file**

```tsx
"use client";

import { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n";

type Locale = "bg" | "en";

const SCENARIOS = [
  {
    id: "message",
    tab:   { bg: "Изпуснато съобщение", en: "Missed message" },
    steps: [
      { icon: "💬", delay: 0,    color: "slate",  label: { bg: 'Клиент: "Имате ли свободна дата?"', en: 'Client: "Do you have availability?"' } },
      { icon: "⏳", delay: 900,  color: "yellow", label: { bg: "1 час... 3 часа... 5 часа без отговор", en: "1 hour… 3 hours… 5 hours with no reply" } },
      { icon: "😤", delay: 1900, color: "red",    label: { bg: "Клиентът се обажда на конкурента", en: "Client calls your competitor" } },
      { icon: "🏆", delay: 2900, color: "red",    label: { bg: "Конкурентът спечелва клиента", en: "Competitor wins the client" } },
    ],
  },
  {
    id: "call",
    tab:   { bg: "Пропуснато обаждане", en: "Missed call" },
    steps: [
      { icon: "📞", delay: 0,    color: "slate",  label: { bg: "Телефонът звъни...", en: "Phone is ringing…" } },
      { icon: "🔕", delay: 900,  color: "yellow", label: { bg: "Пропуснато обаждане — пак и пак", en: "Missed call — again and again" } },
      { icon: "📱", delay: 1900, color: "red",    label: { bg: "Клиентът пише на конкурента", en: "Client messages a competitor" } },
      { icon: "💸", delay: 2900, color: "red",    label: { bg: "-1 клиент | -150 лв приход", en: "-1 client | -150 BGN revenue lost" } },
    ],
  },
  {
    id: "visitor",
    tab:   { bg: "Изгубени посетители", en: "Lost visitors" },
    steps: [
      { icon: "👥", delay: 0,    color: "slate",  label: { bg: "50 посетители идват на сайта", en: "50 visitors land on your site" } },
      { icon: "🚶", delay: 900,  color: "yellow", label: { bg: "46 напускат без никакво действие", en: "46 leave without taking action" } },
      { icon: "😔", delay: 1900, color: "red",    label: { bg: "92 % изчезват без лийд", en: "92 % vanish with no lead captured" } },
      { icon: "💰", delay: 2900, color: "red",    label: { bg: "Пропуснат приход: ~690 лв / ден", en: "Missed revenue: ~690 BGN / day" } },
    ],
  },
] as const;

const stepColor: Record<string, string> = {
  slate:  "text-[var(--text-main)]",
  yellow: "text-yellow-600 dark:text-yellow-400",
  red:    "text-red-600 dark:text-red-400",
};

export default function ProblemVisualization() {
  const { locale } = useI18n();
  const [activeIdx, setActiveIdx]       = useState(0);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);

  useEffect(() => {
    setVisibleSteps([]);
    const scenario = SCENARIOS[activeIdx]!;
    const timers = scenario.steps.map((step, i) =>
      setTimeout(() => setVisibleSteps((prev) => [...prev, i]), step.delay),
    );
    const cycleTimer = setTimeout(
      () => setActiveIdx((prev) => (prev + 1) % SCENARIOS.length),
      4600,
    );
    return () => { timers.forEach(clearTimeout); clearTimeout(cycleTimer); };
  }, [activeIdx]);

  const scenario = SCENARIOS[activeIdx]!;

  return (
    <div className="rounded-2xl border border-red-200 bg-red-50/60 dark:bg-red-950/20 dark:border-red-800/50 p-6 min-h-[200px]">
      {/* Tab row */}
      <div className="flex flex-wrap gap-2 mb-5">
        {SCENARIOS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setActiveIdx(i)}
            className={`text-xs px-3 py-1 rounded-full font-semibold transition-all ${
              i === activeIdx
                ? "bg-red-500 text-white shadow-sm"
                : "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-300 hover:bg-red-200"
            }`}
          >
            {s.tab[locale as Locale]}
          </button>
        ))}
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {scenario.steps.map((step, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 transition-all duration-500 ${
              visibleSteps.includes(i) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            <span className="text-xl leading-none">{step.icon}</span>
            <span className={`text-sm font-medium ${stepColor[step.color] ?? stepColor.slate}`}>
              {step.label[locale as Locale]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

```bash
npx tsc --noEmit 2>&1 | head -30
```

- [ ] **Step 3: Commit**

```bash
git add src/components/animations/ProblemVisualization.tsx
git commit -m "feat: add problem-section CSS scenario animations"
```

---

## Task 4 — HowItWorksVisualization (6-step animated timeline)

**Files:**
- Create: `src/components/animations/HowItWorksVisualization.tsx`

Auto-advances every 2 s. User can click any step to jump there.

- [ ] **Step 1: Create the file**

```tsx
"use client";

import { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n";

type Locale = "bg" | "en";

const STEPS = [
  { icon: "💬", color: "blue",   title: { bg: "Клиентът пише",           en: "Client reaches out"       }, detail: { bg: "Съобщение, обаждане, форма или WhatsApp", en: "Message, call, form or WhatsApp"              } },
  { icon: "⚡", color: "blue",   title: { bg: "Системата улавя",          en: "System captures it"       }, detail: { bg: "Автоматично разпознаване на намерение",  en: "Automatic intent recognition"                 } },
  { icon: "🤖", color: "green",  title: { bg: "Мигновен отговор",         en: "Instant reply"            }, detail: { bg: "Персонализиран AI отговор за секунди",   en: "Personalised AI reply in seconds"             } },
  { icon: "🎯", color: "green",  title: { bg: "Лийд квалифициран",        en: "Lead qualified"           }, detail: { bg: "Автоматично оценяване и категоризиране", en: "Automatic scoring and categorisation"         } },
  { icon: "🔔", color: "orange", title: { bg: "Получаваш нотификация",    en: "You get notified"         }, detail: { bg: "Dashboard + SMS + Email",                en: "Dashboard + SMS + Email"                      } },
  { icon: "💰", color: "green",  title: { bg: "Конверсия",                en: "Conversion"               }, detail: { bg: "Резервация потвърдена за 47 секунди",    en: "Booking confirmed in 47 seconds"              } },
] as const;

const ringColor: Record<string, string> = {
  blue:   "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
  green:  "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800",
  orange: "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800",
};

export default function HowItWorksVisualization() {
  const { locale } = useI18n();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % STEPS.length), 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="space-y-2">
      {STEPS.map((step, i) => (
        <button
          key={i}
          onClick={() => setActive(i)}
          className={`w-full flex items-start gap-4 p-3 rounded-xl border text-left transition-all duration-400 ${
            i === active
              ? (ringColor[step.color] ?? ringColor.blue)
              : "border-transparent opacity-40 hover:opacity-70"
          }`}
        >
          <span className="text-xl leading-none mt-0.5">{step.icon}</span>
          <div className="min-w-0">
            <p className="font-semibold text-sm leading-snug">{step.title[locale as Locale]}</p>
            {i === active && (
              <p className="text-xs mt-0.5 opacity-80 leading-snug">{step.detail[locale as Locale]}</p>
            )}
          </div>
          <span className="ml-auto text-xs font-bold opacity-50 shrink-0 mt-0.5">{i + 1}/6</span>
        </button>
      ))}
      <p className="text-center text-xs text-[var(--text-muted)] pt-2 font-medium">
        {locale === "bg" ? "Целият процес: 47 секунди" : "Full journey: 47 seconds"}
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

```bash
npx tsc --noEmit 2>&1 | head -30
```

- [ ] **Step 3: Commit**

```bash
git add src/components/animations/HowItWorksVisualization.tsx
git commit -m "feat: add how-it-works 6-step animated timeline"
```

---

## Task 5 — Shareable demo pages at `/demos/[id]`

**Files:**
- Create: `src/app/demos/[id]/page.tsx`

Each of the three active demos gets its own URL: `/demos/email-automation`, `/demos/lead-qualification`, `/demos/chatbot`. These are statically generated.

- [ ] **Step 1: Create the file**

```tsx
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
    sub:         "Live interactive simulation",
    icon:        <MessageSquare className="h-6 w-6" />,
    component:   <EmailAutomationDemo />,
    color:       "blue" as const,
  },
  "lead-qualification": {
    title:       "AI lead qualification demo — Silex Digital",
    description: "Watch the AI score and prioritise your leads automatically, so your team focuses on the best opportunities.",
    heading:     "AI lead qualification",
    sub:         "Live interactive simulation",
    icon:        <Zap className="h-6 w-6" />,
    component:   <LeadQualificationDemo />,
    color:       "green" as const,
  },
  chatbot: {
    title:       "AI chatbot demo — Silex Digital",
    description: "Try the virtual assistant that handles client inquiries 24/7 with instant, intelligent replies.",
    heading:     "AI chatbot",
    sub:         "Live interactive simulation",
    icon:        <MessageSquare className="h-6 w-6" />,
    component:   <ChatbotDemo />,
    color:       "purple" as const,
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
```

- [ ] **Step 2: Typecheck**

```bash
npx tsc --noEmit 2>&1 | head -30
```

Expected: no new errors.

- [ ] **Step 3: Verify routes exist**

```bash
npm run build 2>&1 | grep -E "demos|error" | head -20
```

Expected: `/demos/[id]` listed, no build errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/demos/[id]/page.tsx
git commit -m "feat: add shareable individual demo pages at /demos/[id]"
```

---

## Task 6 — Add Share button to DemoContainer modal

**Files:**
- Modify: `src/components/demos/DemoContainer.tsx`

Add a clipboard-copy "Share" button in the modal footer so you can send the shareable link directly to a client.

- [ ] **Step 1: Read the current file** (already done above — lines 1-199)

- [ ] **Step 2: Add `useState` import for `copied` state and `Share2` / `Check` icons**

The file already imports `{ useState, useEffect }` from React and `{ X, Maximize2, ArrowRight }` from lucide-react.

Replace the lucide-react import line:

Old:
```tsx
import { X, Maximize2, ArrowRight } from "lucide-react";
```

New:
```tsx
import { X, Maximize2, ArrowRight, Share2, Check } from "lucide-react";
```

- [ ] **Step 3: Add `copied` state inside the component**

After the existing `const [mounted, setMounted] = useState(false);` line, add:

```tsx
const [copied, setCopied] = useState(false);
```

- [ ] **Step 4: Add `handleShare` function after the `useEffect` hooks**

After the second `useEffect` (the overflow lock one, ending around line 56), add:

```tsx
const handleShare = async () => {
  const shareUrl = `${window.location.origin}/demos/${demoId ?? title.toLowerCase().replace(/\s+/g, "-")}`;
  await navigator.clipboard.writeText(shareUrl);
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
};
```

- [ ] **Step 5: Add the Share button to the modal footer**

In the modal footer `div` (around line 167), the current content is:

```tsx
<div className="flex justify-between items-center border-t border-[var(--border)] bg-[var(--bg-card)] p-6">
  <p className="text-sm text-[var(--text-muted)] hidden md:block">
     {locale === "bg" ? "Хареса ли ви резултатът?" : "Like what you see?"}
  </p>
  <div className="flex gap-4 w-full md:w-auto">
    <Button
      variant="ghost"
      onClick={() => setIsExpanded(false)}
      className="flex-1 md:flex-none"
    >
      {locale === "bg" ? "Затвори" : "Close"}
    </Button>
    <Button
      variant="primary"
      onClick={() => {
        void trackEvent("demo_cta_clicked", { ctaLink, placement: "modal" });
        window.location.href = ctaLink;
      }}
      className="flex-1 md:flex-none btn-primary hover:scale-[1.02] transition-transform shadow-xl hover:shadow-[var(--violet)]/30"
    >
      {locale === "bg" ? "Заяви това за своя бизнес" : "Request this for your business"} <ArrowRight className="h-4 w-4 ml-1" />
    </Button>
  </div>
</div>
```

Replace with:

```tsx
<div className="flex justify-between items-center border-t border-[var(--border)] bg-[var(--bg-card)] p-6">
  <p className="text-sm text-[var(--text-muted)] hidden md:block">
     {locale === "bg" ? "Хареса ли ви резултатът?" : "Like what you see?"}
  </p>
  <div className="flex gap-3 w-full md:w-auto">
    <Button
      variant="ghost"
      onClick={handleShare}
      className="flex-1 md:flex-none flex items-center gap-2"
      title={locale === "bg" ? "Копирай линк за споделяне" : "Copy share link"}
    >
      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Share2 className="h-4 w-4" />}
      {copied
        ? (locale === "bg" ? "Копирано!" : "Copied!")
        : (locale === "bg" ? "Сподели" : "Share")}
    </Button>
    <Button
      variant="ghost"
      onClick={() => setIsExpanded(false)}
      className="flex-1 md:flex-none"
    >
      {locale === "bg" ? "Затвори" : "Close"}
    </Button>
    <Button
      variant="primary"
      onClick={() => {
        void trackEvent("demo_cta_clicked", { ctaLink, placement: "modal" });
        window.location.href = ctaLink;
      }}
      className="flex-1 md:flex-none btn-primary hover:scale-[1.02] transition-transform shadow-xl hover:shadow-[var(--violet)]/30"
    >
      {locale === "bg" ? "Заяви за своя бизнес" : "Request for your business"} <ArrowRight className="h-4 w-4 ml-1" />
    </Button>
  </div>
</div>
```

- [ ] **Step 6: Typecheck**

```bash
npx tsc --noEmit 2>&1 | head -30
```

- [ ] **Step 7: Commit**

```bash
git add src/components/demos/DemoContainer.tsx
git commit -m "feat: add share-link button to demo modal footer"
```

---

## Task 7 — Wire animations into HomeContent

**Files:**
- Modify: `src/app/_components/HomeContent.tsx`

Three changes:
1. Hero: convert to 2-column layout (left = text/CTAs, right = HeroVisualization)
2. Problem section: add ProblemVisualization inside the "Before" card
3. Add HowItWorksVisualization as a new section after the before/after section

- [ ] **Step 1: Add `dynamic` imports at the top of the file**

After the existing import block (after line 29 `import Magnetic...`), add:

```tsx
import dynamic from "next/dynamic";

const HeroVisualization = dynamic(
  () => import("@/components/animations/HeroVisualization"),
  { ssr: false, loading: () => <div className="w-full h-full rounded-2xl bg-[var(--bg-section)] animate-pulse" /> },
);

const ProblemVisualization = dynamic(
  () => import("@/components/animations/ProblemVisualization"),
  { ssr: false },
);

const HowItWorksVisualization = dynamic(
  () => import("@/components/animations/HowItWorksVisualization"),
  { ssr: false },
);
```

- [ ] **Step 2: Convert hero to 2-column layout**

The hero section inner div is currently (lines 169-244):
```tsx
<div className="relative z-10 mx-auto max-w-5xl text-center">
```

Replace that opening div and its children through the stats grid with the following 2-column layout. The entire block to replace runs from line 169 to line 244 (the closing `</div>` before `</Container>`):

```tsx
<div className="relative z-10 mx-auto max-w-6xl">
  <div className="grid items-center gap-12 lg:grid-cols-2">
    {/* Left: text */}
    <div className="text-center lg:text-left">
      <AnimatedSection delay={0}>
        <div className="badge-violet mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 font-medium">
          <span className="animate-pulse-dot h-2 w-2 rounded-full bg-[var(--violet)]" />
          {locale === "bg"
            ? "Автоматизация за български бизнес"
            : "Automation for Bulgarian businesses"}
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <h1 className="mb-6 font-display text-[44px] leading-[1.1] font-[800] tracking-tight lg:text-[64px]">
          <span className="text-gradient-hero">
            <TextReveal
              text={locale === "bg" ? "РАБОТИ КАТО ИМАШ 10 ЕКСТРИ СЛУЖИТЕЛИ" : "WORK LIKE YOU HAVE 10 EXTRA EMPLOYEES"}
              delay={0.1}
            />
          </span>
        </h1>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <p className="mb-12 max-w-[560px] text-[18px] leading-relaxed text-[var(--text-sub)]">
          {locale === "bg"
            ? "Спести над 15 часа работа месечно с модерни автоматизации в сайта ти, така че бизнесът да работи за теб, дори когато си зает."
            : "Save over 15 hours of work per month with modern website automations, so your business keeps moving when you are busy."}
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.3}>
        <div className="mb-16 flex flex-wrap justify-center gap-4 lg:justify-start">
          <Link href="/contact">
            <Magnetic>
              <Button
                variant="primary"
                size="lg"
                className="h-auto rounded-xl border-none bg-[var(--coral)] px-8 py-4 text-lg font-bold text-white shadow-[var(--coral)]/20 shadow-xl transition-transform hover:-translate-y-1 hover:bg-[var(--coral-hover)]"
              >
                <Zap className="h-5 w-5" />
                {locale === "bg" ? "Започни безплатно" : "Start for free"}
              </Button>
            </Magnetic>
          </Link>
          <Link href="/demos">
            <Magnetic>
              <Button
                variant="secondary"
                size="lg"
                className="h-auto rounded-xl border-2 border-[var(--violet)] px-8 py-4 text-lg font-bold text-[var(--violet)] transition-colors hover:bg-[var(--violet)]/10"
              >
                <Play className="h-5 w-5" />
                {locale === "bg" ? "Виж демо" : "View demo"}
              </Button>
            </Magnetic>
          </Link>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.4}>
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.value}
              className="card flex flex-col items-center rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-4 text-center shadow-apple"
            >
              <div className="mb-2 font-['JetBrains_Mono',monospace] text-[36px] leading-none font-bold text-[var(--violet)]">
                {stat.value}
              </div>
              <div className="font-display text-[12px] font-bold tracking-wide text-[var(--text-sub)] uppercase">
                {stat.label[locale]}
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </div>

    {/* Right: Three.js visualization */}
    <AnimatedSection delay={0.2} direction="right" className="hidden lg:block">
      <div className="h-[480px] rounded-2xl overflow-hidden bg-[var(--bg-card)] border border-[var(--border)] shadow-apple-hover">
        <HeroVisualization />
      </div>
    </AnimatedSection>
  </div>
</div>
```

- [ ] **Step 3: Add ProblemVisualization inside the "Before" card**

In the before/after section (around lines 296-324), find the closing `</ul>` of the "Before" card and add right after it:

```tsx
<div className="mt-6">
  <ProblemVisualization />
</div>
```

- [ ] **Step 4: Add HowItWorks section after the before/after section**

After the closing `</section>` of the before/after section (around line 371), before the Services `<section>`, insert:

```tsx
{/* How It Works */}
<section className="bg-transparent py-[80px] lg:py-[100px]">
  <Container>
    <div className="mx-auto max-w-5xl grid items-start gap-16 lg:grid-cols-2">
      <AnimatedSection direction="left">
        <div className="badge-lime mb-6 inline-flex rounded-full border border-[var(--lime)]/20 bg-[var(--lime)]/10 px-3 py-1 text-sm font-bold tracking-wider text-[var(--lime)] uppercase">
          {locale === "bg" ? "Как работи" : "How it works"}
        </div>
        <h2 className="mb-6 font-display text-4xl font-[800] text-[var(--text-main)] leading-tight lg:text-5xl">
          {locale === "bg" ? "От съобщение до клиент" : "From message to client"}
          <br />
          <span className="text-gradient-hero">
            {locale === "bg" ? "за 47 секунди" : "in 47 seconds"}
          </span>
        </h2>
        <p className="text-[18px] leading-relaxed text-[var(--text-sub)]">
          {locale === "bg"
            ? "Платформата улавя всяко взаимодействие, отговаря мигновено и ти праща нотификация — ти трябва само да потвърдиш резервацията."
            : "The platform captures every interaction, replies instantly and sends you a notification — you just confirm the booking."}
        </p>
      </AnimatedSection>
      <AnimatedSection direction="right">
        <HowItWorksVisualization />
      </AnimatedSection>
    </div>
  </Container>
</section>
```

- [ ] **Step 5: Typecheck**

```bash
npx tsc --noEmit 2>&1 | head -40
```

Expected: no errors.

- [ ] **Step 6: Build check**

```bash
npm run build 2>&1 | tail -20
```

Expected: build succeeds.

- [ ] **Step 7: Commit**

```bash
git add src/app/_components/HomeContent.tsx
git commit -m "feat: wire hero visualization, problem scenarios and how-it-works into homepage"
```

---

## Self-Review

**Spec coverage:**
- ✅ Three.js hero particle animation — Task 2 + wired in Task 7
- ✅ Problem-section scenario animations — Task 3 + wired in Task 7
- ✅ How-it-works animated timeline — Task 4 + wired in Task 7
- ✅ Shareable individual demo pages — Task 5
- ✅ Share button in demo modal — Task 6
- ✅ Post-demo CTA (`/contact?source=demo-share&demo=…`) — Task 5 + existing DemoContainer footer

**Placeholder scan:** No TBD, no "implement later", no vague steps. Every step has exact file paths and complete code.

**Type consistency:**
- `useI18n()` returns `{ locale }` everywhere (matches existing codebase usage at `HomeContent.tsx:148`).
- `INPUT_NODES[pd.srcIdx]!` — non-null assertions used because array length is fixed and index is bounded.
- `DEMOS[id as DemoId]` — cast is safe because `notFound()` guards the undefined path.
- `DemoContainer` props match the existing interface (`demoId`, `title`, `description`, `icon`, `ctaText`, `ctaLink`, `children`).
