# ARCHITECTURE OVERVIEW
## Modern Business Automation Platform - Visual Structure

**Last Updated:** 2026-03-23
**For:** Bulgarian SMB Market

---

## SYSTEM ARCHITECTURE DIAGRAM

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     PLATFORM: UNIFIED AUTOMATION SOLUTION                   │
└─────────────────────────────────────────────────────────────────────────────┘

                    ┌────────────────────────────────────┐
                    │   CUSTOMER ENTRY POINTS             │
                    │                                    │
                    │ ├─ Has Website/App?               │
                    │ │  └─ Use AUTOMATION LAYER        │
                    │ ├─ Needs Modern Website?          │
                    │ │  └─ Use CMS LAYER               │
                    │ └─ Needs Custom Solution?         │
                    │    └─ Use CODE LAYER              │
                    └────────────────────────────────────┘
                                    │
                ┌───────────────────┴───────────────────┐
                │                                       │
         ┌──────▼──────┐                        ┌──────▼──────┐
         │ Automation  │◄──────────────────────►│   Dashboard │
         │    Layer    │      (Real-time)       │   (Owner)   │
         │             │                        │             │
         │ ✓ Capture   │                        │ ✓ See leads │
         │ ✓ Respond   │                        │ ✓ Act fast  │
         │ ✓ Schedule  │                        │ ✓ Analytics │
         │ ✓ Follow-up │                        │             │
         └──────┬──────┘                        └─────────────┘
                │
    ┌───────────┴──────────────┬──────────────────────┐
    │                          │                      │
┌───▼────────┐         ┌──────▼────────┐      ┌─────▼──────┐
│   CMS      │         │  CODE LAYER   │      │ Automation │
│   LAYER    │         │               │      │   Only     │
│            │         │ ✓ Next.js     │      │            │
│ ✓ Website  │         │ ✓ Custom API  │      │ For        │
│   Builder  │         │ ✓ Webhooks    │      │ existing   │
│ ✓ Templates│         │ ✓ Integrations│      │ websites   │
│ ✓ Hosting  │         │               │      │            │
│ ✓ Auto +   │         │ For custom    │      │ + Adds     │
│   (built-in)│        │ solutions     │      │  super     │
└────────────┘         └───────────────┘      │  powers    │
                                              └────────────┘
```

---

## THREE-LAYER MODEL DETAILED

### LAYER 1: AUTOMATION CORE (Required Foundation)

```
                    AUTOMATION LAYER
                    (The Engine)
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
   ┌────▼────┐      ┌────▼────┐      ┌────▼────┐
   │ CAPTURE │      │ RESPOND │      │ QUALIFY │
   │         │      │         │      │         │
   │ • Chat  │      │ • Auto  │      │ • Score │
   │ • Email │      │  Reply  │      │ • Type  │
   │ • SMS   │      │ • Route │      │ • Tag   │
   │ • Call  │      │ • CRM   │      │ • Segment
   │ • Web   │      │         │      │         │
   └────┬────┘      └────┬────┘      └────┬────┘
        │                │                │
        └────────────────┼────────────────┘
                         │
            ┌────────────┼────────────┐
            │            │            │
       ┌────▼────┐  ┌────▼────┐ ┌────▼────┐
       │ SCHEDULE│  │ FOLLOW-UP│ │VISIBILITY
       │         │  │         │ │         │
       │ • Book  │  │ • Auto  │ │ • React │
       │ • Remind│  │  Emails │ │  Real   │
       │ • Confirm  │ • SMS   │ │ • Mobile│
       │         │  │ • Chat  │ │ • Quick │
       └─────────┘  └─────────┘ │  Action │
                                └────────┘
```

**Integration Points:**
- Works with ANY website/app via embed code
- Webhooks to third-party services
- Zapier/Make compatibility
- Direct API access (for developers)

---

### LAYER 2: CREATION - CMS (Modern Website)

```
         CMS LAYER (Website Builder)
                    │
    ┌───────────────┼───────────────┐
    │               │               │
┌───▼──────┐  ┌────▼─────┐  ┌─────▼────┐
│  Builder  │  │ Templates │  │ Content   │
│           │  │           │  │  Manager  │
│ • Drag    │  │ • Business│  │           │
│   Drop    │  │ • Service │  │ • Pages   │
│ • Components  │ • Portfolio │  │ • Blog    │
│           │  │ • Ecom    │  │ • Media   │
└───┬──────┘  └────┬─────┘  └─────┬────┘
    │               │              │
    └───────────────┼──────────────┘
                    │
          ┌─────────┴────────┐
          │                  │
      ┌───▼────┐         ┌───▼────┐
      │Hosting │         │Automation
      │& Deploy│         │(Built-in)
      │        │         │          │
      │• CDN   │         │ Full layer
      │• SSL   │         │ included
      │• Backup│         │         │
      │        │         │         │
      └────────┘         └────────┘
