# Refinedocs — Open Source Project Specification

## 1. Executive Summary & Vision

**Refinedocs** is a 100% free, private, client-side document and media processing platform. Originally conceived with hosted AI enhancements, user accounts, and paywalls, this project has been fully decoupled and transformed into a **pure open-source utility toolkit**.

### Core Philosophy
* **Zero Server Uploads**: Files are processed directly in the user's browser using WebAssembly (WASM), Web Workers, HTML5 Canvas, and client-side JavaScript engines. No documents or media are ever transmitted to any external backend.
* **Zero Paywalls & No Daily Limits**: All conversion, compression, and editing tools are unmetered and free for all users.
* **No Accounts / No Cloud Dependencies**: No Firebase Auth, Google Sign-in, Stripe subscriptions, AI API tokens, or tracking databases required.
* **Effortless Local Run & Self-Hosting**: Anyone can clone the repository, run `npm install && npm run dev`, and run the complete suite locally on their computer or self-host it on any standard Node.js/web server.

---

## 2. Decoupling & Deprecation Specifications

### 2.1 Removed AI Stack
The following proprietary and paid AI services have been removed:
* **Google Gemini AI SDK (`@google/genai`)**: Removed from runtime dependencies.
* **AI Tool Endpoints**: Removed `/api/tools/background-removal`.
* **AI Feature Components**:
  * `BackgroundRemover` (`bg-remover`): Required Gemini 2.5 Flash Image.
  * `WatermarkRemover` (`watermark-remover`): Required Gemini 2.5 Flash Image.
  * `ImageToText` (`image-to-text`): Required Gemini OCR models.
* **AI Access Gates & Credit Systems**: Removed `useAIGate`, `AIGateModal`, `AIFeatureGate`, `AICreditsGrid`, and `/api/credits/webhook`.

### 2.2 Removed Connection & Auth Stack ("Connexion")
* **Authentication**: Firebase Authentication (`firebase/auth`), Google Sign-In, login pages (`/login`), signup pages (`/signup`), and session tokens.
* **User Management**: `/account` layouts, profile editors, user deletion flows, and `AuthProvider`.
* **Database & Storage**: Cloud Firestore (`firebase/firestore`), Firestore admin (`firebase-admin`), and user preferences stores.
* **Third-Party Email**: Resend SDK (`resend`) and welcome email triggers (`/api/emails/welcome`).
* **Telemetrics & Ads**: Firebase Analytics (`firebase/analytics`), Google AdSense tags, and cookie consent tracking walls.

### 2.3 Removed Monetization & Paywalls
* **Stripe Subscriptions & Checkout**: Removed `stripe`, `/api/checkout`, `/api/products`, `PricingButtons`, `LicenseActivation`, and `/pricing` routes.
* **Download Gates**: Removed 2-download daily limits, auth-wall triggers, and payment gates in `useDownloadGate`. Downloads now trigger native browser file downloads immediately.

---

## 3. Retained Features & Tools (18 Core Tools)

The application retains 18 high-performance, completely client-side tools organized across 5 categories:

### 3.1 PDF Suite
1. **Compress PDF (`compress-pdf`)**: In-browser PDF stream and object optimization powered by `pdf-lib`.
2. **PDF to Images (`pdf-to-image`)**: Converts PDF pages into high-resolution PNG/JPEG images via `pdfjs-dist` and HTML5 Canvas.
3. **PDF to Word (`pdf-to-word`)**: Extracts text, structures, and layout into editable `.docx` files using `pdfjs-dist` and `docx`.
4. **Word to PDF (`word-to-pdf`)**: Converts `.docx` documents into standard PDF format using `mammoth` and `pdf-lib`.
5. **PDF to Excel (`pdf-to-excel`)**: Extracts tabular data from PDFs into spreadsheet files (`.xlsx`).
6. **PDF to CSV (`pdf-to-csv`)**: Parses PDF tables directly into `.csv` files using `pdfjs-dist` and `papaparse`.
7. **CSV to PDF (`csv-to-pdf`)**: Generates cleanly formatted PDF tables from raw CSV input.
8. **Excel to PDF (`excel-to-pdf`)**: Renders `.xlsx` spreadsheets as structured PDF documents.

