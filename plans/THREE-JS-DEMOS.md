# THREE.JS ANIMATION SPECIFICATIONS
## Interactive Demo Visualizations

**Last Updated:** 2026-03-23
**Purpose:** Guide for developing Three.js animated demos for landing page
**Target Audience:** Frontend developers

---

## OVERVIEW

The landing page will feature 5 major Three.js visualizations:

1. **Hero Visualization** - Client journey animation (continuous loop)
2. **Problem Section** - Pain point scenarios (dramatic, uncomfortable)
3. **Solution Section** - Same scenarios solved (satisfying)
4. **Demo Section (3 paths)** - Interactive pathway demos
5. **How It Works** - Unified flow animation

---

## 1. HERO VISUALIZATION - "Client Journey Loop"

### Scene Purpose
Show the complete customer journey flowing through the platform automatically

### Visual Elements
```
Center: Your Business (glowing node)
├─ Input nodes (animated around perimeter):
│  ├─ Chat bubble icon (light blue)
│  ├─ Phone icon (green)
│  ├─ Email icon (orange)
│  ├─ WhatsApp icon (teal)
│  └─ Form icon (purple)
├─ Processing center:
│  └─ Rotating automation node (glowing)
└─ Output: Conversions flowing out (satisfying effect)
```

### Animation Sequence
```
Duration: 8 seconds (infinite loop)

Frame 0-1s:
  Messages appear from input nodes
  Particles converge toward center
  Color: Respective channel color

Frame 1-2s:
  Particles enter center processing node
  Center node glows brighter
  Processing animation (rotating elements)
  Color: White/neutral

Frame 2-3s:
  Processed particles become "converted" form
  Animations for:
    - Appointment scheduled (calendar icon)
    - Lead captured (person icon)
    - Follow-up created (message icon)

Frame 3-4s:
  Exit animations flow outward
  Success effect (brief bright flash)
  Owner notification (bell icon)

Frame 4-8s:
  Particle system recycles
  Statistics update (numbers floating)
  Repeat loop
```

### Technical Specs
```javascript
// Configuration
{
  scene: {
    background: 0xfafafa,  // Light gray
    camera: {
      position: [0, 0, 25],
      fov: 50
    }
  },

  particles: {
    count: 300,
    speed: 0.5,  // Moderate, easy to follow
    size: 0.15,
    colorByChannel: {
      chat: 0x4A90E2,      // Blue
      email: 0xF5A623,      // Orange
      sms: 0x50E3C2,        // Teal
      whatsapp: 0x7ED321,   // Green
      form: 0xB8E986        // Light green
    }
  },

  nodes: {
    center: {
      geometry: "icosahedron",
      size: 3,
      emissionIntensity: 2,
      rotationSpeed: 0.005
    },
    input: {
      count: 5,
      radius: 18,
      geometry: "sphere",
      size: 1.5
    },
    output: {
      count: 3,
      radius: 15,
      geometry: "sphere",
      size: 1.2
    }
  },

  lighting: {
    ambientLight: 0x999999,
    pointLights: [
      { position: [0, 0, 15], color: 0x4A90E2, intensity: 1 },
      { position: [15, 15, 5], color: 0xF5A623, intensity: 0.8 }
    ]
  }
}
```

### Interaction
- **Hover over input node:** Highlights that channel, shows message count
- **Click input node:** Detailed animation showing just that channel's flow
- **Auto-play:** Restarts animation if idle for 5 seconds

### Statistics Shown
Real-time counters that update during animation:
- "Messages Processed: 2,543"
- "Leads Captured: 312"
- "Appointments Booked: 145"

---

## 2. PROBLEM SECTION - "Pain Point Scenarios"

### Scene 1: MISSED MESSAGE
**Duration:** 4 seconds

```
Visual Timeline:
├─ 0s: Client message appears (chat bubble)
│      Text: "Имам ли налична дата?"
│      Bubble animation: Fade in + slide
│
├─ 0.5s: Notification for owner appears
│         Color: Soft yellow (not urgent)
│         Position: Top right
│
├─ 1s: Owner busy indicator appears
│       Shows person icon doing other work
│       Time counter starts: 1 hour... 2 hours... 5 hours...
│
├─ 3s: Client gets bored
│       Message bubble changes color (red/frustrated)
│       Client typing: "OK, calling competitor"
│       Typing animation → message sends
│
└─ 4s: Opportunity lost
        Competitor logo appears
        Green checkmark on competitor
        Owner gets notification now (too late)
        Color fades to grayscale
```

