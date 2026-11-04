# Refinedocs 📄✨

> **100% Free, Private, Client-Side Document & Media Toolkit.**  
> Convert, compress, and edit PDFs, images, spreadsheets, and videos directly inside your browser. No files leave your computer. No accounts, no paywalls, no tracking.

---

## ⚡ Highlights

* 🔒 **100% Client-Side & Private**: Files are processed entirely on your machine using WebAssembly (WASM), Web Workers, and HTML5 Canvas. Zero documents or media are ever uploaded to any server.
* 💸 **Completely Free & Unmetered**: No daily limits, no subscription tiers, no credit tokens, and no login walls.
* 📴 **Offline-Capable**: Runs locally in your browser.
* 🌐 **Multilingual**: Out-of-the-box support for English, Spanish, French, Italian, and Portuguese (`next-intl`).
* 🌓 **Dark & Light Mode**: Clean, responsive interface styled with Tailwind CSS and Framer Motion.

---

## 🛠️ Included Tools (18 Core Utilities)

Refinedocs comes loaded with 18 high-performance offline tools across 4 categories:

### 📑 PDF Suite
| Tool | Description | Engine |
| :--- | :--- | :--- |
| **Compress PDF** | Reduce PDF file size with adjustable compression levels | `pdf-lib` |
| **PDF to Images** | Convert PDF pages into high-resolution PNG or JPEG images | `pdfjs-dist` + Canvas |
| **PDF to Word** | Extract layout and text from PDFs into editable `.docx` files | `pdfjs-dist` + `docx` |
| **Word to PDF** | Convert Microsoft Word `.docx` documents into standard PDFs | `mammoth` + `pdf-lib` |
| **PDF to Excel** | Parse and extract tabular data from PDF pages into `.xlsx` spreadsheets | `pdfjs-dist` + `xlsx` |
| **PDF to CSV** | Convert PDF data tables into structured `.csv` files | `pdfjs-dist` + `papaparse` |
| **CSV to PDF** | Format raw CSV table data into a clean, printable PDF document | `pdf-lib` |
| **Excel to PDF** | Render `.xlsx` / `.xls` spreadsheets as formatted PDF pages | `xlsx` + `pdf-lib` |

### 🖼️ Image Suite
| Tool | Description | Engine |
| :--- | :--- | :--- |
| **Image Converter** | Convert images between PNG, JPEG, WEBP, and BMP formats | HTML5 Canvas |
| **Image Resizer** | Resize images by exact pixels or percentage with aspect ratio lock | HTML5 Canvas |
| **Compress Images** | Lossy/lossless browser-based image size reducer | HTML5 Canvas |
| **HEIC to PNG/JPEG** | Convert Apple iOS HEIC photos to standard image formats | `heic-to` |
| **SVG to PNG/JPEG** | Rasterize vector SVG files at custom resolutions | HTML5 Canvas |
| **Add Watermark** | Overlay customizable text or image watermarks with opacity and rotation | HTML5 Canvas |

### 📊 Spreadsheets
| Tool | Description | Engine |
| :--- | :--- | :--- |
| **Excel to CSV** | Export Excel sheets (`.xlsx`, `.xls`) to clean CSV files | `xlsx` |
| **CSV to Excel** | Convert CSV files into Microsoft Excel `.xlsx` workbooks | `xlsx` |

### 🎬 Video & Animation
| Tool | Description | Engine |
| :--- | :--- | :--- |
| **Compress Video** | Compress MP4/WebM videos directly in your browser | `@ffmpeg/ffmpeg` (WASM) |
| **Video to GIF** | Convert video clips into animated GIFs with custom FPS and scale | `@ffmpeg/ffmpeg` (WASM) |

---

## 🚀 Quick Start (Run on your Computer)

### Prerequisites