### 3.2 Image Suite
9. **Image Converter (`image-converter`)**: Converts images across PNG, JPEG, WEBP, and BMP formats via Canvas.
10. **Image Resizer (`resize`)**: Resizes images by dimensions or percentages with aspect ratio locks and custom quality settings.
11. **Compress Images (`compress-images`)**: High-efficiency client-side lossy/lossless image compression.
12. **HEIC to PNG/JPEG (`heic-to-png`)**: Converts Apple HEIC/HEIF photos directly in the browser via `heic-to`.
13. **SVG to PNG/JPEG (`svg-to-png`)**: Rasterizes vector SVGs to crisp PNG/JPEG files at arbitrary scale factors.
14. **Add Watermark (`watermark`)**: Overlays customizable text or graphic watermarks onto images and documents with full opacity, rotation, and positioning control.

### 3.3 Spreadsheets
15. **Excel to CSV (`excel-to-csv`)**: Converts Microsoft Excel (`.xlsx`, `.xls`) workbooks into clean CSV files via `xlsx`.
16. **CSV to Excel (`csv-to-excel`)**: Converts CSV files into styled Excel `.xlsx` spreadsheets.

### 3.4 Video & Media
17. **Compress Video (`compress-video`)**: In-browser video compression using FFmpeg WebAssembly (`@ffmpeg/ffmpeg`).
18. **Video to GIF (`video-to-gif`)**: Converts video clips to animated GIFs with framerate, loop, and size controls using `@ffmpeg/ffmpeg`.

---

## 4. Architecture & Technical Stack

* **Framework**: Next.js 14 (App Router)
* **Language**: TypeScript (strict types enabled)
* **Styling**: Tailwind CSS, PostCSS, Lucide React (Icons), Framer Motion (`motion`)
* **Internationalization**: `next-intl` (English, Spanish, French, Italian, Portuguese)
* **Local Processing Libraries**:
  * `pdf-lib` (PDF manipulation & creation)
  * `pdfjs-dist` (PDF parsing & rendering)
  * `@ffmpeg/ffmpeg` & `@ffmpeg/util` (WebAssembly media transcoding)
  * `xlsx` & `papaparse` (Spreadsheet processing)
  * `docx` & `mammoth` (Word document manipulation)
  * `heic-to` (HEIC image decoding)
* **State Management**: React Context (`ToolStateProvider` with localStorage/IndexedDB persistence)

---

## 5. Directory Structure (After Decoupling)

```text
refinedocs/
├── public/                     # Static assets, fonts, icons, illustrations
├── messages/                   # i18n translation strings (en, es, fr, it, pt-PT)
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── [locale]/           # Localized pages (home, tools, blog, faq, terms, privacy)
│   │   │   ├── tools/          # Tool workspaces & clean URLs (/tools/[toolSlug])
│   │   │   ├── blog/           # Educational markdown blog
│   │   │   ├── faq/            # FAQ page
│   │   │   └── page.tsx        # Modernized open-source landing page
│   │   ├── layout.tsx          # Root layout
│   │   └── globals.css         # Tailwind global styles
│   ├── components/
│   │   ├── layout/             # Navbar, Footer, MainSidebar, ToolsDirectory
│   │   ├── tools/              # 18 client-side tool implementations
│   │   ├── blog/               # Markdown rendering & blog UI
│   │   └── ui/                 # Shared UI elements
│   ├── hooks/                  # Custom hooks (useDownloadGate, useToolState)
│   ├── lib/                    # File caching, helpers, SEO datasets
│   └── i18n/                   # Translation routing configuration
├── SPECS.md                    # This document
├── README.md                   # Installation, usage, and contributor guide
└── package.json                # Lean, open-source dependency manifest
```

---

## 6. Verification & Quality Assurance Standards

1. `npm run build` must compile cleanly without requiring external secrets or network access.
2. No remaining calls to Firebase, Google GenAI, Stripe, or Resend.
3. Every tool can process an input file and trigger an immediate download without showing authentication or payment modals.
4. Clean, responsive dark/light mode UI with multi-language support.
