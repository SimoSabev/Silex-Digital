# SilexBrand — План за "истинско изживяване" (research-backed)

*Изготвено след directно ресърч (WebSearch) на текущите (2026) практики за scroll-driven / 3D / award-caliber сайтове — не предположения.*

---

## 1. Защо сегашният layout се усеща generic

Не е заради липса на икони или цветове — вече ги оправихме. Проблемът е структурен:

- **Motion е декоративен, не е разказвач.** Всичко fade-in-ва еднакво (`whileInView`, opacity+y). Няма нито един момент, в който scroll-ът *движи* историята напред.
- **Всяка секция е "карта с padding".** Hero, Pillars, Before/After, How-it-works, Services — всички използват едно и също rounded-card+border+shadow. Няма нито един "wow" момент, само последователност от еднакво тежки блокове.
- **Няма 3D, няма dept, няма signature визуален елемент**, който да е уникален за SilexBrand (логото ви буквално се "разпада на пиксели" — това е готов, брандиран визуален концепт, който в момента не се използва никъде на сайта освен като статично PNG в navbar-а).
- **Медията е нулева.** Няма истинска снимка, няма видео, няма 3D render — само emoji (вече заменени) и CSS градиенти.

Извод: "истинско изживяване" не значи "добави анимации навсякъде". Значи *един силен, брандиран момент* + 2-3 добре избрани scroll-choreography секции + истинска медия, докато останалото остава дисциплинирано.

---

## 2. Какво показва ресърчът (юли 2026)

| Въпрос | Извод от ресърч |
|---|---|
| Кой прави scroll animations в 2026? | Продукционен стек: **Lenis** (smooth scroll) + **GSAP ScrollTrigger** (pin/scrub/timeline) + **Three.js** за 3D сцени. Framer Motion остава за UI micro-interactions, но "не достига дълбочината" на ScrollTrigger за сложна scroll хореография. |
| GSAP vs Framer Motion — performance? | GSAP core ~67kb, с ScrollTrigger+extras може да стигне 150kb+. Framer Motion пълен пакет ~90kb, tree-shaken integration обичайно 40-60kb. И двете не са безплатни — изборът трябва да е съзнателен, не "добави и двете". |
| Three.js / React Three Fiber бюджет? | **Three.js core тежи ~600KB minified**, преди сцена, модели, текстури. Това е **4x над целия JS бюджет за landing page** (150KB, вашето собствено правило). WebGL hero в LCP slot-а може директно да съсипе Core Web Vitals. |
| Spline vs R3F? | Spline = no-code 3D editor с директен export за web + `@splinetool/react-spline` за React/Next — по-бързо за производство, по-леко за прост hero asset. R3F = пълен контрол, по-голяма инвестиция. За еднократен signature hero момент, **Spline е правилният избор**, не R3F. |
| Медия стратегия? | Пазарът се дели на 3: истинска фотография/видео (най-висок trust, нулева допълнителна инвестиция ако продуктът вече съществува), CGI/3D render (IKEA прави 75% от каталога си така — неразличимо от снимка, но $5-15k setup за custom 3D), AI-generated (бързо, но точно това създава "generic AI" усещането, ако се използва за stock-photo хора/офиси). |
| CWV импакт върху бизнеса? | Сайтове, които минават Core Web Vitals, виждат **15-30% ръст в conversion**. За SMB lead-gen сайт като вашия, това не е естетика — това е приход. |

**Извод с едно изречение:** пълен Three.js/R3F сайт е грешен избор за вас (бюджет, аудитория предимно мобилна per предишния ни аудит) — правилната формула е **CSS 3D + Framer Motion (вече имате) + Lenis (леко) + GSAP ScrollTrigger само за 1-2 choreographed секции + ЕДНА Spline 3D сцена, lazy-loaded, само в hero-то**.

---

## 3. Препоръчан tech stack (層ove tiers — не "добави всичко")

### Tier 0 — вече имате, просто използвайте по-добре
- Framer Motion `whileInView`, `useScroll`, `useTransform` — достатъчни за parallax, scroll-progress bars, sticky reveals.
- CSS `perspective` + `rotateX/rotateY` — истинско 3D tilt на hover, **нулев JS разход**.

### Tier 1 — добавете (лека инвестиция, голяма визуална промяна)
- **`lenis`** (~+3-5kb gzip) — smooth/inertia scroll усещане на целия сайт. Единствената global промяна, която прави *всичко* да се усеща по-premium без да пипате нито една секция.
- CSS `animation-timeline: view()` (native scroll-driven animations) за прости reveal ефекти — **нулев JS**, работи в Chrome/Edge, graceful fallback другаде.

### Tier 2 — добавете избирателно, само за 2 конкретни секции
- **GSAP + ScrollTrigger** (code-split, зареден само на homepage, не глобално) — за:
  1. **"Преди/След SilexBrand"** секцията — вместо статичен side-by-side, pin секцията и **scrub** между "before" и "after" състояние докато потребителят скролва (буквално "предизвикай" промяната със скрола).
  2. **"How it works"** — вместо click-to-select списък, pin секцията и оставете стъпките да се highlight-ват в синхрон със scroll progress (истински timeline, не decorative номериране — тук номерацията е оправдана, защото това Е реален процес).

### Tier 3 — ЕДИН signature 3D момент, не повече
- **Spline** сцена в hero-то: логото ви (S-иконата, която вече буквално се "разпада на пиксели") анимирано като истинска 3D сцена — pixels/blocks, които се сглобяват при зареждане и леко реагират на scroll/mouse. Lazy-loaded (`next/dynamic`, `ssr:false`), дефернато след LCP, **статичен PNG fallback за мобилни/reduced-motion/бавна връзка**.
- Причина да е точно логото: това не е generic "3D блоб" декорация — това буквално материализира съществуващия ви brand mark. Signature елемент, не decoration.

