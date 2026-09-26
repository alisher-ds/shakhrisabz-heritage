# Shakhrisabz Cultural Heritage Archive (UNESCO #885)
### *Silk Road Youth Documentation Expedition & AI Architectural Restoration*

[![UNESCO World Heritage](https://img.shields.io/badge/UNESCO_World_Heritage-%23885-blue.svg)](https://whc.unesco.org/en/list/885)
[![Wikimedia Grant](https://img.shields.io/badge/Supported_by-Wikimedia_Foundation_($2,000)-green.svg)](https://meta.wikimedia.org)
[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC_BY--SA_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)
[![Trilingual Support](https://img.shields.io/badge/Languages-EN%20%7C%20ZH%20%7C%20UZ-orange.svg)](#)
[![Theme](https://img.shields.io/badge/UI-Dark_%26_Light_Modes-purple.svg)](#)

> **Live Platform:** [https://alisher-ds.github.io/shakhrisabz-heritage/](https://alisher-ds.github.io/shakhrisabz-heritage/)

---

## 🏛️ Executive Overview

The **Historic Centre of Shakhrisabz**, Uzbekistan, inscribed as **UNESCO World Heritage Site #885**, represents over 2,700 years of Silk Road history and serves as the architectural cradle of the Timurid Renaissance. 

Funded through a regional grant from the **Wikimedia Foundation** ($2,000 USD), this open-access digital heritage initiative united a cohort of **20 youth stewards** trained at **Karshi State University**, co-organized and field-documented by **Alisher Tuychiev** as local heritage guide. The expedition systematically surveyed the urban fabric and mountain watershed of Kashkadarya, archiving over **500 high-resolution visual assets** to Wikimedia Commons under Creative Commons open licensing.

---

## 🚀 Key Modules & AI Innovations

### 1. 🤖 AI Architectural Restoration Lab: Ak-Saray Palace (1404 vs 2026)
* **The Challenge:** In 1404, Spanish diplomat Ruy González de Clavijo recorded that Ak-Saray's monumental arch soared over 70 meters high with a 22.5m span. Today, only two 38m ruin pylons survive due to historical destruction.
* **The AI Solution:** Using generative architectural diffusion models calibrated on Galina Pugachenkova's ground plan measurements and surviving Timurid girih tilework from Bibi-Khanym, we synthesized a photorealistic reconstruction of Ak-Saray in 1404.
* **Interactive Feature:** Users can drag a real-time before/after comparison slider to see the 600-year transition between modern archaeological ruins and restored 15th-century monumental glory.

### 2. 🗺️ Silk Road Geocultural Corridor (Interactive Map)
* An interactive geospatial visualization demonstrating the 6,000 km arterial route connecting **Shakhrisabz** to China's creative capitals (**Changsha** — UNESCO City of Media Arts, and **Nanjing** — UNESCO City of Literature).
* Highlights the historical exchange of Central Asian cobalt blue minerals for porcelain glazing and Chinese silk and papermaking.

### 3. 💬 Silk Road AI Heritage Docent
* A responsive, client-side conversational AI assistant supporting **English, Chinese (中文), and Uzbek (O'zbek)**.
* Pre-trained on primary Timurid chronicles, archaeological field reports from Karshi State University, and UNESCO World Heritage conservation dossiers.

### 4. 🎬 4K Archival Documentary Film
* A concise 0:49 documentary reel capturing the training cohort at Karshi State University and field surveying across Ak-Saray, Kok Gumbaz, Dorut-Tilovat, Chorsu Bazaar, and Miraki's Oqsuv alpine stream.

### 5. 📸 Curated Data-Driven Photographic Exhibition
* Modular JSON-driven gallery (`data/heritage-archive.json`) categorizing monuments, sacred epigraphy, vernacular woodcarving, and water heritage with accessible modal lightbox views and complete trilingual annotations.

---

## 🛠️ Architecture & Tech Stack

```text
shakhrisabz-heritage/
├── index.html                   # Clean, semantic, accessible HTML5 skeleton
├── README.md                    # Museum-grade documentation
├── data/
│   └── heritage-archive.json    # Trilingual metadata for all archival assets
├── css/
│   ├── variables.css            # Obsidian & Platinum color tokens (Dark/Light)
│   ├── main.css                 # Base layout, typography, navigation, modal
│   ├── ai-restoration.css       # Split-screen comparison slider styles
│   ├── silkroad-map.css         # Geocultural SVG route animation & cards
│   └── ai-docent.css            # Conversational assistant & prompt chips
├── js/
│   ├── app.js                   # Application controller & hero slideshow
│   ├── theme.js                 # Anti-FOUC theme engine (Light/Dark)
│   ├── i18n.js                  # Trilingual localization engine (EN, ZH, UZ)
│   ├── ai-restoration.js        # Touch/mouse/keyboard comparison slider
│   ├── silkroad-map.js          # Interactive Silk Road map nodes & details
│   ├── ai-docent.js             # Conversational AI knowledge assistant
│   └── gallery.js               # Dynamic JSON-driven photo exhibition
└── assets/                      # 4K documentary video & high-resolution imagery
```

* **Core Principles:** Zero runtime dependencies, instant load speeds, 100% WCAG accessible (`role="slider"`, `role="dialog"`, keyboard traps), and mobile-responsive across all viewports.

---

## 📜 Licensing & Open Access

All photographic materials, documentary video, and architectural reconstructions are dedicated to the global public domain and open knowledge community under the **Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)** license.

* **Grant Sponsor:** Wikimedia Foundation
* **Field Leadership:** Alisher Tuychiev (Local Heritage Guide) & Youth Delegation
* **Academic Partner:** Karshi State University Youth Cohort
