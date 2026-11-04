'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from '../../navigation';
import {
  FileSpreadsheet,
  FileText,
  FileCode,
  Minimize,
  Image as ImageIcon,
  RefreshCw,
  Maximize,
  Droplets,
  FileVideo,
  Video,
  Search,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  X,
  Cpu,
  LayoutGrid,
  Layers,
  ShieldCheck,
} from 'lucide-react';

export interface ToolItem {
  id: string;
  name: string;
  description: string;
  category: 'pdf' | 'image' | 'spreadsheet' | 'media';
  engine: string;
  badge: string;
  featured?: boolean;
}

interface ToolsExplorerProps {
  tools: ToolItem[];
  labels: {
    all: string;
    pdf: string;
    image: string;
    spreadsheet: string;
    media: string;
    searchPlaceholder: string;
    launchTool: string;
    noResults: string;
    resetFilter: string;
    localEngine: string;
  };
}

const TOOL_ICONS: Record<
  string,
  {
    icon: React.ElementType;
    accent: string;
    bg: string;
    ring: string;
    border: string;
    glow: string;
  }
> = {
  'compress-pdf': {
    icon: Minimize,
    accent: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-500/10 dark:bg-rose-500/15',
    ring: 'ring-rose-500/20',
    border: 'hover:border-rose-500/40 dark:hover:border-rose-400/40',
    glow: 'from-rose-500/10 via-transparent to-transparent',
  },
  'pdf-to-excel': {
    icon: FileSpreadsheet,
    accent: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
    ring: 'ring-emerald-500/20',
    border: 'hover:border-emerald-500/40 dark:hover:border-emerald-400/40',
    glow: 'from-emerald-500/10 via-transparent to-transparent',
  },
  'pdf-to-word': {
    icon: FileText,
    accent: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-500/10 dark:bg-blue-500/15',
    ring: 'ring-blue-500/20',
    border: 'hover:border-blue-500/40 dark:hover:border-blue-400/40',
    glow: 'from-blue-500/10 via-transparent to-transparent',
  },
  'word-to-pdf': {
    icon: FileText,
    accent: 'text-indigo-600 dark:text-indigo-400',
    bg: 'bg-indigo-500/10 dark:bg-indigo-500/15',
    ring: 'ring-indigo-500/20',
    border: 'hover:border-indigo-500/40 dark:hover:border-indigo-400/40',
    glow: 'from-indigo-500/10 via-transparent to-transparent',
  },
  'pdf-to-csv': {
    icon: FileCode,
    accent: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-500/10 dark:bg-amber-500/15',
    ring: 'ring-amber-500/20',
    border: 'hover:border-amber-500/40 dark:hover:border-amber-400/40',
    glow: 'from-amber-500/10 via-transparent to-transparent',
  },
  'csv-to-pdf': {
    icon: FileCode,
    accent: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-500/10 dark:bg-orange-500/15',
    ring: 'ring-orange-500/20',
    border: 'hover:border-orange-500/40 dark:hover:border-orange-400/40',
    glow: 'from-orange-500/10 via-transparent to-transparent',
  },
  'excel-to-pdf': {
    icon: FileSpreadsheet,
    accent: 'text-teal-600 dark:text-teal-400',
    bg: 'bg-teal-500/10 dark:bg-teal-500/15',
    ring: 'ring-teal-500/20',
    border: 'hover:border-teal-500/40 dark:hover:border-teal-400/40',
    glow: 'from-teal-500/10 via-transparent to-transparent',
  },
  'pdf-to-image': {
    icon: ImageIcon,
    accent: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-500/10 dark:bg-purple-500/15',
    ring: 'ring-purple-500/20',
    border: 'hover:border-purple-500/40 dark:hover:border-purple-400/40',
    glow: 'from-purple-500/10 via-transparent to-transparent',
  },
  'compress-images': {
    icon: Minimize,
    accent: 'text-lime-700 dark:text-[#d4ff33]',
    bg: 'bg-[#d4ff33]/20 dark:bg-[#d4ff33]/15',
    ring: 'ring-[#d4ff33]/30',
    border: 'hover:border-lime-500/50 dark:hover:border-[#d4ff33]/50',
    glow: 'from-[#d4ff33]/15 via-transparent to-transparent',
  },
  'image-converter': {
    icon: RefreshCw,
    accent: 'text-cyan-600 dark:text-cyan-400',
    bg: 'bg-cyan-500/10 dark:bg-cyan-500/15',
    ring: 'ring-cyan-500/20',
    border: 'hover:border-cyan-500/40 dark:hover:border-cyan-400/40',
    glow: 'from-cyan-500/10 via-transparent to-transparent',
  },
  resize: {
    icon: Maximize,
    accent: 'text-sky-600 dark:text-sky-400',
    bg: 'bg-sky-500/10 dark:bg-sky-500/15',
    ring: 'ring-sky-500/20',
    border: 'hover:border-sky-500/40 dark:hover:border-sky-400/40',
    glow: 'from-sky-500/10 via-transparent to-transparent',
  },
  'heic-to-png': {
    icon: ImageIcon,
    accent: 'text-fuchsia-600 dark:text-fuchsia-400',
    bg: 'bg-fuchsia-500/10 dark:bg-fuchsia-500/15',
    ring: 'ring-fuchsia-500/20',
    border: 'hover:border-fuchsia-500/40 dark:hover:border-fuchsia-400/40',
    glow: 'from-fuchsia-500/10 via-transparent to-transparent',
  },
  'svg-to-png': {
    icon: FileCode,
    accent: 'text-yellow-600 dark:text-yellow-400',
    bg: 'bg-yellow-500/10 dark:bg-yellow-500/15',
    ring: 'ring-yellow-500/20',
    border: 'hover:border-yellow-500/40 dark:hover:border-yellow-400/40',
    glow: 'from-yellow-500/10 via-transparent to-transparent',
  },
  watermark: {
    icon: Droplets,
    accent: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-500/10 dark:bg-blue-500/15',
    ring: 'ring-blue-500/20',
    border: 'hover:border-blue-500/40 dark:hover:border-blue-400/40',
    glow: 'from-blue-500/10 via-transparent to-transparent',
  },
  'excel-to-csv': {
    icon: FileSpreadsheet,
    accent: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
    ring: 'ring-emerald-500/20',
    border: 'hover:border-emerald-500/40 dark:hover:border-emerald-400/40',
    glow: 'from-emerald-500/10 via-transparent to-transparent',
  },
  'csv-to-excel': {
    icon: FileSpreadsheet,
    accent: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-500/10 dark:bg-green-500/15',
    ring: 'ring-green-500/20',
    border: 'hover:border-green-500/40 dark:hover:border-green-400/40',
    glow: 'from-green-500/10 via-transparent to-transparent',
  },
  'compress-video': {
    icon: Video,
    accent: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-500/10 dark:bg-violet-500/15',
    ring: 'ring-violet-500/20',
    border: 'hover:border-violet-500/40 dark:hover:border-violet-400/40',
    glow: 'from-violet-500/10 via-transparent to-transparent',
  },
  'video-to-gif': {
    icon: FileVideo,
    accent: 'text-pink-600 dark:text-pink-400',
    bg: 'bg-pink-500/10 dark:bg-pink-500/15',
    ring: 'ring-pink-500/20',
    border: 'hover:border-pink-500/40 dark:hover:border-pink-400/40',
    glow: 'from-pink-500/10 via-transparent to-transparent',
  },
};