**Emotional Design:**
- Slow progression (makes viewer uncomfortable)
- Time counter explicitly showing delay
- Color shift to red/sad
- Loss effect (competitor wins)

### Scene 2: MISSED CALL
**Duration:** 4 seconds

```
Visual Timeline:
├─ 0s: Phone ringing animation
│      Phone icon pulsing
│      Red glow expanding
│      Ring sound effect (optional)
│
├─ 0.5s: Owner doesn't answer
│         Missed call indicator appears
│         "1 missed call" counter
│
├─ 1.5s: Client tries again (second ring)
│         System shows: "Still missed"
│         Client gives up (phone icon fades)
│
├─ 2.5s: Client alternative action
│         Client sends message to competitor
│         Competitor responds immediately ✓
│         Competitor booking appears
│
└─ 4s: Lost client
        Competitor map pin appears
        Amount indicator: "-1 client" (red)
        Revenue impact shown (small number disappears)
```

**Emotional Design:**
- Urgency (ringing, pulsing)
- Repeated failure (rings multiple times)
- Immediate competitor success (contrast)
- Visible financial loss

### Scene 3: VISITOR WITHOUT CONVERSION
**Duration:** 4 seconds

```
Visual Timeline:
├─ 0s: Website visitors arriving
│      Particle flow into website (50 particles)
│      Each represents 1 visitor
│      Blue color, flowing left to right
│
├─ 1s: Visitor journey on website
│       Particles wandering across page
│       Some stop at contact form (green ones)
│       Most skip (red ones continuing)
│
├─ 2s: No action taken
│       Particles leave the website
│       Exit percentage shown: "92% left without action"
│       Remaining: "8% interested but no capture"
│
├─ 3s: Lost opportunities
│       Particles fade away
│       Revenue meter stays low
│       "Opportunity cost per day: 150 BGN"
│
└─ 4s: Waste visualization
        Money icons flying away
        "You're leaving money on table"
        Sad face appears
```

**Emotional Design:**
- Visual waste (particles leaving)
- Statistics emphasizing loss
- Financial impact explicit
- Makes business owner feel foolish

---

## 3. SOLUTION SECTION - "Transformation Animation"

### Split Screen Transformation (10 seconds)

```
BEFORE (Left Side) → AFTER (Right Side)

Split starts: 0-0.5s
├─ Left/Right divide line appears
├─ Before label on left
├─ After label on right

Same 3 Scenarios Play Simultaneously (0.5-8s)
├─ Message scenario (with automation)
├─ Call scenario (with automation)
├─ Visitor scenario (with automation)
│
├─ Differences:
│  ├─ Messages get instant responses
│  ├─ Calls trigger immediate SMS
│  ├─ Visitors captured in seconds
│  └─ Conversions happen immediately

All scenarios on RIGHT side:
├─ Show green checkmarks
├─ Instant reaction animations
├─ Positive sound effects (optional)
├─ Quick, satisfying timings
├─ Money counter INCREASES

Transition (8-9s):
├─ Left side fades to dark
├─ Right side expands to full width
├─ Celebration animation plays

Result (9-10s):
├─ Right side (now full) shows final metrics
├─ "92% → 8% Conversion"
├─ "Revenue: Increasing"
├─ "Leads: 312 this month"
└─ "Your business is now responsive"
```

**Key Differences (Visible in Animation):**
- **Time:** Instant responses vs. hours of waiting
- **Colors:** Green success vs. red failure
- **Revenue:** Growing numbers vs. stuck numbers
- **Owner:** Calm & in control vs. panicked

### Detailed Visualization
```
Message Scenario (Timeline 1-3s):
BEFORE: Message → 2 hour wait → Lost client
AFTER:  Message → 0.5s response → Booked appointment

Call Scenario (Timeline 3-5s):
BEFORE: Call → Missed → Competitor call → Lost
AFTER:  Call → SMS response → Calendar booking → Confirmed

Visitor Scenario (Timeline 5-7s):
BEFORE: 50 visitors → 46 leave → 4 inquire → 1 leads
AFTER:  50 visitors → 40 converted → 5 booked → Immediate revenue
```

---

## 4. DEMO SECTION - "Path Selection Animations"

### DEMO 1: "I Already Have Website/App"

#### Scene Setup
```
Initial State:
├─ Existing website mockup displayed (laptop/desktop)
├─ Shows typical SMB website
├─ Three buttons at bottom:
│  ├─ "Integrate Now"
│  ├─ "See How It Works"
│  └─ "Learn More"
```