```

**Pre-built For:**
- Salons & Beauty (30 templates)
- Services & Trades (25 templates)
- B2B Services (20 templates)
- Retail & Ecommerce (15 templates)
- Professional Services (20 templates)

---

### LAYER 3: CREATION - CODE (Custom Development)

```
          CODE LAYER (Developer Platform)
                      │
      ┌───────────────┼───────────────┐
      │               │               │
  ┌───▼──────┐  ┌────▼─────┐  ┌─────▼────┐
  │  Stack   │  │   API     │  │ Deployment
  │          │  │           │  │           │
  │ • Next.js│  │ • REST    │  │ • Vercel  │
  │ • React  │  │ • GraphQL │  │ • AWS     │
  │ • Node   │  │ • Webhooks│  │ • Docker  │
  │ • TS     │  │ • SDKs    │  │           │
  └───┬──────┘  └────┬─────┘  └─────┬────┘
      │               │             │
      └───────────────┼─────────────┘
                      │
        ┌─────────────┴──────────────┐
        │                            │
    ┌───▼────┐               ┌──────▼────┐
    │Database │               │Automation │
    │        │               │  Layer API │
    │• Postgres  │               │ (Full)   │
    │• Redis  │               │          │
    │• Storage  │               │ Direct   │
    │        │               │  access   │
    └────────┘               │          │
                             └──────────┘
```

**For:**
- Custom applications
- SaaS platforms
- Complex workflows
- High-scale systems
- Team projects

---

## DATA FLOW DIAGRAM

```
CLIENT INTERACTION
      │
      ▼
┌─────────────────────────────────┐
│  RECEIVE (Any Channel)          │
│  ├─ Chat message                │
│  ├─ Email                        │
│  ├─ SMS / WhatsApp             │
│  ├─ Phone call                  │
│  └─ Web form                    │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│  PROCESS (Automation Layer)     │
│  ├─ Parse intent                │
│  ├─ Detect language (Bulgarian) │
│  ├─ Qualify lead                │
│  ├─ Extract info                │
│  └─ Route appropriately         │
└────────────┬────────────────────┘
             │
      ┌──────┴──────┐
      │             │
      ▼             ▼
   RESPOND      SCHEDULE
   ├─ Auto      ├─ Booking
   │ reply      │ system
   ├─ CRM       ├─ Calendar
   │ update     │ integration
   └─ Send      └─ Reminders
      ↓             ↓
      └──────┬──────┘
             │
             ▼
┌─────────────────────────────────┐
│  STORE (Database)               │
│  ├─ Lead record                 │
│  ├─ Conversation history        │
│  ├─ Appointment info            │
│  ├─ Customer profile            │
│  └─ Revenue tracking            │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│  NOTIFY (Owner/Dashboard)       │
│  ├─ Email notification          │
│  ├─ SMS alert                   │
│  ├─ In-app alert                │
│  ├─ Dashboard update            │
│  └─ Quick action buttons        │
└────────────┬────────────────────┘
             │
             ▼
        OWNER ACTION
        (Respond if needed,
         system handles rest)
```

---

## CUSTOMER JOURNEY PATHS

### PATH A: "I have a website/app"
```
Step 1: Land on platform
        ↓
Step 2: See AUTOMATION LAYER demo
        ↓
Step 3: Copy embed code (2 minutes)
        ↓
Step 4: Add to website
        ↓
Step 5: First client interaction automated
        ↓
RESULT: Instant upgrade to existing platform
```

---

### PATH B: "I need a modern website"
```
Step 1: Land on platform
        ↓
Step 2: See CMS LAYER demo
        ↓
Step 3: Choose template (1 minute)
        ↓
Step 4: Customize with builder (30 minutes)
        ↓
Step 5: Publish (1 click)
        ↓
Step 6: Full automation active immediately
        ↓
RESULT: Professional site + complete automation
```

---

### PATH C: "I need something custom"
```
Step 1: Land on platform
        ↓
Step 2: See CODE LAYER demo
        ↓
Step 3: Book consultation
        ↓
Step 4: Development team builds (2-4 weeks)
        ↓
Step 5: Full API access from day 1
        ↓
Step 6: Automation layer powering all interactions
        ↓
RESULT: Custom solution with enterprise-grade automation
```

---

## TECHNOLOGY STACK OVERVIEW

### Frontend
```
Landing Page & Demos:
├─ Next.js 14+ (React)
├─ Three.js (Animated visualizations)
├─ Tailwind CSS (Styling)
├─ Framer Motion (Smooth animations)
└─ TypeScript (Type safety)

CMS Builder:
├─ Next.js (Framework)
├─ Drag-and-drop builder library
├─ Real-time preview
├─ Mobile responsive

