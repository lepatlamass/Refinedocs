import React from 'react';
import {
  FileText,
  Image as ImageIcon,
  Maximize,
  Minimize,
  RefreshCw,
  FileSpreadsheet,
  FileCode,
  FileVideo,
  Video,
  Droplets,
} from 'lucide-react';

export interface ToolCatalogItem {
  id: string;
  nameKey: string;
  category: 'pdf' | 'image' | 'spreadsheet' | 'media';
  badge: string;
  engine: string;
  icon: React.ElementType;
  color: string;
  bg: string;
}

export const allToolsCatalog: ToolCatalogItem[] = [
  // PDF & Document Suite (8)
  {
    id: 'pdf-to-excel',
    nameKey: 'Tools.pdf-to-excel',
    category: 'pdf',
    badge: 'PDF → XLSX',
    engine: 'PDF.js + SheetJS',
    icon: FileSpreadsheet,
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
  {
    id: 'compress-pdf',
    nameKey: 'Tools.compress-pdf',
    category: 'pdf',
    badge: 'PDF',
    engine: 'pdf-lib',
    icon: Minimize,
    color: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-500/10',
  },
  {
    id: 'pdf-to-word',
    nameKey: 'Tools.pdf-to-word',
    category: 'pdf',
    badge: 'PDF → DOCX',
    engine: 'PDF.js + docx',
    icon: FileText,
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    id: 'word-to-pdf',
    nameKey: 'Tools.word-to-pdf',
    category: 'pdf',
    badge: 'DOCX → PDF',
    engine: 'Mammoth + pdf-lib',
    icon: FileText,
    color: 'text-indigo-600 dark:text-indigo-400',
    bg: 'bg-indigo-500/10',
  },
  {
    id: 'pdf-to-image',
    nameKey: 'Tools.pdf-to-image',
    category: 'pdf',
    badge: 'PDF → PNG',
    engine: 'PDF.js Canvas',
    icon: ImageIcon,
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-500/10',
  },
  {
    id: 'pdf-to-csv',
    nameKey: 'Tools.pdf-to-csv',
    category: 'pdf',
    badge: 'PDF → CSV',
    engine: 'PDF.js Parser',
    icon: FileCode,
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-500/10',
  },
  {
    id: 'excel-to-pdf',
    nameKey: 'Tools.excel-to-pdf',
    category: 'pdf',
    badge: 'XLSX → PDF',
    engine: 'SheetJS + pdf-lib',
    icon: FileSpreadsheet,
    color: 'text-teal-600 dark:text-teal-400',
    bg: 'bg-teal-500/10',
  },
  {
    id: 'csv-to-pdf',
    nameKey: 'Tools.csv-to-pdf',
    category: 'pdf',
    badge: 'CSV → PDF',
    engine: 'pdf-lib',
    icon: FileCode,
    color: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-500/10',
  },

  // Image Studio (6)
  {
    id: 'compress-images',
    nameKey: 'Tools.compress-images',
    category: 'image',
    badge: 'PNG / JPG / WebP',
    engine: 'HTML5 Canvas',
    icon: Minimize,
    color: 'text-lime-600 dark:text-[#d4ff33]',
    bg: 'bg-[#d4ff33]/15',
  },
  {
    id: 'image-converter',
    nameKey: 'Tools.image-converter',
    category: 'image',
    badge: 'PNG ⇄ WebP ⇄ JPG',
    engine: 'HTML5 Canvas',
    icon: RefreshCw,
    color: 'text-cyan-600 dark:text-cyan-400',
    bg: 'bg-cyan-500/10',
  },
  {
    id: 'resize',
    nameKey: 'Tools.resize',
    category: 'image',
    badge: 'PX / %',
    engine: 'HTML5 Canvas',
    icon: Maximize,
    color: 'text-sky-600 dark:text-sky-400',
    bg: 'bg-sky-500/10',
  },
  {
    id: 'heic-to-png',
    nameKey: 'Tools.heic-to-png',
    category: 'image',
    badge: 'HEIC → PNG',
    engine: 'heic-to WASM',
    icon: ImageIcon,
    color: 'text-fuchsia-600 dark:text-fuchsia-400',
    bg: 'bg-fuchsia-500/10',
  },
  {
    id: 'svg-to-png',
    nameKey: 'Tools.svg-to-png',
    category: 'image',
    badge: 'SVG → PNG',
    engine: 'SVG DOM + Canvas',
    icon: FileCode,
    color: 'text-yellow-600 dark:text-yellow-400',
    bg: 'bg-yellow-500/10',
  },
  {
    id: 'watermark',
    nameKey: 'Tools.watermark',
    category: 'image',
    badge: 'PDF & Image',
    engine: 'Canvas + pdf-lib',
    icon: Droplets,
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-500/10',
  },

  // Spreadsheets & Data (2)
  {
    id: 'excel-to-csv',
    nameKey: 'Tools.excel-to-csv',
    category: 'spreadsheet',
    badge: 'XLSX → CSV',
    engine: 'SheetJS',
    icon: FileSpreadsheet,
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
  {
    id: 'csv-to-excel',
    nameKey: 'Tools.csv-to-excel',
    category: 'spreadsheet',
    badge: 'CSV → XLSX',
    engine: 'SheetJS',
    icon: FileSpreadsheet,
    color: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-500/10',
  },

  // Video & Media (2)
  {
    id: 'compress-video',
    nameKey: 'Tools.compress-video',
    category: 'media',
    badge: 'MP4 / WebM',
    engine: 'FFmpeg WASM',
    icon: Video,
    color: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-500/10',
  },
  {
    id: 'video-to-gif',
    nameKey: 'Tools.video-to-gif',
    category: 'media',
    badge: 'MP4 → GIF',
    engine: 'FFmpeg WASM',
    icon: FileVideo,
    color: 'text-pink-600 dark:text-pink-400',
    bg: 'bg-pink-500/10',
  },
];

export const sidebarTools = [
  { id: 'watermark', nameKey: 'Tools.watermark', icon: Droplets, color: 'text-blue-400', hover: 'hover:bg-blue-400/10' },
  { id: 'resize', nameKey: 'Tools.resize', icon: Maximize, color: 'text-cyan-400', hover: 'hover:bg-cyan-400/10' },
  {
    id: 'compress',
    nameKey: 'Tools.compress',
    icon: Minimize,
    color: 'text-green-400',
    hover: 'hover:bg-green-400/10',
    children: [
      { id: 'compress-images', nameKey: 'Tools.compress-images' },
      { id: 'compress-pdf', nameKey: 'Tools.compress-pdf' },
      { id: 'compress-video', nameKey: 'Tools.compress-video' },
    ],
  },
  {
    id: 'convert',
    nameKey: 'Tools.convert',
    icon: RefreshCw,
    color: 'text-yellow-400',
    hover: 'hover:bg-yellow-400/10',
    children: [
      { id: 'image-converter', nameKey: 'Tools.image-converter' },
      { id: 'heic-to-png', nameKey: 'Tools.heic-to-png' },
      { id: 'pdf-to-image', nameKey: 'Tools.pdf-to-image' },
      { id: 'svg-to-png', nameKey: 'Tools.svg-to-png' },
    ],
  },
  {
    id: 'pdf-to-csv-menu',
    nameKey: 'Tools.pdf-to-csv',
    icon: FileCode,
    color: 'text-red-400',
    hover: 'hover:bg-red-400/10',
    children: [
      { id: 'pdf-to-csv', nameKey: 'Tools.pdf-to-csv' },
      { id: 'csv-to-pdf', nameKey: 'Tools.csv-to-pdf' },
    ],
  },
  {
    id: 'pdf-to-excel-menu',
    nameKey: 'Tools.pdf-to-excel',
    icon: FileSpreadsheet,
    color: 'text-lime-400',
    hover: 'hover:bg-lime-400/10',
    children: [
      { id: 'pdf-to-excel', nameKey: 'Tools.pdf-to-excel' },
      { id: 'excel-to-pdf', nameKey: 'Tools.excel-to-pdf' },
    ],
  },
  {
    id: 'excel-csv-menu',
    nameKey: 'Tools.excel-csv',
    icon: FileSpreadsheet,
    color: 'text-emerald-400',
    hover: 'hover:bg-emerald-400/10',
    children: [
      { id: 'excel-to-csv', nameKey: 'Tools.excel-to-csv' },
      { id: 'csv-to-excel', nameKey: 'Tools.csv-to-excel' },
    ],
  },
  {
    id: 'pdf-word-menu',
    nameKey: 'Tools.pdf-to-word',
    icon: FileText,
    color: 'text-blue-500',
    hover: 'hover:bg-blue-500/10',
    children: [
      { id: 'pdf-to-word', nameKey: 'Tools.pdf-to-word' },
      { id: 'word-to-pdf', nameKey: 'Tools.word-to-pdf' },
    ],
  },
  { id: 'video-to-gif', nameKey: 'Tools.video-to-gif', icon: FileVideo, color: 'text-purple-500', hover: 'hover:bg-purple-500/10' },
];