* **Node.js**: v18.17.0 or newer (Node.js 20 or 22 recommended).
* **npm** (bundled with Node), **pnpm**, or **yarn**.

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/lepatlamass/Refinedocs.git
   cd Refinedocs
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in your browser:**
   Open [http://localhost:3000](http://localhost:3000) in your web browser.

> 💡 **No API keys or environment variables required!** Refinedocs runs completely self-contained without needing third-party services.

---

## 🏗️ Production Build & Self-Hosting

To build and run an optimized production build:

```bash
# Build the application
npm run build

# Start the production server on port 3000
npm run start
```

### Self-Hosting with Docker

You can run Refinedocs with any standard Node.js Docker container:

```dockerfile
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY package*.json ./
RUN npm ci --only=production

COPY .next ./.next
COPY public ./public
COPY messages ./messages

EXPOSE 3000
CMD ["npm", "start"]
```

---

## 📂 Project Structure

```text
refinedocs/
├── messages/                   # i18n translations (en, es, fr, it, pt-PT)
├── public/                     # Static assets, SVG illustrations, and icons
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── [locale]/           # Internationalized routes
│   │   │   ├── tools/[toolSlug]/ # Individual tool workspace pages
│   │   │   ├── tools/page.tsx    # Tools index
│   │   │   ├── blog/             # Offline markdown blog articles
│   │   │   ├── faq/              # FAQ page
│   │   │   ├── privacy/          # Privacy policy
│   │   │   ├── terms/            # Terms of service
│   │   │   └── page.tsx          # Main landing page
│   │   ├── layout.tsx          # Root layout
│   │   └── globals.css         # Tailwind global styles
│   ├── components/
│   │   ├── layout/             # Navbar, Footer, MainSidebar, ToolsDirectory
│   │   ├── tools/              # Implementations of all 18 client-side tools
│   │   └── blog/               # Markdown post readers
│   ├── hooks/
│   │   ├── useDownloadGate.ts  # Direct, unmetered file download trigger
│   │   └── useToolState.ts     # In-memory and local session state
│   ├── lib/
│   │   ├── fileCache.ts        # Client-side Blob & file download helpers
│   │   ├── sidebarData.ts      # Tool navigation tree
│   │   └── seoData.ts          # Metadata and documentation for tools
│   └── i18n/                   # Language detection and configuration
├── SPECS.md                    # Technical specification & architecture document
├── README.md                   # You are here
└── package.json                # Dependencies and scripts
```

---

## 🧑‍💻 How to Add a New Tool

Refinedocs is built with modularity in mind. Adding a new browser-based tool is straightforward:

1. **Create the Tool Component:**
   Create a new component under `src/components/tools/YourToolName/YourToolName.tsx`.
   Use `useDownloadGate` to trigger downloads:
   ```tsx
   import { useDownloadGate } from '@/hooks/useDownloadGate';

   export default function YourTool() {
     const { guardedBlobDownload } = useDownloadGate('your-tool-id');

     const handleDownload = (blob: Blob) => {
       guardedBlobDownload(blob, 'output.ext');
     };

     return (
       /* Your UI and in-browser processing logic */
     );
   }
   ```

2. **Register the Tool in Navigation:**
   Add your tool to `src/lib/sidebarData.ts`.

3. **Register the Route Slug:**
   Add `'your-tool-id'` to `VALID_TOOL_SLUGS` in `src/app/[locale]/tools/[toolSlug]/page.tsx`.

4. **Add Translation Strings:**
   Add the tool title and description keys to `messages/en.json` (and other locales as desired).

5. **Mount in `src/App.tsx`:**
   Add the condition in the tool switch in `src/App.tsx` to render your component.

---

## 🌐 Supported Languages

* 🇬🇧 English (`en`) - Default
* 🇪🇸 Spanish (`es`)
* 🇫🇷 French (`fr`)
* 🇮🇹 Italian (`it`)
* 🇵🇹 Portuguese (`pt-PT`)

Translations are stored in clean JSON files inside the `messages/` folder. PRs adding new translations are warmly welcomed!

---

## 🛡️ Privacy & Security Guarantee

Refinedocs enforces strict local execution:
* **Zero network data transfer for user files**: Uploaded files never travel over the internet.
* **No analytics / No telemetry**: No Google Analytics, Firebase, tracking pixels, or third-party cookies.
* **Memory safety**: Files are loaded into temporary browser memory or IndexedDB blobs and discarded upon session completion.

---

## 📄 License

This project is licensed under the [Apache-2.0 License](LICENSE).
Feel free to fork, adapt, self-host, and contribute back!