#### Animation Sequence (7 seconds)
```
Phase 1 (0-1s): Widget Appears
├─ Chat widget icon appears in corner
├─ Smooth slide-in animation
├─ Icon pulses: "Integration active"

Phase 2 (1-2s): First Interaction
├─ Automated message arrives
├─ Widget highlights in green
├─ "First message received" notification

Phase 3 (2-3s): Processing
├─ Automation layer visualization appears
├─ Particle flow showing processing
├─ Intent detection highlights: "Booking request"

Phase 4 (3-4s): Response
├─ Automatic response appears in chat
├─ Friendly message with button
├─ Booking calendar opens

Phase 5 (4-5s): Capture
├─ Lead created visualization
├─ CRM icon shows: "Lead #5423 created"
├─ Data flowing into database

Phase 6 (5-6s): Owner Notified
├─ Dashboard notification bell rings
├─ Dashboard preview slides in
├─ Shows new lead with quick action buttons

Phase 7 (6-7s): Result
├─ "First client interaction automated ✓"
├─ Timeline shows: "0 to 7 seconds"
└─ "Your superpower: automated responses"
```

#### Interactive Elements
- **Click "See detailed flow":** Slow-motion replay with explanations
- **Hover on each phase:** Shows code snippet for developers
- **Click widget:** Opens live chat demo

---

### DEMO 2: "I Need Modern Website"

#### Scene Setup
```
Initial State:
├─ Blank canvas (represents no website)
├─ Template showcase carousel (3-4 visible)
├─ "Choose Template" button
```

#### Animation Sequence (12 seconds)

```
Phase 1 (0-1s): Template Selection
├─ User clicks template (service template)
├─ Template zooms to center
├─ All others fade

Phase 2 (1-3s): Website Building
├─ Construction animation
├─ Blocks appearing and arranging
├─ Header → Hero → Services → Testimonials → Contact
├─ Each section slides in smoothly
├─ Color: Blues and greens (progressive)

Phase 3 (3-4s): Content Population
├─ Text appearing (auto-filled sample content)
├─ Images appearing (sample portfolio)
├─ Icons appearing (service icons)

Phase 4 (4-5s): Customization
├─ Colors changing (to brand colors)
├─ Text editing in real-time
├─ Logo placement
├─ Button styling

Phase 5 (5-7s): Mobile Responsiveness
├─ Desktop view shrinking
├─ Mobile preview appearing
├─ Responsive layout animation
├─ "Looks perfect on all devices ✓"

Phase 6 (7-8s): Automation Integration
├─ Automation layer glowing beneath
├─ Features lighting up:
│  ├─ Chat widget (blue glow)
│  ├─ Contact form (green glow)
│  ├─ Booking calendar (orange glow)

Phase 7 (8-10s): Live Preview
├─ Website appears live
├─ Visitor simulation (person icon browsing)
├─ Chat interaction appearing
├─ Lead being captured

Phase 8 (10-12s): Launch
├─ "Publish" button highlights
├─ Website goes live (final transition)
├─ Domain appears at top
├─ "Ready for clients ✓"
└─ Timeline shows: "12 minutes to live"
```

#### Interactive Elements
- **Drag/drop customization** (if browser supports)
- **Click section:** Sees HTML/CSS behind it
- **Mobile toggle:** Switches to mobile view
- **Live demo:** Actually shows functioning website

---

### DEMO 3: "I Need Custom Solution"

#### Scene Setup
```
Initial State:
├─ Tech stack icons arranged (Next.js, Node, React, etc.)
├─ "Build Custom" button
├─ Developer-focused messaging
```

#### Animation Sequence (8 seconds)

```
Phase 1 (0-1s): Tech Stack Display
├─ Icons arranged in constellation
├─ Icons glow in rotation
├─ Connections appearing between icons
├─ Modern, sophisticated feel

Phase 2 (1-2s): Architecture Diagram
├─ High-level architecture appearing
├─ Frontend ← → Backend connections
├─ Database connections
├─ Integration points

Phase 3 (2-3s): API Visualization
├─ API documentation appearing
├─ Endpoints showing: /messages, /leads, /bookings
├─ Real-time data flow animation

Phase 4 (3-4s): Custom Workflows
├─ Node-based workflow builder appears
├─ Sample workflow: Message → Qualify → Schedule
├─ Nodes connected with animated paths
├─ Data flowing through nodes

Phase 5 (4-5s): Database & Storage
├─ Database icon with flowing data
├─ Multiple tables/collections showing
├─ Real-time data synchronization

Phase 6 (5-6s): Integration Ecosystem
├─ Multiple integrations appearing in ring:
│  ├─ Calendar systems
│  ├─ Payment processors
│  ├─ Analytics platforms
│  └─ Third-party services
├─ Connections showing bidirectional data flow

Phase 7 (6-7s): Deployment
├─ Server/cloud icon
├─ Code deploying (animated progress)
├─ Green checkmark: "Deployed"
├─ Uptime monitoring appearing

Phase 8 (7-8s): Result
├─ "Full custom solution with automation"
├─ "Scalable from day 1"
└─ "Ready for 1M+ requests/month"
```