Dashboard:
├─ React + Next.js
├─ Real-time updates (WebSocket)
├─ Mobile-first design
├─ Fast interactions
```

### Backend
```
Automation Layer:
├─ Node.js (Runtime)
├─ Express/Fastify (API)
├─ PostgreSQL (Relational data)
├─ Redis (Caching & sessions)
├─ Queue system (Bull/RabbitMQ)
└─ AI/NLP (Intent detection)

Integration Layer:
├─ Webhook system
├─ Third-party APIs
├─ Zapier integration
├─ Calendar sync (Google, Outlook)
└─ SMS/Email providers (Twilio, SendGrid)
```

### Infrastructure
```
Hosting & Deployment:
├─ Vercel (Frontend, serverless)
├─ AWS (Backend, managed services)
├─ CloudFlare (CDN, security)
├─ Docker (Containerization)
├─ GitHub Actions (CI/CD)
└─ Sentry (Monitoring)

Performance:
├─ Page load: <1 second
├─ API response: <200ms
├─ Message processing: <500ms
├─ 99.9% uptime SLA
```

---

## INTEGRATION ECOSYSTEM

```
                    AUTOMATION LAYER
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
    ┌───▼────┐       ┌───▼────┐       ┌──▼──────┐
    │Calendar │       │Payment  │       │ SMS/Email
    │Systems  │       │Systems  │       │         │
    │         │       │         │       │ • Twilio│
    │ • Google│       │ • Stripe│       │ • SendGrid
    │ • Outlook  │       │ • PayPal│       │         │
    │ • Local │       │ • Square│       └────┬────┘
    │         │       │         │            │
    └────┬────┘       └───┬────┘            │
         │                │                 │
         └────────────────┼────────┬────────┘
                          │        │
                      ┌───▼────┐  │
                      │ Zapier  │◄─┘
                      │ (100+   │
                      │services)
                      └────────┘
```

---

## DEPLOYMENT ARCHITECTURE

```
┌─────────────────────────────────────────────────────┐
│           LOAD BALANCER (CloudFlare)                │
└─────────────────────────────────────────────────────┘
               │                    │
        ┌──────▼─────┐      ┌──────▼──────┐
        │ Vercel CDN │      │ AWS API     │
        │ (Frontend) │      │ (Backend)   │
        └──────┬─────┘      └──────┬──────┘
               │                   │
               │          ┌────────┴────────┐
               │          │                 │
               │      ┌───▼────┐       ┌───▼────┐
               │      │Database │       │ Cache  │
               │      │(PostgreSQL)     │(Redis) │
               │      └────────┘        └────────┘
               │
        ┌──────▼─────────────┐
        │ Message Queue      │
        │ (Async Processing) │
        │ (Bull/RabbitMQ)    │
        └────────────────────┘
```

---

## SECURITY LAYERS

```
┌─────────────────────────────────────┐
│        SECURITY ARCHITECTURE        │
├─────────────────────────────────────┤
│ 1. Network                          │
│    ├─ CloudFlare DDoS protection   │
│    ├─ WAF (Web Application Firewall)
│    └─ Rate limiting                 │
├─────────────────────────────────────┤
│ 2. Authentication                   │
│    ├─ JWT tokens                    │
│    ├─ OAuth 2.0 integrations       │
│    └─ Session management            │
├─────────────────────────────────────┤
│ 3. Data Protection                  │
│    ├─ End-to-end encryption        │
│    ├─ HTTPS/TLS everywhere         │
│    ├─ Database encryption at rest  │
│    └─ PCI compliance (payments)    │
├─────────────────────────────────────┤
│ 4. Compliance                       │
│    ├─ GDPR (data rights)            │
│    ├─ Local regulations             │
│    ├─ Audit logging                 │
│    └─ Data retention policies       │
└─────────────────────────────────────┘
```

---

## SCALABILITY STRATEGY

```
TRAFFIC INCREASES
         │
    ┌────▼─────┐
    │ Auto CDN │ ← Handles static files
    └──────────┘
         │
    ┌────▼─────────────┐
    │ Load Balancer    │ ← Distributes requests
    └──────────────────┘
         │
    ┌────┴────────────────────────┐
    │                             │
┌───▼────┐  ┌───────┐  ┌────────┐│
│ API 1  │  │ API 2 │  │ API 3  ││ Auto-scaling
└────────┘  └───────┘  └────────┘│ (Kubernetes)
    │           │          │      │
    └───────────┼──────────┴──────┘
                │
         ┌──────▼─────┐
         │ Database   │ ← Read replicas
         │ (Main)     │
         └────────────┘
```

---

**This architecture supports:**
- ✅ Businesses with existing platforms (Automation only)
- ✅ Startups needing modern sites (CMS + Automation)
- ✅ Companies needing custom solutions (Code + Automation)
- ✅ Bulgarian market specifics (Language, payments, culture)
- ✅ Fast growth (Auto-scaling infrastructure)
- ✅ User trust (Security, compliance, reliability)

**Next Steps:** Implement Phase 1 (Landing + Core Automation)
