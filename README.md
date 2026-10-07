# 🌱 CARE - India Garden Planner & Frost Date Guide

*This is a submission for the [Hacktoberfest Open-Source AI Challenge Week 1: Touch Grass](https://dev.to/challenges/hacktoberfest-week1-2026-10-05)*

---

## What I Built

Modern life keeps us tethered to screens, dashboards, and indoor desks for 8 to 12 hours a day. **CARE** is an intelligent, localized garden planner and frost guide designed to help urban dwellers, apartment tenants, and home growers literally **"Touch Grass"**—get away from monitors, step out onto balconies, terraces, and backyard plots, get their hands in the soil, and nurture living green spaces.

Most global gardening apps are hard-coded around Western USDA hardiness zones and spring-centric frost dates that fail in diverse subtropical and tropical climates. In India, gardening follows distinct agro-climatic seasons—such as the crucial **October Rabi sowing window**—where winter cold snaps and micro-climates dictate what will thrive or perish.

**CARE** solves this by providing:
1. **Interactive Agro-Climatic & Frost Date Selector**: Covers distinct Indian micro-climates (Delhi NCR, Shimla & Himalayan Hills, Chandigarh, Lucknow, Jaipur, Bengaluru, Mumbai, Kolkata, Pune) calculating first cold snap timelines, expected winter minimum temperatures, and current sowing windows.
2. **Weekly Sowing Action Planner**: Tells gardeners exactly what to sow *this week* (e.g., Desi Spinach, Winter Red Carrots, Kasuri Methi, Radish, Green Peas, Winter Flowers) with cold thresholds, sunlight hours, and days-to-harvest indicators.
3. **Curated Plant Catalog & Filterable Collection**: Explore vegetables, winter flowers, herbs, indoor air-purifying foliage, and succulents with practical potting care data.
4. **AI Horticultural Specialist**: An interactive garden companion that provides step-by-step guidance on terrace pot preparation, vermicompost ratios, companion planting, and organic pest defense (such as neem oil solutions).
5. **Practical Seasonal Guides**: Curated articles addressing rooftop frost defense, balcony micro-climates, and winter crop planning.

---

## Demo

- **Live Deployed Demo**: [Open Live Demo](https://rajukanna.github.io/care/) *(or host locally via GitHub Pages)*
- **Local Preview**: Open [`index.html`](file:///c:/Users/rajuk/plant/index.html) directly in any modern web browser—no build steps or bundlers required!

---

## Code

The complete source code is organized as a clean, lightweight, dependency-free web application:
- **Repository**: [GitHub Repository](https://github.com/rajukanna/care)
- **Primary Source Files**:
  - [`index.html`](file:///c:/Users/rajuk/plant/index.html) — Semantic HTML5 layout, accessible modal dialogues, and responsive navigation.
  - [`styles.css`](file:///c:/Users/rajuk/plant/styles.css) — Custom botanical design system (forest green `#143D32`, warm amber `#EAA023`, organic ivory `#FAF9F6`), glassmorphic headers, responsive CSS Grid / Flexbox layouts, and subtle micro-animations.
  - [`app.js`](file:///c:/Users/rajuk/plant/app.js) — Agro-climatic database, dynamic plant filtering, interactive modals, AI assistant integration, and offline fallback heuristic engine.

---

## How I Built It

### 1. Technology Stack
- **Architecture**: Zero-overhead Vanilla Web Stack (HTML5 + CSS3 + ES6+ JavaScript).
- **Design Language**: Crafted with modern typography (*Plus Jakarta Sans* and *Playfair Display*), custom SVG botanical iconography, and an earth-toned color system tailored to gardening aesthetics.
- **AI Integration**: Powered by an open AI model cascade using Google Gemini Flash models with graceful degradation.
- **Offline-First Resilience**: Includes a built-in regional heuristic engine (`getLocalGardeningAdvice`), ensuring that users on rooftops or in remote garden plots with poor internet connectivity still receive immediate, accurate sowing and frost advice.

### 2. Regional Climate Intelligence
The app models distinct agro-climatic conditions across India:
- **Zone 1 (Western Himalayas / Shimla)**: Heavy frost risk (-2°C to 2°C), pre-frost garlic and winter bulb planting.
- **Zone 2 (Northern & Gangetic Plains / Delhi, Chandigarh, Lucknow, Jaipur)**: Occasional ground frost and winter fog (2°C to 5°C), peak October direct-sow Rabi leafy greens and root crops.
- **Zone 3 (Eastern Plains / Kolkata)**: Mild winter (11°C to 13°C), cool-season brassicas and winter annuals.
- **Zone 4 (Deccan Plateau / Bengaluru, Pune)**: Pleasant, frost-free climate ideal for year-round urban container gardening and strawberry cultivation.
- **Zone 5 (Tropical Maritime / Mumbai & Coastal)**: Year-round frost-free, post-monsoon container greens and tropical foliage.

---

## Why Does Open Innovation Matter?

Gardening and climate resilience are community commons. When gardening guidance is locked inside closed-source proprietary apps or behind paywalls, beginner growers and local communities lose out. Furthermore, global closed-source solutions routinely ignore non-Western ecological contexts and indigenous crops like Kasuri Methi, Palak, or Desi Gajar.

Open innovation matters because:
- **Democratizing Food Sovereignty**: Open knowledge encourages urban citizens to grow their own fresh, pesticide-free food on balconies and rooftops.
- **Community-Calibrated Climate Models**: Open data structures allow local gardeners in every city or village to contribute real-world temperature variations, first frost dates, and micro-climate nuances.
- **Accessibility & Privacy**: Running on lightweight open web standards means zero tracking, zero mandatory subscriptions, and instant accessibility on any smartphone or tablet.

---

## My Agent Session

This project was built and refined in collaboration with **Antigravity AI**, Google DeepMind's agentic coding assistant:
- Guided the architectural planning of the Indian agro-climatic database and weekly sowing planner.
- Implemented a cohesive, responsive botanical design system with custom CSS variables and glassmorphism.
- Integrated AI conversational prompts with offline fallback heuristics.
- Conducted rapid iterative UI polish, accessibility checks, and element streamlining.

---

## Prize Categories

- **Hacktoberfest Week 1: Touch Grass** (Championing offline wellbeing, nature reconnection, and hands-on urban gardening).
- **Open-Source AI & Climate / Community Wellness**.

---

## Quick Start (Run Locally)

No Node.js build pipeline or compilation steps needed. Simply clone and run:

```bash
# 1. Clone the repository
git clone https://github.com/rajukanna/care.git

# 2. Navigate to the project directory
cd care

# 3. Open in your favorite browser
# On Windows:
start index.html

# Or run with any local static HTTP server:
npx serve .
# or
python -m http.server 8000
```

Open `http://localhost:8000` to start planning your garden and getting your hands in the soil! 🌿