#### Interactive Elements
- **Click endpoint:** Shows request/response example
- **Hover node:** Shows configuration
- **Drag node:** Can rearrange workflow (demo-only)
- **View docs:** Opens API documentation

---

## 5. HOW IT WORKS - "Unified Flow Visualization"

### Scene Structure (15 seconds, loop)

```
COMPLETE JOURNEY VISUALIZATION

Timeline with 6 Major Steps:
├─ Step 1: CLIENT INTERACTION (0-2s)
├─ Step 2: CAPTURE & PROCESS (2-4s)
├─ Step 3: INTELLIGENT RESPONSE (4-6s)
├─ Step 4: LEAD QUALIFIED (6-8s)
├─ Step 5: OWNER NOTIFIED (8-10s)
├─ Step 6: CONVERSION (10-12s)
└─ Repeat (12-15s fade out, loop)
```

### Detailed Animation per Step

#### Step 1: CLIENT INTERACTION (0-2s)
```
Visual:
├─ Multiple client sources appearing:
│  ├─ Chat bubble (message icon)
│  ├─ Phone icon (ringing)
│  ├─ Email icon
│  ├─ Form submission
│  └─ Social message
│
├─ Each with animated arrival
├─ Timeline indicator: "|─────────|" (0s point)
│
Animation:
├─ Elements slide in from screen edges
├─ Icons briefly enlarge (emphasis)
├─ Particles converge toward center
├─ Color: Channel-specific colors
```

#### Step 2: CAPTURE & PROCESS (2-4s)
```
Visual:
├─ Central processing node (rotating)
├─ Particles entering the node
├─ Internal processing visible:
│  ├─ Intent detection (light up)
│  ├─ Language processing (Bulgarian)
│  ├─ Data extraction
│  └─ Lead scoring
│
├─ Timeline indicator: moving forward
│
Animation:
├─ Smooth particle absorption
├─ Node glows brighter
├─ Internal lights activate in sequence
├─ Color: Processing white/neutral

Data shown:
├─ "Intent: Schedule appointment"
├─ "Confidence: 95%"
├─ "Language: Bulgarian"
└─ "Lead Score: 8.5/10"
```

#### Step 3: INTELLIGENT RESPONSE (4-6s)
```
Visual:
├─ Response message appearing
├─ Text: Real example response
├─ Buttons: Call to action options
├─ Delivery indicator
│
├─ Timeline indicator: at 4s mark
│
Animation:
├─ Message morphs from node
├─ Text appears word-by-word
├─ Buttons appear with glow effect
├─ Delivery checkmark (instant)
├─ Color: Brand colors (blues, greens)

Response Example (Bulgarian):
├─ "Добър ден! 👋"
├─ "Имам налични дати в средата и четвъртъка"
├─ "Изберете удобно време: [Календар]"
└─ "Или напишете 'Помощ' за повече опции"
```

#### Step 4: LEAD QUALIFIED (6-8s)
```
Visual:
├─ CRM/Database visualization
├─ New lead record created
├─ Scoring indicators
├─ Contact information filled
│
├─ Timeline indicator: 6s mark
│
Animation:
├─ Database icon appearing
├─ Lead form materializing
├─ Data fields populating:
│  ├─ Name (extracted)
│  ├─ Phone (extracted)
│  ├─ Email (extracted)
│  ├─ Service (detected)
│  └─ Lead score (assigned)
│
├─ Color: Green (success)

Info shown:
├─ Lead ID: #5423
├─ Status: New & Qualified
├─ Next action: Await appointment confirmation
└─ Value: Estimated 150 BGN
```

#### Step 5: OWNER NOTIFIED (8-10s)
```
Visual:
├─ Dashboard notification appearing
├─ Bell icon ringing
├─ Badge showing "New Lead"
├─ Quick action buttons:
│  ├─ View Details
│  ├─ Send Message
│  ├─ Confirm Appointment
│  └─ Add Notes
│
├─ Timeline indicator: 8s mark
│
Animation:
├─ Notification slides in from corner
├─ Bell pulses (sound effect optional)
├─ Badge bounces
├─ Buttons appear in sequence
├─ Color: Attention-getting (orange/red glow)

Notification text:
├─ "New qualified lead"
├─ "Sophia Ivanova"
├─ "Requesting appointment"
├─ "Wednesday 2-3pm preferred"
└─ "Action needed (optional)"
```