const FORMAT_CHIPS = [
  { id: 'all', label: 'All Formats' },
  { id: 'pdf', label: '.PDF' },
  { id: 'xlsx', label: '.XLSX' },
  { id: 'csv', label: '.CSV' },
  { id: 'docx', label: '.DOCX' },
  { id: 'png', label: '.PNG / .JPG' },
  { id: 'heic', label: '.HEIC' },
  { id: 'svg', label: '.SVG' },
  { id: 'mp4', label: '.MP4 / .GIF' },
];

function parseBadgeParts(badge: string): { from: string; to?: string } {
  if (badge.includes('→')) {
    const [from, to] = badge.split('→').map((s) => s.trim());
    return { from, to };
  }
  return { from: badge.trim() };
}

export default function ToolsExplorer({ tools, labels }: ToolsExplorerProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'pdf' | 'image' | 'spreadsheet' | 'media'>('all');
  const [activeFormat, setActiveFormat] = useState<string>('all');
  const [query, setQuery] = useState('');
  const [groupedView, setGroupedView] = useState(true);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut "/" to focus search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const categories = useMemo(
    () => [
      { id: 'all' as const, label: labels.all, icon: LayoutGrid, count: tools.length },
      { id: 'pdf' as const, label: labels.pdf, icon: FileText, count: tools.filter((t) => t.category === 'pdf').length },
      {
        id: 'image' as const,
        label: labels.image,
        icon: ImageIcon,
        count: tools.filter((t) => t.category === 'image').length,
      },
      {
        id: 'spreadsheet' as const,
        label: labels.spreadsheet,
        icon: FileSpreadsheet,
        count: tools.filter((t) => t.category === 'spreadsheet').length,
      },
      {
        id: 'media' as const,
        label: labels.media,
        icon: FileVideo,
        count: tools.filter((t) => t.category === 'media').length,
      },
    ],
    [tools, labels]
  );

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesCat = activeCategory === 'all' || tool.category === activeCategory;
      const matchesFormat =
        activeFormat === 'all' ||
        tool.badge.toLowerCase().includes(activeFormat) ||
        tool.id.toLowerCase().includes(activeFormat) ||
        (activeFormat === 'xlsx' && tool.id.includes('excel')) ||
        (activeFormat === 'docx' && tool.id.includes('word')) ||
        (activeFormat === 'png' && (tool.category === 'image' || tool.id === 'pdf-to-image')) ||
        (activeFormat === 'mp4' && tool.category === 'media');

      const q = query.trim().toLowerCase();
      if (!q) return matchesCat && matchesFormat;
      return (
        matchesCat &&
        matchesFormat &&
        (tool.name.toLowerCase().includes(q) ||
          tool.description.toLowerCase().includes(q) ||
          tool.badge.toLowerCase().includes(q) ||
          tool.engine.toLowerCase().includes(q) ||
          tool.id.toLowerCase().includes(q))
      );
    });
  }, [tools, activeCategory, activeFormat, query]);

  const showGroupedSections =
    groupedView && activeCategory === 'all' && activeFormat === 'all' && query.trim() === '';

  const renderToolCard = (tool: ToolItem) => {
    const style = TOOL_ICONS[tool.id] || TOOL_ICONS['compress-pdf'];
    const IconComponent = style.icon;
    const badgeParts = parseBadgeParts(tool.badge);

    return (
      <Link
        key={tool.id}
        href={`/tools/${tool.id}`}
        className={`group relative rounded-3xl p-6 bg-white dark:bg-[#11141c] border border-black/10 dark:border-white/[0.08] ${style.border} hover:shadow-2xl hover:shadow-black/[0.06] dark:hover:shadow-black/50 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between overflow-hidden`}
      >
        {/* Subtle Radial Accent Glow on Hover */}
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${style.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        />

        <div className="relative z-10">
          {/* Top Row: Icon + Visual Input -> Output Format Pill */}
          <div className="flex items-start justify-between gap-3 mb-5">
            <div
              className={`w-12 h-12 rounded-2xl ${style.bg} ${style.accent} ring-1 ${style.ring} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200`}
            >
              <IconComponent className="w-6 h-6" />
            </div>

            <div className="flex flex-wrap items-center justify-end gap-1.5">
              {tool.featured && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#d4ff33]/25 text-black dark:text-[#d4ff33] border border-[#d4ff33]/40">
                  <Sparkles className="w-2.5 h-2.5" /> Popular
                </span>
              )}

              {/* Visual Format Transformation Chip */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-gray-100/90 dark:bg-white/[0.06] border border-black/5 dark:border-white/10 text-[11px] font-mono font-bold">
                <span className="text-gray-700 dark:text-gray-300">{badgeParts.from}</span>
                {badgeParts.to && (
                  <>
                    <ArrowRight className="w-3 h-3 text-gray-400 dark:text-[#d4ff33]" />
                    <span className="px-1.5 py-0.2 rounded bg-white dark:bg-black/40 text-black dark:text-[#d4ff33] border border-black/5 dark:border-white/10">
                      {badgeParts.to}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Tool Name & Description */}
          <h3 className="text-lg font-extrabold text-gray-900 dark:text-white group-hover:text-black dark:group-hover:text-[#d4ff33] transition-colors mb-2 flex items-center justify-between gap-2 tracking-tight">
            <span>{tool.name}</span>
            <span className="w-7 h-7 rounded-full bg-gray-100 dark:bg-white/[0.06] group-hover:bg-[#d4ff33] text-gray-500 dark:text-gray-400 group-hover:text-black flex items-center justify-center transition-all shrink-0">
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2 mb-6">
            {tool.description}
          </p>
        </div>

        {/* Bottom Action & Engine Strip */}
        <div className="relative z-10 pt-4 border-t border-gray-100 dark:border-white/[0.06] flex items-center justify-between gap-2 text-xs">
          <div className="inline-flex items-center gap-1.5 text-gray-500 dark:text-gray-400 font-mono text-[11px] truncate">
            <Cpu className="w-3.5 h-3.5 text-gray-400 dark:text-[#d4ff33]/80 shrink-0" />
            <span className="truncate">{tool.engine}</span>
          </div>

          <span className="inline-flex items-center gap-1 font-bold text-gray-900 dark:text-white group-hover:text-black dark:group-hover:text-[#d4ff33] transition-colors shrink-0">
            {labels.launchTool}
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </Link>
    );
  };

  return (
    <div className="space-y-6">
      {/* Unified Command Bar: Categories + Search + View Toggle */}
      <div className="rounded-3xl bg-white dark:bg-[#11141c] border border-black/10 dark:border-white/10 p-3 sm:p-4 shadow-lg shadow-black/[0.03] dark:shadow-black/30 space-y-3.5">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Category Tabs with Icons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-hide">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              const CatIcon = cat.icon;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-2.5 rounded-2xl text-xs font-bold tracking-wide transition-all whitespace-nowrap flex items-center gap-2 ${
                    isActive
                      ? 'bg-black text-white dark:bg-[#d4ff33] dark:text-black shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/[0.06]'
                  }`}
                >
                  <CatIcon className="w-3.5 h-3.5 shrink-0" />
                  <span>{cat.label}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono tabular-nums ${
                      isActive
                        ? 'bg-white/20 text-white dark:bg-black/15 dark:text-black'
                        : 'bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input + View Switcher */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 min-w-[220px] sm:min-w-[280px]">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={labels.searchPlaceholder}
                aria-label={labels.searchPlaceholder}
                className="w-full pl-10 pr-12 py-2.5 rounded-2xl bg-gray-50 dark:bg-[#0a0c10] border border-black/10 dark:border-white/10 text-sm text-black dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-black dark:focus:border-[#d4ff33] transition-colors"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-lg text-gray-400 hover:text-black dark:hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : (
                <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-semibold text-gray-400 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-md absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  /
                </kbd>
              )}
            </div>

            {activeCategory === 'all' && activeFormat === 'all' && !query && (
              <button
                type="button"
                onClick={() => setGroupedView(!groupedView)}
                title={groupedView ? 'Switch to Flat Grid' : 'Switch to Categorized Sections'}
                className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-2.5 rounded-2xl text-xs font-bold border transition-colors ${
                  groupedView
                    ? 'bg-gray-100 dark:bg-white/10 text-black dark:text-white border-black/10 dark:border-white/15'
                    : 'bg-transparent text-gray-500 dark:text-gray-400 border-black/10 dark:border-white/10 hover:text-black dark:hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Grouped</span>
              </button>
            )}
          </div>
        </div>

        {/* File Format Quick-Filter Strip */}
        <div className="pt-2.5 border-t border-gray-100 dark:border-white/[0.06] flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide py-0.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400 dark:text-gray-500 mr-1 shrink-0">
              Format:
            </span>
            {FORMAT_CHIPS.map((chip) => {
              const isChipActive = activeFormat === chip.id;
              return (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => setActiveFormat(chip.id === activeFormat && chip.id !== 'all' ? 'all' : chip.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all whitespace-nowrap ${
                    isChipActive
                      ? 'bg-[#d4ff33] text-black shadow-xs'
                      : 'bg-gray-100/80 dark:bg-white/[0.04] text-gray-600 dark:text-gray-400 hover:bg-gray-200/70 dark:hover:bg-white/10 hover:text-black dark:hover:text-white'
                  }`}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-gray-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 dark:text-[#d4ff33]" />
            <span>Showing {filteredTools.length} of {tools.length} local tools</span>
          </div>
        </div>
      </div>

      {/* Tools Output: Empty State / Grouped by Category / Filtered Flat Grid */}
      {filteredTools.length === 0 ? (
        <div className="text-center py-16 px-6 rounded-3xl border border-dashed border-black/15 dark:border-white/15 bg-white/50 dark:bg-white/[0.02]">
          <p className="text-gray-600 dark:text-gray-400 mb-4 font-medium">{labels.noResults}</p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory('all');
              setActiveFormat('all');
              setQuery('');
            }}
            className="px-5 py-2.5 rounded-xl bg-[#d4ff33] text-black text-xs font-bold hover:bg-[#bce622] transition-colors"
          >
            {labels.resetFilter}
          </button>
        </div>
      ) : showGroupedSections ? (
        <div className="space-y-12 pt-2">
          {[
            {
              key: 'pdf' as const,
              title: labels.pdf,
              subtitle: 'Extract tables, compress documents, and convert between PDF, Word, Excel, CSV, and Images.',
              icon: FileText,
              badgeColor: 'text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20',
            },
            {
              key: 'image' as const,
              title: labels.image,
              subtitle: 'Compress, resize, watermark, and transcode HEIC, SVG, WebP, PNG, and JPG assets locally.',
              icon: ImageIcon,
              badgeColor: 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
            },
            {
              key: 'spreadsheet' as const,
              title: labels.spreadsheet,
              subtitle: 'Instant client-side workbook conversion between Excel (.xlsx) and CSV datasets.',
              icon: FileSpreadsheet,
              badgeColor: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
            },
            {
              key: 'media' as const,
              title: labels.media,
              subtitle: 'Powered by FFmpeg WebAssembly for local video compression and animated GIF creation.',
              icon: FileVideo,
              badgeColor: 'text-violet-600 dark:text-violet-400 bg-violet-500/10 border-violet-500/20',
            },
          ].map((section) => {
            const sectionTools = filteredTools.filter((t) => t.category === section.key);
            const SectionIcon = section.icon;
            return (
              <div key={section.key} className="space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-black/10 dark:border-white/10">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl border flex items-center justify-center ${section.badgeColor}`}
                    >
                      <SectionIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-extrabold text-gray-900 dark:text-white tracking-tight">
                          {section.title}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-gray-200/70 dark:bg-white/10 text-gray-700 dark:text-gray-300">
                          {sectionTools.length}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{section.subtitle}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveCategory(section.key)}
                    className="self-start sm:self-auto text-xs font-bold text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-[#d4ff33] inline-flex items-center gap-1 transition-colors"
                  >
                    Filter {section.title} <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {sectionTools.map(renderToolCard)}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
          {filteredTools.map(renderToolCard)}
        </div>
      )}
    </div>
  );
}
