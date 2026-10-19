# Domain & GitHub Pages Deployment Guide

This document explains how your custom domain **`tpmt.work.gd`** is connected to your GitHub repository and how your site is automatically deployed from the **`dev`** branch.

---

## 1. Domain Configuration Overview

| Property | Value | Notes |
| :--- | :--- | :--- |
| **Domain Name** | `tpmt.work.gd` | Free sub-domain configured on DNS |
| **Branch Deployed** | `dev` | Auto-deploys on every `git push` |
| **Hosting Platform** | GitHub Pages | Free static hosting with automated SSL (HTTPS) |
| **CNAME Asset** | [`public/CNAME`](file:///c:/Users/Loki/Downloads/demo/test%202/tripower-site/public/CNAME) | Automatically included in the build output (`dist/CNAME`) |
| **CI/CD Workflow** | [`.github/workflows/deploy.yml`](file:///c:/Users/Loki/Downloads/demo/test%202/tripower-site/.github/workflows/deploy.yml) | GitHub Actions builder for Astro v7 |

---

## 2. DNS Verification (Already Active)

Your DNS records on your domain registrar match GitHub Pages requirements:

1. **A Records (`tpmt.work.gd`)**:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
2. **CNAME (`www.tpmt.work.gd`)**:
   - Points to `tpmt.work.gd`
3. **TXT Challenge**:
   - Record: `_github-pages-challenge-loki127001mr-crypto.tpmt.work.gd`
   - Value: `63619f431830dac627092e9201c3f3`

---

## 3. One-Time Step in GitHub (Takes 30 Seconds)

To enable GitHub to build and serve using the automated workflow:

1. Open your GitHub Repository:
   👉 **`https://github.com/loki127001mr-crypto/TPMT/settings/pages`**
2. Under **Build and deployment**:
   - **Source**: Change dropdown from "Deploy from a branch" to **`GitHub Actions`**.
3. Under **Custom domain**:
   - Enter: **`tpmt.work.gd`**
   - Click **Save**.
   - GitHub will check the DNS records and the TXT challenge (both are already live).
4. Check the box **Enforce HTTPS** (GitHub will provision a free SSL certificate).

---

## 4. How It Works Going Forward

Every time you commit and push to the **`dev`** branch:
1. GitHub Actions detects the push.
2. It runs `npm ci` and `npm run build`.
3. It bundles the site and copies the `CNAME` file.
4. It publishes directly to **`https://tpmt.work.gd`** in ~1 minute.