#### Step 6: CONVERSION (10-12s)
```
Visual:
├─ Appointment confirmed
├─ Calendar shows appointment
├─ Revenue meter increases
├─ Celebration effect
│
├─ Timeline indicator: 10s mark
│
Animation:
├─ Calendar event appearing
├─ Money icon with increasing amount
├─ Confetti particles (subtle)
├─ Green success checkmarks
├─ Color: Success green/gold

Result shown:
├─ "Appointment Booked ✓"
├─ "Date: Wednesday 2-3pm"
├─ "Client: Sophia Ivanova"
├─ "Potential revenue: 150 BGN"
└─ "Follow-up reminder: Tuesday 4pm"

Final message:
"This entire journey: 47 seconds"
"Without automation: 2-3 days of work"
```

#### Step 7: Loop Transition (12-15s)
```
├─ All elements fade to dark
├─ Timeline resets
├─ Statistics updated:
│  ├─ "Clients processed today: 147"
│  ├─ "Revenue generated: 12,450 BGN"
│  └─ "Average response time: 32 seconds"
│
└─ Loop repeats from Step 1
```

---

## TECHNICAL IMPLEMENTATION GUIDELINES

### Performance Targets
```
Frame Rate: 60 FPS (smooth motion)
Load Time: <1s (important for landing page)
File Size: <500KB (three.js + textures)
Mobile: 30-45 FPS (acceptable for smooth feel)
```

### Browser Compatibility
```
Desktop:
├─ Chrome 90+ ✓
├─ Firefox 88+ ✓
├─ Safari 14+ ✓
└─ Edge 90+ ✓

Mobile:
├─ iOS Safari 14+ ✓
├─ Chrome Android ✓
└─ Samsung Internet ✓

Fallback: Canvas 2D animation for older browsers
```

### Optimization Tips
```
1. Use instancing for repeated geometries
2. Bake lighting where possible
3. Use LOD (Level of Detail) for complex scenes
4. Lazy-load Three.js lib (async import)
5. Pause animation when tab is inactive
6. Use requestAnimationFrame for smooth updates
7. Implement worker thread for processing
8. Cache WebGL context
9. Use gzip compression for assets
10. Implement intersection observer for viewport
```

### Code Structure Example
```javascript
// Landing page demo initialization
import * as THREE from 'three';

class LandingPageDemos {
  constructor() {
    this.scenes = {
      hero: new HeroVisualization(),
      problem: new ProblemVisualization(),
      solution: new SolutionVisualization(),
      demo1: new Demo1Visualization(),
      demo2: new Demo2Visualization(),
      demo3: new Demo3Visualization(),
      howItWorks: new HowItWorksVisualization()
    };
  }

  init() {
    // Initialize each scene when visible
    // Use Intersection Observer
  }

  animate() {
    // Main animation loop
  }

  handleInteraction(demo, action) {
    // Handle clicks, hovers, etc.
  }
}
```

### Accessibility Implementation
```
1. Provide text descriptions of all animations
2. Include pause/play controls
3. Respect prefers-reduced-motion CSS
4. Add captions for key animations
5. Make interactive elements keyboard accessible
6. Use ARIA labels for screen readers
7. Include audio descriptions (optional)
8. Test with accessibility tools
```

---

## ANIMATION SPECS SUMMARY

| Scene | Duration | FPS | File Size | Interaction |
|-------|----------|-----|-----------|-------------|
| Hero | 8s loop | 60 | 150KB | Hover/Click |
| Problem | 4s each (3) | 60 | 200KB | Auto-play |
| Solution | 10s | 60 | 180KB | Split screen |
| Demo 1 | 7s | 60 | 120KB | Click phases |
| Demo 2 | 12s | 60 | 150KB | Drag/drop |
| Demo 3 | 8s | 60 | 140KB | Click nodes |
| How It Works | 15s loop | 60 | 200KB | Step clicking |

---

## NEXT STEPS

1. ✅ Create Three.js scene structures
2. ✅ Implement particle systems
3. ✅ Add interactive elements
4. ✅ Optimize for performance
5. ✅ Test on multiple devices
6. ✅ Add sound effects (optional)
7. ✅ Implement analytics tracking
8. ✅ Create fallback animations

---

**Document Owner:** Frontend Development Team
**Last Review:** 2026-03-23
**Implementation Priority:** HIGH (Core differentiator)
