'use client';

import React, { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, Link } from '../../navigation';
import {
  Search,
  X,
  ShieldCheck,
  FileText,
  Image as ImageIcon,
  FileSpreadsheet,
  FileVideo,
} from 'lucide-react';
import { allToolsCatalog } from '../../lib/sidebarData';

interface MainSidebarProps {
  activeTool?: string;
  onToolSelect?: (toolId: string) => void;
}

const SIDEBAR_GROUPS: {
  key: 'pdf' | 'image' | 'spreadsheet' | 'media';
  label: string;
  icon: React.ElementType;
}[] = [
  { key: 'pdf', label: 'PDF & Documents', icon: FileText },
  { key: 'image', label: 'Image Studio', icon: ImageIcon },
  { key: 'spreadsheet', label: 'Spreadsheets & CSV', icon: FileSpreadsheet },
  { key: 'media', label: 'Video & GIF', icon: FileVideo },
];

export default function MainSidebar({ activeTool, onToolSelect }: MainSidebarProps) {
  const tt = useTranslations('Tools');
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleToolSelect = (toolId: string) => {
    if (onToolSelect) {
      onToolSelect(toolId);
    } else {
      router.push(`/tools/${toolId}`);
    }
  };

  const filteredCatalog = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return allToolsCatalog;
    return allToolsCatalog.filter((tool) => {
      const translatedName = tt(tool.nameKey.split('.')[1]).toLowerCase();
      return (
        translatedName.includes(q) ||
        tool.id.toLowerCase().includes(q) ||
        tool.badge.toLowerCase().includes(q) ||
        tool.engine.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, tt]);

  return (
    <aside className="w-72 h-full border-r border-black/10 dark:border-white/[0.08] flex flex-col shrink-0 bg-[#f8f9fb] dark:bg-[#0b0d12] transition-colors select-none">
      {/* Brand Header */}
      <div className="h-16 px-5 border-b border-black/10 dark:border-white/[0.08] flex items-center justify-between shrink-0">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-[#d4ff33] rounded-xl flex items-center justify-center text-black font-black text-base shadow-sm border border-black/10 group-hover:scale-105 transition-transform">
            R
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-900 dark:text-white font-extrabold text-base tracking-tight">
              Refinedocs
            </span>
            <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider rounded bg-black/5 dark:bg-white/10 text-gray-600 dark:text-[#d4ff33] border border-black/10 dark:border-white/10">
              LOCAL
            </span>
          </div>
        </Link>
      </div>

      {/* Quick Filter Input */}
      <div className="p-3.5 border-b border-black/5 dark:border-white/[0.06] shrink-0">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Quick find tool or format..."
            aria-label="Quick find tool or format"
            className="w-full pl-8 pr-7 py-2 rounded-xl bg-white dark:bg-[#12151e] border border-black/10 dark:border-white/10 text-xs text-black dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-black dark:focus:border-[#d4ff33] transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Clear filter"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 text-gray-400 hover:text-black dark:hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Categorized Tool Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-hide">
        {SIDEBAR_GROUPS.map((group) => {
          const groupTools = filteredCatalog.filter((t) => t.category === group.key);
          if (groupTools.length === 0) return null;
          const GroupIcon = group.icon;

          return (
            <div key={group.key}>
              <div className="px-2.5 mb-2 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                  <GroupIcon className="w-3 h-3" />
                  {group.label}
                </span>
                <span className="text-[10px] font-mono text-gray-400 dark:text-gray-600">
                  {groupTools.length}
                </span>
              </div>

              <div className="space-y-1">
                {groupTools.map((tool) => {
                  const isActive = activeTool === tool.id;
                  const IconComp = tool.icon;

                  return (
                    <button
                      key={tool.id}
                      type="button"
                      onClick={() => handleToolSelect(tool.id)}
                      className={`w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-xl text-left transition-all duration-150 group ${
                        isActive
                          ? 'bg-black text-white dark:bg-[#d4ff33] dark:text-black shadow-sm font-bold'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/[0.06] hover:text-black dark:hover:text-white font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                            isActive
                              ? 'bg-white/15 text-[#d4ff33] dark:bg-black/15 dark:text-black'
                              : `${tool.bg} ${tool.color}`
                          }`}
                        >
                          <IconComp className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs truncate">{tt(tool.nameKey.split('.')[1])}</span>
                      </div>

                      <span
                        className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold shrink-0 ${
                          isActive
                            ? 'bg-white/15 text-white dark:bg-black/15 dark:text-black'
                            : 'bg-black/[0.04] dark:bg-white/[0.05] text-gray-500 dark:text-gray-400'
                        }`}
                      >
                        {tool.badge}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {filteredCatalog.length === 0 && (
          <div className="text-center py-8 px-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">No matching tools</p>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-xs font-bold text-black dark:text-[#d4ff33] underline"
            >
              Reset filter
            </button>
          </div>
        )}
      </nav>

      {/* Bottom Privacy Status Footer */}
      <div className="p-3.5 border-t border-black/10 dark:border-white/[0.08] bg-white/60 dark:bg-white/[0.02] shrink-0">
        <div className="flex items-center gap-2.5 px-2 py-1.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-[#d4ff33] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-bold text-gray-900 dark:text-white leading-tight truncate">
              100% Local Sandbox
            </p>
            <p className="text-[10px] font-mono text-gray-500 dark:text-gray-400 truncate">
              0 Bytes Uploaded • Offline Ready
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
