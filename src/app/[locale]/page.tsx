import { getTranslations } from 'next-intl/server';
import { Link } from '../../navigation';
import Image from 'next/image';
import type { Metadata } from 'next';
import {
  ArrowRight,
  Zap,
  Shield,
  TrendingUp,
  CloudDownload,
  Lock,
  Cpu,
  HardDrive,
  CheckCircle2,
  Sparkles,
  FileSpreadsheet,
  FileText,
  Minimize,
  Image as ImageIcon,
  FileVideo,
  Layers,
  Code2,
} from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import ToolsDirectory from '../../components/layout/ToolsDirectory';
import Footer from '../../components/layout/Footer';
import ToolsExplorer, { type ToolItem } from '../../components/home/ToolsExplorer';

type MetaProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: MetaProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Home' });
  const siteUrl = 'https://refinedocs.com';

  const languages: Record<string, string> = {
    'x-default': siteUrl,
    en: `${siteUrl}/en`,
    es: `${siteUrl}/es`,
    fr: `${siteUrl}/fr`,
    it: `${siteUrl}/it`,
    'pt-PT': `${siteUrl}/pt-PT`,
  };

  return {
    title: {
      absolute: t('metaTitle'),
    },
    description: t('metaDescription'),
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages,
    },
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      url: `${siteUrl}/${locale}`,
      siteName: 'Refinedocs',
      type: 'website',
      images: [{ url: '/og-image.jpg', width: 1024, height: 1024 }],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('Home');
  const tCommon = await getTranslations('Common');
  const tTools = await getTranslations('Tools');

  const siteUrl = 'https://refinedocs.com';
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Refinedocs',
    url: `${siteUrl}/${locale}`,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/${locale}/tools?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: 'Refinedocs',
    url: siteUrl,
    logo: `${siteUrl}/favicon.ico`,
    sameAs: [
      'https://www.linkedin.com/in/konwolorentz/',
      'https://x.com/LorentzKonwo',
      'https://www.youtube.com/@konwolorentz7285',
    ],
  };

  const allTools: ToolItem[] = [
    // PDF Suite (8)
    {
      id: 'pdf-to-excel',
      name: tTools('pdf-to-excel'),
      description: tTools('pdf-to-excel-desc'),
      category: 'pdf',
      engine: 'PDF.js + SheetJS',
      badge: 'PDF → XLSX',
      featured: true,
    },
    {
      id: 'compress-pdf',
      name: tTools('compress-pdf'),
      description: tTools('compress-pdf-desc'),
      category: 'pdf',
      engine: 'pdf-lib',
      badge: 'PDF Optimizer',
      featured: true,
    },
    {
      id: 'pdf-to-word',
      name: tTools('pdf-to-word'),
      description: tTools('pdf-to-word-desc'),
      category: 'pdf',
      engine: 'PDF.js + docx',
      badge: 'PDF → DOCX',
      featured: true,
    },
    {
      id: 'word-to-pdf',
      name: tTools('word-to-pdf'),
      description: tTools('word-to-pdf-desc'),
      category: 'pdf',
      engine: 'Mammoth + pdf-lib',
      badge: 'DOCX → PDF',
    },
    {
      id: 'pdf-to-image',
      name: tTools('pdf-to-image'),
      description: tTools('pdf-to-image-desc'),
      category: 'pdf',
      engine: 'PDF.js + Canvas',
      badge: 'PDF → PNG/JPG',
    },
    {
      id: 'pdf-to-csv',
      name: tTools('pdf-to-csv'),
      description: tTools('pdf-to-csv-desc'),
      category: 'pdf',
      engine: 'PDF.js + PapaParse',
      badge: 'PDF → CSV',
    },
    {
      id: 'excel-to-pdf',
      name: tTools('excel-to-pdf'),
      description: tTools('excel-to-pdf-desc'),
      category: 'pdf',
      engine: 'SheetJS + pdf-lib',
      badge: 'XLSX → PDF',
    },
    {
      id: 'csv-to-pdf',
      name: tTools('csv-to-pdf'),
      description: tTools('csv-to-pdf-desc'),
      category: 'pdf',
      engine: 'pdf-lib',
      badge: 'CSV → PDF',
    },
    // Image Suite (6)
    {
      id: 'compress-images',
      name: tTools('compress-images'),
      description: tTools('compress-images-desc'),
      category: 'image',
      engine: 'HTML5 Canvas',
      badge: 'JPG / PNG / WebP',
      featured: true,
    },
    {
      id: 'image-converter',
      name: tTools('image-converter'),
      description: tTools('image-converter-desc'),
      category: 'image',
      engine: 'HTML5 Canvas',
      badge: 'Any Image Format',
    },
    {
      id: 'resize',
      name: tTools('resize'),
      description: tTools('resize-desc'),
      category: 'image',
      engine: 'HTML5 Canvas',
      badge: 'Pixel & Scale',
    },
    {
      id: 'heic-to-png',
      name: tTools('heic-to-png'),
      description: tTools('heic-to-png-desc'),
      category: 'image',
      engine: 'heic-to WASM',
      badge: 'HEIC → PNG/JPG',
      featured: true,
    },
    {
      id: 'svg-to-png',
      name: tTools('svg-to-png'),
      description: tTools('svg-to-png-desc'),
      category: 'image',
      engine: 'Vector Rasterizer',
      badge: 'SVG → PNG',
    },
    {
      id: 'watermark',
      name: tTools('watermark'),
      description: tTools('watermark-desc'),
      category: 'image',
      engine: 'Canvas + pdf-lib',
      badge: 'Text & Logo Stamp',
    },
    // Spreadsheets (2)
    {
      id: 'excel-to-csv',
      name: tTools('excel-to-csv'),
      description: tTools('excel-to-csv-desc'),
      category: 'spreadsheet',
      engine: 'SheetJS',
      badge: 'XLSX → CSV',
    },
    {
      id: 'csv-to-excel',
      name: tTools('csv-to-excel'),
      description: tTools('csv-to-excel-desc'),
      category: 'spreadsheet',
      engine: 'SheetJS',
      badge: 'CSV → XLSX',
    },
    // Video & Media (2)
    {
      id: 'compress-video',
      name: tTools('compress-video'),
      description: tTools('compress-video-desc'),
      category: 'media',
      engine: 'FFmpeg WASM',
      badge: 'MP4 / WebM / MOV',
    },
    {
      id: 'video-to-gif',
      name: tTools('video-to-gif'),
      description: tTools('video-to-gif-desc'),
      category: 'media',
      engine: 'FFmpeg WASM',
      badge: 'Video → GIF',
      featured: true,
    },
  ];

  const quickJumpTools = [
    { id: 'compress-pdf', label: tTools('compress-pdf'), icon: Minimize },
    { id: 'pdf-to-excel', label: tTools('pdf-to-excel'), icon: FileSpreadsheet },
    { id: 'pdf-to-word', label: tTools('pdf-to-word'), icon: FileText },
    { id: 'compress-images', label: tTools('compress-images'), icon: ImageIcon },
    { id: 'heic-to-png', label: 'HEIC → PNG', icon: ImageIcon },
    { id: 'video-to-gif', label: tTools('video-to-gif'), icon: FileVideo },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0a0b0e] text-gray-900 dark:text-white font-sans selection:bg-[#d4ff33] selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Navbar />

      <main>
        {/* ─── Atmospheric Hero Section ───────────────────────────────────────── */}
        <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28 px-6 border-b border-black/[0.06] dark:border-white/[0.06]">
          {/* Subtle architectural grid & radial glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.035)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,#000_60%,transparent_100%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[780px] h-[420px] bg-[#d4ff33]/20 dark:bg-[#d4ff33]/[0.12] rounded-full blur-[130px]"
          />

          <div className="relative max-w-6xl mx-auto">
            {/* Top Status Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 dark:bg-white/[0.05] border border-black/10 dark:border-white/15 text-[11px] font-bold text-gray-900 dark:text-[#d4ff33] tracking-wider uppercase shadow-sm backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 dark:bg-[#d4ff33] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 dark:bg-[#d4ff33]" />
                </span>
                <span>100% FREE &amp; OPEN SOURCE — ZERO SERVER UPLOADS</span>
              </div>
            </div>

            {/* Headline */}
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-extrabold mb-6 tracking-tight leading-[1.08] [text-wrap:balance]">
                {t('heroTitle')}
                <span className="inline-block px-3 py-0.5 mx-1 rounded-2xl bg-[#d4ff33] text-black dark:bg-[#d4ff33]/15 dark:text-[#d4ff33] dark:border dark:border-[#d4ff33]/30">
                  {t('heroTitleAccent')}
                </span>{' '}
                {t('heroTitleSuffix')}
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed [text-wrap:pretty]">
                {t('heroSubtitle')}
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10">
                <a
                  href="#tools-explorer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 bg-[#d4ff33] text-black font-extrabold rounded-2xl hover:bg-[#c5f022] transition-all text-base shadow-lg shadow-[#d4ff33]/20 hover:-translate-y-0.5"
                >
                  <span>{t('startConverting')}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  href="/tools/pdf-to-excel"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white dark:bg-white/[0.05] text-gray-900 dark:text-white font-bold border border-black/10 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/[0.1] transition-all text-base"
                >
                  <Cpu className="w-4 h-4 text-gray-500 dark:text-[#d4ff33]" />
                  <span>{tCommon('tools')} (18)</span>
                </Link>
              </div>

              {/* Quick-Jump Tool Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto mb-14">
                {quickJumpTools.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.id}
                      href={`/tools/${item.id}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-[#14171f] text-gray-700 dark:text-gray-300 border border-black/10 dark:border-white/[0.08] hover:border-black/30 dark:hover:border-[#d4ff33]/50 hover:text-black dark:hover:text-[#d4ff33] transition-all shadow-sm"
                    >
                      <Icon className="w-3.5 h-3.5 text-gray-400 dark:text-[#d4ff33]" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* ─── Interactive Browser Sandbox Pipeline Visual Card ─── */}
            <div className="rounded-3xl p-6 sm:p-8 bg-white/90 dark:bg-[#11141c]/90 border border-black/10 dark:border-white/10 shadow-2xl shadow-black/5 dark:shadow-black/50 backdrop-blur-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-black/[0.06] dark:border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-400/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-400/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
                  </div>
                  <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
                    browser://local-sandbox/wasm-pipeline
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-[#d4ff33] bg-emerald-500/10 dark:bg-[#d4ff33]/10 px-3 py-1 rounded-lg border border-emerald-500/20 dark:border-[#d4ff33]/20">
                  <Lock className="w-3.5 h-3.5" />
                  <span>{t('noCreditCard')}</span>
                </div>
              </div>

              {/* 3-Step Client-Side Execution Pipeline + Live Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/[0.03] border border-black/5 dark:border-white/5 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 font-mono font-bold text-sm">
                    01
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-0.5">
                      Local Memory
                    </div>
                    <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                      Drop Files in Browser
                    </h2>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                      Files are read directly into browser RAM via HTML5 FileReader &amp; ArrayBuffers.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/[0.03] border border-black/5 dark:border-white/5 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#d4ff33]/20 text-black dark:text-[#d4ff33] flex items-center justify-center shrink-0 font-mono font-bold text-sm">
                    02
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-0.5">
                      WASM &amp; Canvas
                    </div>
                    <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                      On-Device Processing
                    </h2>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                      Powered by PDF.js, pdf-lib, SheetJS, Mammoth &amp; FFmpeg WebAssembly.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/[0.03] border border-black/5 dark:border-white/5 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 font-mono font-bold text-sm">
                    03
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-0.5">
                      Zero Cloud Upload
                    </div>
                    <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                      Instant Direct Save
                    </h2>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                      Immediate browser download with zero queues, zero watermarks, and no account wall.
                    </p>
                  </div>
                </div>
              </div>

              {/* 4 Telemetry/Capability Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="px-4 py-3 rounded-xl bg-gray-50/70 dark:bg-black/30 border border-black/5 dark:border-white/5 text-center">
                  <div className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-[#d4ff33] font-mono">
                    0 Bytes
                  </div>
                  <div className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                    Uploaded to Servers
                  </div>
                </div>
                <div className="px-4 py-3 rounded-xl bg-gray-50/70 dark:bg-black/30 border border-black/5 dark:border-white/5 text-center">
                  <div className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white font-mono">
                    18 Tools
                  </div>
                  <div className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                    100% Client-Side Suite
                  </div>
                </div>
                <div className="px-4 py-3 rounded-xl bg-gray-50/70 dark:bg-black/30 border border-black/5 dark:border-white/5 text-center">
                  <div className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white font-mono">
                    ∞ Unlimited
                  </div>
                  <div className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                    No Daily Caps or Paywalls
                  </div>
                </div>
                <div className="px-4 py-3 rounded-xl bg-gray-50/70 dark:bg-black/30 border border-black/5 dark:border-white/5 text-center">
                  <div className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-[#d4ff33] font-mono">
                    Apache-2.0
                  </div>
                  <div className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                    Open-Source License
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Interactive Tools Explorer (All 18 Local Tools) ────────────────── */}
        <section id="tools-explorer" className="py-20 md:py-28 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-500 dark:text-[#d4ff33] mb-3">
                  <Layers className="w-3.5 h-3.5" />
                  <span>COMPLETE LOCAL TOOLKIT</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                  {t('powerfulTools')}{' '}
                  <span className="text-gray-900 dark:text-[#d4ff33] underline decoration-[#d4ff33] decoration-4 underline-offset-4">
                    {t('powerfulToolsAccent')}
                  </span>
                </h2>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md">
                Every utility below runs directly in your browser tab. Filter by category or search by file format (PDF, XLSX, CSV, DOCX, HEIC, SVG, MP4, GIF).
              </p>
            </div>

            <ToolsExplorer
              tools={allTools}
              labels={{
                all: tCommon('allTools'),
                pdf: t('pdfTools'),
                image: t('imageTools'),
                spreadsheet: tCommon('directorySpreadsheet'),
                media: t('mediaTools'),
                searchPlaceholder: 'Search tools or formats (e.g. PDF, Excel, HEIC, GIF)...',
                launchTool: 'Open Tool',
                noResults: 'No matching tools found for that query.',
                resetFilter: 'Show All 18 Tools',
                localEngine: 'Local Engine',
              }}
            />
          </div>
        </section>

        {/* ─── Why Local Browser Processing Wins (Bento Grid) ─────────────────── */}
        <section
          id="about"
          className="py-20 md:py-28 px-6 bg-white dark:bg-[#0d0f14] border-y border-black/[0.06] dark:border-white/[0.06]"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/5 dark:bg-white/[0.06] text-xs font-mono font-semibold text-gray-700 dark:text-[#d4ff33] mb-4">
                <Shield className="w-3.5 h-3.5" />
                <span>PRIVACY-FIRST ARCHITECTURE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 [text-wrap:balance]">
                {t('premiumQuality')}
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-400">
                Unlike traditional online converters that upload your private documents to remote cloud servers, Refinedocs executes every transformation locally on your hardware.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Bento Card 1: Privacy First (7 cols) */}
              <div className="md:col-span-7 rounded-3xl p-8 sm:p-10 bg-gray-50 dark:bg-[#131720] border border-black/10 dark:border-white/[0.08] flex flex-col justify-between relative overflow-hidden">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#d4ff33] text-black flex items-center justify-center mb-6 shadow-sm">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-extrabold mb-3 text-gray-900 dark:text-white">
                    {t('privacyFirst')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-xl">
                    {t('privacyFirstDesc')}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-black/[0.06] dark:border-white/[0.06]">
                  <div className="flex items-center gap-2.5 text-xs font-semibold text-gray-800 dark:text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-[#d4ff33] shrink-0" />
                    <span>Safe for NDAs, Tax &amp; Bank Statements</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs font-semibold text-gray-800 dark:text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-[#d4ff33] shrink-0" />
                    <span>Zero Telemetry or Tracking Cookies</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs font-semibold text-gray-800 dark:text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-[#d4ff33] shrink-0" />
                    <span>Works Offline Once Loaded</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs font-semibold text-gray-800 dark:text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-[#d4ff33] shrink-0" />
                    <span>Self-Hostable via Node or Docker</span>
                  </div>
                </div>
              </div>

              {/* Bento Card 2: Lightning Fast (5 cols) */}
              <div className="md:col-span-5 rounded-3xl p-8 sm:p-10 bg-gray-50 dark:bg-[#131720] border border-black/10 dark:border-white/[0.08] flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#d4ff33] text-black flex items-center justify-center mb-6 shadow-sm">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-extrabold mb-3 text-gray-900 dark:text-white">
                    {t('lightningFast')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                    {t('lightningFastDesc')}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-black/40 border border-black/5 dark:border-white/5 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-gray-900 dark:text-white">Refinedocs (Local WASM)</span>
                    <span className="font-mono font-bold text-emerald-600 dark:text-[#d4ff33]">~0.4s</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
                    <div className="w-[15%] h-full rounded-full bg-emerald-500 dark:bg-[#d4ff33]" />
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-gray-500">Cloud Upload + Queue + Download</span>
                    <span className="font-mono text-gray-400">~14.2s</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
                    <div className="w-[88%] h-full rounded-full bg-gray-400 dark:bg-gray-600" />
                  </div>
                </div>
              </div>

              {/* Bento Card 3: Unbeatable Value / No Paywalls (5 cols) */}
              <div className="md:col-span-5 rounded-3xl p-8 sm:p-10 bg-gray-50 dark:bg-[#131720] border border-black/10 dark:border-white/[0.08] flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#d4ff33] text-black flex items-center justify-center mb-6 shadow-sm">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-extrabold mb-3 text-gray-900 dark:text-white">
                    {t('unbeatableValue')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {t('unbeatableValueDesc')}
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between text-xs font-mono text-gray-500 dark:text-gray-400">
                  <span>DAILY LIMIT: UNLIMITED</span>
                  <span className="text-emerald-600 dark:text-[#d4ff33] font-bold">$0 / FOREVER</span>
                </div>
              </div>

              {/* Bento Card 4: Instant Offline Conversion (7 cols) */}
              <div className="md:col-span-7 rounded-3xl p-8 sm:p-10 bg-gray-50 dark:bg-[#131720] border border-black/10 dark:border-white/[0.08] flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#d4ff33] text-black flex items-center justify-center mb-6 shadow-sm">
                    <CloudDownload className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-extrabold mb-3 text-gray-900 dark:text-white">
                    {t('downloadTrial')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                    {t('downloadTrialDesc')}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-black/[0.06] dark:border-white/[0.06]">
                  {['pdf-lib', 'pdfjs-dist', '@ffmpeg/ffmpeg', 'SheetJS (xlsx)', 'Mammoth.js', 'docx', 'heic-to', 'HTML5 Canvas'].map(
                    (tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold bg-white dark:bg-black/40 text-gray-700 dark:text-gray-300 border border-black/5 dark:border-white/10"
                      >
                        <Code2 className="w-3 h-3 text-gray-400 dark:text-[#d4ff33]" />
                        {tech}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Built for Every Workflow (2x2 Modern Showcase) ─────────────────── */}
        <section id="solutions" className="py-20 md:py-28 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/5 dark:bg-white/[0.06] text-xs font-mono font-semibold text-gray-700 dark:text-[#d4ff33] mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>BUILT FOR EVERY WORKFLOW</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                {t('builtForEveryNeed')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* For Businesses */}
              <div className="rounded-3xl p-8 bg-white dark:bg-[#12151c] border border-black/10 dark:border-white/[0.08] flex flex-col sm:flex-row items-center gap-8 hover:border-black/20 dark:hover:border-white/20 transition-all">
                <div className="flex-1 space-y-4">
                  <span className="inline-block px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold uppercase bg-emerald-500/10 text-emerald-600 dark:text-[#d4ff33]">
                    Operations &amp; Legal
                  </span>
                  <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                    {t('forBusinesses')}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {t('forBusinessesDesc')}
                  </p>
                  <div className="pt-2 flex flex-wrap gap-3">
                    <Link
                      href="/tools/pdf-to-excel"
                      className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-black text-white dark:bg-[#d4ff33] dark:text-black hover:opacity-90 transition-opacity"
                    >
                      <span>{tTools('pdf-to-excel')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href="/tools/watermark"
                      className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-gray-100 dark:bg-white/[0.06] text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                    >
                      <span>{tTools('watermark')}</span>
                    </Link>
                  </div>
                </div>
                <div className="w-40 h-40 sm:w-44 sm:h-44 relative shrink-0 bg-gray-50 dark:bg-white/[0.03] rounded-2xl p-3 border border-black/5 dark:border-white/5">
                  <Image
                    src="/Business.svg"
                    alt={tCommon('alt.forBusinesses')}
                    width={200}
                    height={200}
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>

              {/* For Accountants */}
              <div className="rounded-3xl p-8 bg-white dark:bg-[#12151c] border border-black/10 dark:border-white/[0.08] flex flex-col sm:flex-row items-center gap-8 hover:border-black/20 dark:hover:border-white/20 transition-all">
                <div className="flex-1 space-y-4">
                  <span className="inline-block px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold uppercase bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    Finance &amp; Audit
                  </span>
                  <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                    {t('forAccountants')}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {t('forAccountantsDesc')}
                  </p>
                  <div className="pt-2 flex flex-wrap gap-3">
                    <Link
                      href="/tools/excel-to-csv"
                      className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-black text-white dark:bg-[#d4ff33] dark:text-black hover:opacity-90 transition-opacity"
                    >
                      <span>{tTools('excel-to-csv')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href="/tools/pdf-to-csv"
                      className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-gray-100 dark:bg-white/[0.06] text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                    >
                      <span>{tTools('pdf-to-csv')}</span>
                    </Link>
                  </div>
                </div>
                <div className="w-40 h-40 sm:w-44 sm:h-44 relative shrink-0 bg-gray-50 dark:bg-white/[0.03] rounded-2xl p-3 border border-black/5 dark:border-white/5">
                  <Image
                    src="/Accountant.svg"
                    alt={tCommon('alt.forAccountants')}
                    width={200}
                    height={200}
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>

              {/* For Students */}
              <div className="rounded-3xl p-8 bg-white dark:bg-[#12151c] border border-black/10 dark:border-white/[0.08] flex flex-col sm:flex-row items-center gap-8 hover:border-black/20 dark:hover:border-white/20 transition-all">
                <div className="flex-1 space-y-4">
                  <span className="inline-block px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold uppercase bg-purple-500/10 text-purple-600 dark:text-purple-400">
                    Academic &amp; Research
                  </span>
                  <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                    {t('forStudents')}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {t('forStudentsDesc')}
                  </p>
                  <div className="pt-2 flex flex-wrap gap-3">
                    <Link
                      href="/tools/pdf-to-word"
                      className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-black text-white dark:bg-[#d4ff33] dark:text-black hover:opacity-90 transition-opacity"
                    >
                      <span>{tTools('pdf-to-word')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href="/tools/compress-pdf"
                      className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-gray-100 dark:bg-white/[0.06] text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                    >
                      <span>{tTools('compress-pdf')}</span>
                    </Link>
                  </div>
                </div>
                <div className="w-40 h-40 sm:w-44 sm:h-44 relative shrink-0 bg-gray-50 dark:bg-white/[0.03] rounded-2xl p-3 border border-black/5 dark:border-white/5">
                  <Image
                    src="/Student.svg"
                    alt={tCommon('alt.forStudents')}
                    width={200}
                    height={200}
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>

              {/* For Designers */}
              <div className="rounded-3xl p-8 bg-white dark:bg-[#12151c] border border-black/10 dark:border-white/[0.08] flex flex-col sm:flex-row items-center gap-8 hover:border-black/20 dark:hover:border-white/20 transition-all">
                <div className="flex-1 space-y-4">
                  <span className="inline-block px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold uppercase bg-pink-500/10 text-pink-600 dark:text-pink-400">
                    Creative &amp; Media
                  </span>
                  <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                    {t('forDesigners')}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {t('forDesignersDesc')}
                  </p>
                  <div className="pt-2 flex flex-wrap gap-3">
                    <Link
                      href="/tools/compress-images"
                      className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-black text-white dark:bg-[#d4ff33] dark:text-black hover:opacity-90 transition-opacity"
                    >
                      <span>{tTools('compress-images')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href="/tools/svg-to-png"
                      className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-gray-100 dark:bg-white/[0.06] text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                    >
                      <span>{tTools('svg-to-png')}</span>
                    </Link>
                  </div>
                </div>
                <div className="w-40 h-40 sm:w-44 sm:h-44 relative shrink-0 bg-gray-50 dark:bg-white/[0.03] rounded-2xl p-3 border border-black/5 dark:border-white/5">
                  <Image
                    src="/design.svg"
                    alt={tCommon('alt.forDesigners')}
                    width={200}
                    height={200}
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Final CTA Section ──────────────────────────────────────────────── */}
        <section id="cta" className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl p-8 sm:p-12 md:p-16 bg-gray-900 dark:bg-[#141821] text-white border border-black/10 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -bottom-20 w-80 h-80 bg-[#d4ff33]/20 rounded-full blur-[100px]"
              />
              <div className="flex-1 max-w-xl relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#d4ff33] text-xs font-mono font-semibold mb-4">
                  <HardDrive className="w-3.5 h-3.5" />
                  <span>{t('unlimitedAccessNote')}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight [text-wrap:balance]">
                  {t('readyToTransform')}
                </h2>
                <p className="text-gray-300 mb-8 text-base leading-relaxed">
                  {t('readyToTransformDesc')}
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <Link
                    href="/tools/pdf-to-excel"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#d4ff33] text-black font-extrabold rounded-xl hover:bg-[#bce622] transition-colors text-sm"
                  >
                    <span>{t('startConverting')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href="#tools-explorer"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm transition-colors"
                  >
                    {tCommon('allTools')}
                  </a>
                </div>
              </div>
              <div className="flex-shrink-0 relative z-10">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 bg-white/5 rounded-3xl p-4 border border-white/10">
                  <Image
                    src="/Happy.svg"
                    alt={tCommon('alt.globeIllustration')}
                    width={224}
                    height={224}
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <ToolsDirectory />
        <Footer />
      </main>
    </div>
  );
}
