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

## 🚀 Key Modules & Innovations

### 1. 🏛️ 50-Year Metamorphosis: Archival Survey vs. Modern Conservation (1975 vs. 2025)
* **The Archival Discovery:** Comparative visual analysis between a 1975 Soviet-era archival photograph and the 2025 youth expedition survey of Ak-Saray Palace (UNESCO #885).
* **Conservation & UNESCO Dilemma:** Highlights 50 years of brickwork consolidation (filling structural vertical fissures on the western pylon) vs. modern urban clearing (transition from rural dirt paths and mature trees to an expansive tourist plaza), directly examining the factors behind Shakhrisabz's inclusion on the UNESCO List of World Heritage in Danger (2016).
* **Interactive Feature:** Touch, mouse, and keyboard-enabled real-time comparison slider with GPU-accelerated CSS `clip-path` and analytical insight cards.

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
│   ├── transformation.css       # 50-year comparison slider & insight cards
│   ├── silkroad-map.css         # Geocultural SVG route animation & cards
│   └── ai-docent.css            # Conversational assistant & prompt chips
├── js/
│   ├── app.js                   # Application controller & hero slideshow
│   ├── theme.js                 # Anti-FOUC theme engine (Light/Dark)
│   ├── i18n.js                  # Trilingual localization engine (EN, ZH, UZ)
│   ├── transformation.js        # Touch/mouse/keyboard comparison slider engine
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
