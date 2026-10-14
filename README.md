# Tripower Mold Tech — Web Application

Modular **Astro + Tailwind CSS (v4)** web application for **Tripower Mold Tech**, a precision injection mold toolroom in Thirumudivakkam, Chennai.

---

## 🚀 Quick Start

Ensure you have Node.js installed (v20+ recommended).

```bash
# Install dependencies
npm install

# Start local development server with network access
npm run dev -- --host

# Build static production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Live URLs

* **Local Machine:** [http://localhost:4321/](http://localhost:4321/)
* **Local Network (LAN):** [http://192.168.1.174:4321/](http://192.168.1.174:4321/)

---

## 🧭 Routes Summary

| Route | Page | Purpose |
| :--- | :--- | :--- |
| [`/`](http://localhost:4321/) | **Home** | Facility telemetry, high-impact stats, core capabilities, and instant RFQ |
| [`/about-us`](http://localhost:4321/about-us) | **About Us** | Toolroom profile, precision engineering standards, and leadership |
| [`/services`](http://localhost:4321/services) | **Services & D3** | Plastic molds, insert dies, D3 CAD/CAM/CAE interactive phases |
| [`/capabilities`](http://localhost:4321/capabilities) | **Capabilities** | Makino CNC, Wire EDM, CMM metrology, and project portfolio filters |
| [`/contact`](http://localhost:4321/contact) | **Contact Us** | Plant address, direct WhatsApp / call, plant tour scheduler, file upload |
| [`/rfq`](http://localhost:4321/rfq) | **RFQ Portal** | 2D/3D CAD (.STEP / .IGS) submission & instant feasibility quote |

*(Legacy routes like `/services-d3-solutions`, `/capabilities-portfolio`, `/contact-us`, and `/rfq-portal` are also fully supported).*

---

## 📖 In-Depth Documentation

For the full architectural breakdown, component hierarchy, design tokens, and developer how-to playbook, see:

👉 **[documentation/README.md](../documentation/README.md)** (Full Architecture, Directory Map, and Editing Manuals)