**Забранено за тази аудитория/бюджет:** пълноекранни WebGL scenes на всяка секция, particle systems навсякъде, custom cursor effects, video backgrounds без реален продуктов контент зад тях.

---

## 4. Секция по секция — конкретен план

| Секция | Сегашно състояние | Нов "момент" |
|---|---|---|
| **Hero** | Статичен headline + live-inbox widget (добър, запазете го) | Добавете Spline 3D "разпадащо се лого" зад/до headline-а. Kinetic text reveal на headline (буквите леко се сглобяват от пиксели при load — echo на логото). |
| **Silex Pact** | Rounded card, статичен | Слейте с Two Pillars (вече отбелязано в предишния одит като redundant) — икономисва скрол дължина. |
| **Преди / След SilexBrand** | Два статични списъка един до друг | **GSAP scrub**: pin секцията, "before" избледнява / "after" се появява пропорционално на scroll progress. Добавете реален before/after screenshot на клиентски сайт (истинска медия, не CSS). |
| **How it works** | Click-to-select списък (вече с lucide икони) | **GSAP pin + scrub timeline** — стъпките се activate-ват в синхрон със скрола, не с click. Прогрес линията "тече" вертикално с реален scroll progress, не CSS transition на interval. |
| **Services grid** | 4 карти, еднакъв shadow | CSS 3D tilt on hover (`perspective` + `rotateX/Y` следвайки mouse position) — евтино, усеща се premium. |
| **Live demo / ROI calculator** | Вече редизайнати тази сесия | Запазете както са — интерактивността тук вече Е "истинското изживяване", не му трябва допълнителен 3D слой. |
| **Testimonials** | Вече редизайнати (cut-corner, metric badge) | Добавете лек parallax depth (карти се движат с различна скорост при скрол) — леко, евтино, Framer Motion `useTransform`. |
| **Final CTA** | Статичен gradient блок | Full-bleed kinetic type reveal при влизане във viewport — думите се "сглобяват" буква по буква, реusing същия pixel-dissolve мотив от логото за визуална консистентност. |

---

## 5. Медия asset стратегия (конкретно, не generic stock)

**Приоритет 1 — нулева допълнителна инвестиция, максимален trust:**
- Screen-recordings / GIFs на реалните демота, които вече сте построили (`EmailAutomationDemo`, `ChatbotDemo`, `LeadQualificationDemo`) — реален продукт, не илюстрация.
- Ако имате достъп до реален клиентски сайт/dashboard screenshot — използвайте го в "Преди/След" секцията.

**Приоритет 2 — еднократна инвестиция, висок impact:**
- Един Spline hero asset (лого dissolve) — не изисква 3D scanning bюджет ($5-15k), защото е геометрична форма (вашето лого), не product photography.
- Ако бюджетът позволява: 1 кратко (10-15s) видео на истински собственик на бизнес/екип — автентичност > production value.

**Избягвайте:**
- Generic AI-generated "щастливи хора в офис" снимки — точно това създава "AI slop" усещането, което искате да избегнете.
- Stock 3D "blob" или particle decorations без връзка с бранда.

---

## 6. Фазиран roadmap

1. **Фаза 1 (ниска инвестиция, веднага):** `lenis` smooth scroll site-wide + CSS 3D tilt на services grid + сливане на Silex Pact/Pillars секциите. Нулев риск за performance.
2. **Фаза 2:** GSAP ScrollTrigger (code-split, само homepage) за "Преди/След" и "How it works" секциите. Тествайте LCP/CLS преди/след с Lighthouse.
3. **Фаза 3 (най-скъпа, най-голям impact):** Spline hero 3D asset, lazy-loaded, с fallback. Реални демо screen-recordings да заменят статичните placeholder-и.

**Guardrail през всички фази:** проверявайте bundle size след всяко добавяне (`next build` output), пазете landing page JS под ~150-200kb gzipped (може леко над оригиналния бюджет заради GSAP, но не 600kb+ заради пълен Three.js). `prefers-reduced-motion` fallback за всичко ново.

---

## Sources (от директния ресърч)
- [Scrollytelling Trends 2026 — Svilenković](https://svilenkovic.com/3d/scrollytelling-trends-2026)
- [GSAP vs Framer Motion in 2026: An Honest Verdict](https://www.hontran.dev/blog/gsap-vs-framer-motion)
- [GSAP vs Framer Motion vs React Spring — Good Fella Lab](https://lab.good-fella.com/blog/gsap-vs-framer-motion-vs-react-spring)
- [Simplifying 3D Integration in React: Spline vs. react-three-fiber](https://medium.com/@akbar123jason/simplifying-3d-integration-in-react-spline-vs-react-three-fiber-3f5e1a9e39d3)
- [Best 3D Websites of 2026 — MDX](https://mdx.so/blog/best-3d-websites-2026-examples)
- [Smooth Scrolling in Next.js with Lenis & GSAP (2026 Guide)](https://devdreaming.com/blogs/nextjs-smooth-scrolling-with-lenis-gsap)
- [CGI vs AI in 2026: Which Works Better for Marketing?](https://www.pixready.com/blog/cgi-vs-ai)
- [100 Three.js Tips That Actually Improve Performance (2026)](https://www.utsubo.com/blog/threejs-best-practices-100-tips)
- [2026 Web Design Trends Are a Core Web Vitals Problem](https://www.jacobtyler.com/blog/2026-web-design-trends-speed/)
