/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, Link } from './navigation';
import { useSearchParams } from 'next/navigation';
import {
  FileText,
  Image as ImageIcon,
  Maximize,
  Minimize,
  FileSpreadsheet,
  FileCode,
  FileVideo,
  Droplets,
  Upload,
  ChevronDown,
  ShieldCheck,
  Users,
  Zap,
  LayoutGrid,
  Twitter,
  Linkedin,
  Youtube,
  Menu,
  X as XIcon,
  Cpu,
  HardDriveDownload,
  Lock,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import WatermarkTool from './components/tools/Watermark/WatermarkTool';
import ImageResizerTool from './components/tools/ImageResizer/ImageResizerTool';
import CompressImagesTool from './components/tools/CompressImages/CompressImagesTool';
import CompressPdfTool from './components/tools/CompressPdf/CompressPdfTool';
import CompressVideoTool from './components/tools/CompressVideo/CompressVideoTool';
import ImageConverterTool from './components/tools/ImageConverter/ImageConverterTool';
import HeicConverterTool from './components/tools/HeicConverter/HeicConverterTool';
import PdfToImageTool from './components/tools/PdfToImage/PdfToImageTool';
import SvgConverterTool from './components/tools/SvgConverter/SvgConverterTool';
import PdfToCsvTool from './components/tools/PdfToCsv/PdfToCsvTool';
import CsvToPdfTool from './components/tools/CsvToPdf/CsvToPdfTool';
import PdfToExcelTool from './components/tools/PdfToExcel/PdfToExcelTool';
import ExcelToPdfTool from './components/tools/ExcelToPdf/ExcelToPdfTool';
import ExcelToCsvTool from './components/tools/ExcelToCsv/ExcelToCsvTool';
import CsvToExcelTool from './components/tools/CsvToExcel/CsvToExcelTool';
import PdfToWordTool from './components/tools/PdfToWordTool';
import WordToPdfTool from './components/tools/WordToPdfTool';
import VideoToGifTool from './components/tools/VideoToGif/VideoToGifTool';
import LanguageSwitcher from './components/LanguageSwitcher';
import { ThemeToggle } from './components/ThemeToggle';
import MainSidebar from './components/layout/MainSidebar';
import { sidebarTools, allToolsCatalog } from './lib/sidebarData';
import { seoPages, type SeoPageData } from './lib/seoData';

interface ToolPageContent {
  titleKey: string;
  accentKey: string;
  descriptionKey: string;
  heroIcon: React.ElementType;
  features: {
    titleKey: string;
    descriptionKey: string;
    icon: React.ElementType;
    color: string;
  }[];
  stepsKeys: string[];
  faqsKeys: {
    questionKey: string;
    answerKey: string;
  }[];
}

const toolContent: Record<string, ToolPageContent> = {
  watermark: {
    titleKey: 'Tools.watermark-title',
    accentKey: 'Tools.watermark-accent',
    descriptionKey: 'Tools.watermark-desc',
    heroIcon: Droplets,
    features: [
      { titleKey: 'Tools.watermark-f1-title', descriptionKey: 'Tools.watermark-f1-desc', icon: ShieldCheck, color: 'text-blue-500 dark:text-blue-400' },
      { titleKey: 'Tools.watermark-f2-title', descriptionKey: 'Tools.watermark-f2-desc', icon: Maximize, color: 'text-purple-500 dark:text-purple-400' },
      { titleKey: 'Tools.watermark-f3-title', descriptionKey: 'Tools.watermark-f3-desc', icon: Zap, color: 'text-amber-500 dark:text-yellow-400' },
    ],
    stepsKeys: ['Tools.watermark-step1', 'Tools.watermark-step2', 'Tools.watermark-step3', 'Tools.watermark-step4'],
    faqsKeys: [
      { questionKey: 'Tools.watermark-faq1-q', answerKey: 'Tools.watermark-faq1-a' },
      { questionKey: 'Tools.watermark-faq2-q', answerKey: 'Tools.watermark-faq2-a' },
    ],
  },
  resize: {
    titleKey: 'Tools.resize-title',
    accentKey: 'Tools.resize-accent',
    descriptionKey: 'Tools.resize-desc',
    heroIcon: Maximize,
    features: [
      { titleKey: 'Tools.resize-f1-title', descriptionKey: 'Tools.resize-f1-desc', icon: Maximize, color: 'text-cyan-500 dark:text-cyan-400' },
      { titleKey: 'Tools.resize-f2-title', descriptionKey: 'Tools.resize-f2-desc', icon: Minimize, color: 'text-blue-500 dark:text-blue-400' },
      { titleKey: 'Tools.resize-f3-title', descriptionKey: 'Tools.resize-f3-desc', icon: Zap, color: 'text-amber-500 dark:text-yellow-400' },
    ],
    stepsKeys: ['Tools.resize-step1', 'Tools.resize-step2', 'Tools.resize-step3', 'Tools.resize-step4'],
    faqsKeys: [
      { questionKey: 'Tools.resize-faq1-q', answerKey: 'Tools.resize-faq1-a' },
      { questionKey: 'Tools.resize-faq2-q', answerKey: 'Tools.resize-faq2-a' },
    ],
  },
  compress: {
    titleKey: 'Tools.compress-title',
    accentKey: 'Tools.compress-accent',
    descriptionKey: 'Tools.compress-desc',
    heroIcon: Minimize,
    features: [
      { titleKey: 'Tools.compress-f1-title', descriptionKey: 'Tools.compress-f1-desc', icon: Minimize, color: 'text-emerald-500 dark:text-green-400' },
      { titleKey: 'Tools.compress-f2-title', descriptionKey: 'Tools.compress-f2-desc', icon: Zap, color: 'text-amber-500 dark:text-yellow-400' },
      { titleKey: 'Tools.compress-f3-title', descriptionKey: 'Tools.compress-f3-desc', icon: ShieldCheck, color: 'text-blue-500 dark:text-blue-400' },
    ],
    stepsKeys: ['Tools.compress-step1', 'Tools.compress-step2', 'Tools.compress-step3', 'Tools.compress-step4'],
    faqsKeys: [
      { questionKey: 'Tools.compress-faq1-q', answerKey: 'Tools.compress-faq1-a' },
      { questionKey: 'Tools.compress-faq2-q', answerKey: 'Tools.compress-faq2-a' },
    ],
  },
  'compress-images': {
    titleKey: 'Tools.compress-images-title',
    accentKey: 'Tools.compress-images-accent',
    descriptionKey: 'Tools.compress-images-desc',
    heroIcon: ImageIcon,
    features: [
      { titleKey: 'Tools.compress-images-f1-title', descriptionKey: 'Tools.compress-images-f1-desc', icon: Minimize, color: 'text-emerald-500 dark:text-green-400' },
      { titleKey: 'Tools.compress-images-f2-title', descriptionKey: 'Tools.compress-images-f2-desc', icon: Zap, color: 'text-amber-500 dark:text-yellow-400' },
      { titleKey: 'Tools.compress-images-f3-title', descriptionKey: 'Tools.compress-images-f3-desc', icon: ShieldCheck, color: 'text-blue-500 dark:text-blue-400' },
    ],
    stepsKeys: ['Tools.compress-images-step1', 'Tools.compress-images-step2', 'Tools.compress-images-step3', 'Tools.compress-images-step4'],
    faqsKeys: [
      { questionKey: 'Tools.compress-images-faq1-q', answerKey: 'Tools.compress-images-faq1-a' },
      { questionKey: 'Tools.compress-images-faq2-q', answerKey: 'Tools.compress-images-faq2-a' },
    ],
  },
  'compress-pdf': {
    titleKey: 'Tools.compress-pdf-title',
    accentKey: 'Tools.compress-pdf-accent',
    descriptionKey: 'Tools.compress-pdf-desc',
    heroIcon: FileText,
    features: [
      { titleKey: 'Tools.compress-pdf-f1-title', descriptionKey: 'Tools.compress-pdf-f1-desc', icon: Minimize, color: 'text-rose-500 dark:text-red-400' },
      { titleKey: 'Tools.compress-pdf-f2-title', descriptionKey: 'Tools.compress-pdf-f2-desc', icon: Zap, color: 'text-amber-500 dark:text-yellow-400' },
      { titleKey: 'Tools.compress-pdf-f3-title', descriptionKey: 'Tools.compress-pdf-f3-desc', icon: ShieldCheck, color: 'text-blue-500 dark:text-blue-400' },
    ],
    stepsKeys: ['Tools.compress-pdf-step1', 'Tools.compress-pdf-step2', 'Tools.compress-pdf-step3', 'Tools.compress-pdf-step4'],
    faqsKeys: [
      { questionKey: 'Tools.compress-pdf-faq1-q', answerKey: 'Tools.compress-pdf-faq1-a' },
      { questionKey: 'Tools.compress-pdf-faq2-q', answerKey: 'Tools.compress-pdf-faq2-a' },
    ],
  },
  'compress-video': {
    titleKey: 'Tools.compress-video-title',
    accentKey: 'Tools.compress-video-accent',
    descriptionKey: 'Tools.compress-video-desc',
    heroIcon: FileVideo,
    features: [
      { titleKey: 'Tools.compress-video-f1-title', descriptionKey: 'Tools.compress-video-f1-desc', icon: Minimize, color: 'text-purple-500 dark:text-purple-400' },
      { titleKey: 'Tools.compress-video-f2-title', descriptionKey: 'Tools.compress-video-f2-desc', icon: Zap, color: 'text-amber-500 dark:text-yellow-400' },
      { titleKey: 'Tools.compress-video-f3-title', descriptionKey: 'Tools.compress-video-f3-desc', icon: ShieldCheck, color: 'text-blue-500 dark:text-blue-400' },
    ],
    stepsKeys: ['Tools.compress-video-step1', 'Tools.compress-video-step2', 'Tools.compress-video-step3', 'Tools.compress-video-step4'],
    faqsKeys: [
      { questionKey: 'Tools.compress-video-faq1-q', answerKey: 'Tools.compress-video-faq1-a' },
      { questionKey: 'Tools.compress-video-faq2-q', answerKey: 'Tools.compress-video-faq2-a' },
    ],
  },
  'pdf-to-csv': {
    titleKey: 'Tools.pdf-to-csv-title',
    accentKey: 'Tools.pdf-to-csv-accent',
    descriptionKey: 'Tools.pdf-to-csv-desc',
    heroIcon: FileCode,
    features: [
      { titleKey: 'Tools.pdf-to-csv-f1-title', descriptionKey: 'Tools.pdf-to-csv-f1-desc', icon: FileCode, color: 'text-rose-500 dark:text-red-400' },
      { titleKey: 'Tools.pdf-to-csv-f2-title', descriptionKey: 'Tools.pdf-to-csv-f2-desc', icon: Zap, color: 'text-amber-500 dark:text-yellow-400' },
      { titleKey: 'Tools.pdf-to-csv-f3-title', descriptionKey: 'Tools.pdf-to-csv-f3-desc', icon: ShieldCheck, color: 'text-blue-500 dark:text-blue-400' },
    ],
    stepsKeys: ['Tools.pdf-to-csv-step1', 'Tools.pdf-to-csv-step2', 'Tools.pdf-to-csv-step3', 'Tools.pdf-to-csv-step4'],
    faqsKeys: [
      { questionKey: 'Tools.pdf-to-csv-faq1-q', answerKey: 'Tools.pdf-to-csv-faq1-a' },
      { questionKey: 'Tools.pdf-to-csv-faq2-q', answerKey: 'Tools.pdf-to-csv-faq2-a' },
    ],
  },
  'csv-to-pdf': {
    titleKey: 'Tools.csv-to-pdf-title',
    accentKey: 'Tools.csv-to-pdf-accent',
    descriptionKey: 'Tools.csv-to-pdf-desc',
    heroIcon: FileText,
    features: [
      { titleKey: 'Tools.csv-to-pdf-f1-title', descriptionKey: 'Tools.csv-to-pdf-f1-desc', icon: FileText, color: 'text-rose-500 dark:text-red-400' },
      { titleKey: 'Tools.csv-to-pdf-f2-title', descriptionKey: 'Tools.csv-to-pdf-f2-desc', icon: Zap, color: 'text-amber-500 dark:text-yellow-400' },
      { titleKey: 'Tools.csv-to-pdf-f3-title', descriptionKey: 'Tools.csv-to-pdf-f3-desc', icon: ShieldCheck, color: 'text-blue-500 dark:text-blue-400' },
    ],
    stepsKeys: ['Tools.csv-to-pdf-step1', 'Tools.csv-to-pdf-step2', 'Tools.csv-to-pdf-step3', 'Tools.csv-to-pdf-step4'],
    faqsKeys: [
      { questionKey: 'Tools.csv-to-pdf-faq1-q', answerKey: 'Tools.csv-to-pdf-faq1-a' },
      { questionKey: 'Tools.csv-to-pdf-faq2-q', answerKey: 'Tools.csv-to-pdf-faq2-a' },
    ],
  },
  'pdf-to-excel': {
    titleKey: 'Tools.pdf-to-excel-title',
    accentKey: 'Tools.pdf-to-excel-accent',
    descriptionKey: 'Tools.pdf-to-excel-desc',
    heroIcon: FileSpreadsheet,
    features: [
      { titleKey: 'Tools.pdf-to-excel-f1-title', descriptionKey: 'Tools.pdf-to-excel-f1-desc', icon: FileText, color: 'text-emerald-500 dark:text-emerald-400' },
      { titleKey: 'Tools.pdf-to-excel-f2-title', descriptionKey: 'Tools.pdf-to-excel-f2-desc', icon: Users, color: 'text-blue-500 dark:text-blue-400' },
      { titleKey: 'Tools.pdf-to-excel-f3-title', descriptionKey: 'Tools.pdf-to-excel-f3-desc', icon: Zap, color: 'text-amber-500 dark:text-yellow-400' },
    ],
    stepsKeys: ['Tools.pdf-to-excel-step1', 'Tools.pdf-to-excel-step2', 'Tools.pdf-to-excel-step3', 'Tools.pdf-to-excel-step4'],
    faqsKeys: [
      { questionKey: 'Tools.pdf-to-excel-faq1-q', answerKey: 'Tools.pdf-to-excel-faq1-a' },
      { questionKey: 'Tools.pdf-to-excel-faq2-q', answerKey: 'Tools.pdf-to-excel-faq2-a' },
      { questionKey: 'Tools.pdf-to-excel-faq3-q', answerKey: 'Tools.pdf-to-excel-faq3-a' },
    ],
  },
  'excel-to-pdf': {
    titleKey: 'Tools.excel-to-pdf-title',
    accentKey: 'Tools.excel-to-pdf-accent',
    descriptionKey: 'Tools.excel-to-pdf-desc',
    heroIcon: FileText,
    features: [
      { titleKey: 'Tools.excel-to-pdf-f1-title', descriptionKey: 'Tools.excel-to-pdf-f1-desc', icon: FileText, color: 'text-lime-600 dark:text-lime-400' },
      { titleKey: 'Tools.excel-to-pdf-f2-title', descriptionKey: 'Tools.excel-to-pdf-f2-desc', icon: Zap, color: 'text-amber-500 dark:text-yellow-400' },
      { titleKey: 'Tools.excel-to-pdf-f3-title', descriptionKey: 'Tools.excel-to-pdf-f3-desc', icon: ShieldCheck, color: 'text-blue-500 dark:text-blue-400' },
    ],
    stepsKeys: ['Tools.excel-to-pdf-step1', 'Tools.excel-to-pdf-step2', 'Tools.excel-to-pdf-step3', 'Tools.excel-to-pdf-step4'],
    faqsKeys: [
      { questionKey: 'Tools.excel-to-pdf-faq1-q', answerKey: 'Tools.excel-to-pdf-faq1-a' },
      { questionKey: 'Tools.excel-to-pdf-faq2-q', answerKey: 'Tools.excel-to-pdf-faq2-a' },
    ],
  },
  'excel-to-csv': {
    titleKey: 'Tools.excel-to-csv-title',
    accentKey: 'Tools.excel-to-csv-accent',
    descriptionKey: 'Tools.excel-csv-desc',
    heroIcon: FileSpreadsheet,
    features: [
      { titleKey: 'Tools.excel-csv-f1-title', descriptionKey: 'Tools.excel-csv-f1-desc', icon: FileSpreadsheet, color: 'text-emerald-500 dark:text-emerald-400' },
      { titleKey: 'Tools.excel-csv-f2-title', descriptionKey: 'Tools.excel-csv-f2-desc', icon: Zap, color: 'text-amber-500 dark:text-yellow-400' },
      { titleKey: 'Tools.excel-csv-f3-title', descriptionKey: 'Tools.excel-csv-f3-desc', icon: ShieldCheck, color: 'text-blue-500 dark:text-blue-400' },
    ],
    stepsKeys: ['Tools.excel-csv-step1', 'Tools.excel-csv-step2', 'Tools.excel-csv-step3', 'Tools.excel-csv-step4'],
    faqsKeys: [
      { questionKey: 'Tools.excel-csv-faq1-q', answerKey: 'Tools.excel-csv-faq1-a' },
      { questionKey: 'Tools.excel-csv-faq2-q', answerKey: 'Tools.excel-csv-faq2-a' },
    ],
  },
  'csv-to-excel': {
    titleKey: 'Tools.csv-to-excel-title',
    accentKey: 'Tools.csv-to-excel-accent',
    descriptionKey: 'Tools.excel-csv-desc',
    heroIcon: FileSpreadsheet,
    features: [
      { titleKey: 'Tools.excel-csv-f1-title', descriptionKey: 'Tools.excel-csv-f1-desc', icon: FileSpreadsheet, color: 'text-emerald-500 dark:text-emerald-400' },
      { titleKey: 'Tools.excel-csv-f2-title', descriptionKey: 'Tools.excel-csv-f2-desc', icon: Zap, color: 'text-amber-500 dark:text-yellow-400' },
      { titleKey: 'Tools.excel-csv-f3-title', descriptionKey: 'Tools.excel-csv-f3-desc', icon: ShieldCheck, color: 'text-blue-500 dark:text-blue-400' },
    ],
    stepsKeys: ['Tools.excel-csv-step1', 'Tools.excel-csv-step2', 'Tools.excel-csv-step3', 'Tools.excel-csv-step4'],
    faqsKeys: [
      { questionKey: 'Tools.excel-csv-faq1-q', answerKey: 'Tools.excel-csv-faq1-a' },
      { questionKey: 'Tools.excel-csv-faq2-q', answerKey: 'Tools.excel-csv-faq2-a' },
    ],
  },
  'pdf-to-word': {
    titleKey: 'Tools.pdf-to-word-title',
    accentKey: 'Tools.pdf-to-word-accent',
    descriptionKey: 'Tools.pdf-to-word-desc',
    heroIcon: FileText,
    features: [
      { titleKey: 'Tools.pdf-to-word-f1-title', descriptionKey: 'Tools.pdf-to-word-f1-desc', icon: FileText, color: 'text-blue-500' },
      { titleKey: 'Tools.pdf-to-word-f2-title', descriptionKey: 'Tools.pdf-to-word-f2-desc', icon: Zap, color: 'text-amber-500 dark:text-yellow-400' },
      { titleKey: 'Tools.pdf-to-word-f3-title', descriptionKey: 'Tools.pdf-to-word-f3-desc', icon: ShieldCheck, color: 'text-blue-500 dark:text-blue-400' },
    ],
    stepsKeys: ['Tools.pdf-to-word-step1', 'Tools.pdf-to-word-step2', 'Tools.pdf-to-word-step3', 'Tools.pdf-to-word-step4'],
    faqsKeys: [
      { questionKey: 'Tools.pdf-to-word-faq1-q', answerKey: 'Tools.pdf-to-word-faq1-a' },
      { questionKey: 'Tools.pdf-to-word-faq2-q', answerKey: 'Tools.pdf-to-word-faq2-a' },
    ],
  },
  'word-to-pdf': {
    titleKey: 'Tools.word-to-pdf-title',
    accentKey: 'Tools.word-to-pdf-accent',
    descriptionKey: 'Tools.word-to-pdf-desc',
    heroIcon: FileText,
    features: [
      { titleKey: 'Tools.word-to-pdf-f1-title', descriptionKey: 'Tools.word-to-pdf-f1-desc', icon: FileText, color: 'text-blue-500' },
      { titleKey: 'Tools.word-to-pdf-f2-title', descriptionKey: 'Tools.word-to-pdf-f2-desc', icon: Zap, color: 'text-amber-500 dark:text-yellow-400' },
      { titleKey: 'Tools.word-to-pdf-f3-title', descriptionKey: 'Tools.word-to-pdf-f3-desc', icon: ShieldCheck, color: 'text-blue-500 dark:text-blue-400' },
    ],
    stepsKeys: ['Tools.word-to-pdf-step1', 'Tools.word-to-pdf-step2', 'Tools.word-to-pdf-step3', 'Tools.word-to-pdf-step4'],
    faqsKeys: [
      { questionKey: 'Tools.word-to-pdf-faq1-q', answerKey: 'Tools.word-to-pdf-faq1-a' },
      { questionKey: 'Tools.word-to-pdf-faq2-q', answerKey: 'Tools.word-to-pdf-faq2-a' },
    ],
  },
  'video-to-gif': {
    titleKey: 'Tools.video-to-gif-title',
    accentKey: 'Tools.video-to-gif-accent',
    descriptionKey: 'Tools.video-to-gif-desc',
    heroIcon: FileVideo,
    features: [
      { titleKey: 'Tools.video-to-gif-f1-title', descriptionKey: 'Tools.video-to-gif-f1-desc', icon: FileVideo, color: 'text-purple-500' },
      { titleKey: 'Tools.video-to-gif-f2-title', descriptionKey: 'Tools.video-to-gif-f2-desc', icon: Zap, color: 'text-amber-500 dark:text-yellow-400' },
      { titleKey: 'Tools.video-to-gif-f3-title', descriptionKey: 'Tools.video-to-gif-f3-desc', icon: ShieldCheck, color: 'text-blue-500 dark:text-blue-400' },
    ],
    stepsKeys: ['Tools.video-to-gif-step1', 'Tools.video-to-gif-step2', 'Tools.video-to-gif-step3', 'Tools.video-to-gif-step4'],
    faqsKeys: [
      { questionKey: 'Tools.video-to-gif-faq1-q', answerKey: 'Tools.video-to-gif-faq1-a' },
      { questionKey: 'Tools.video-to-gif-faq2-q', answerKey: 'Tools.video-to-gif-faq2-a' },
    ],
  },
  'image-converter': {
    titleKey: 'Tools.image-converter-title',
    accentKey: 'Tools.image-converter-accent',
    descriptionKey: 'Tools.image-converter-desc',
    heroIcon: ImageIcon,
    features: [
      { titleKey: 'Tools.image-converter-f1-title', descriptionKey: 'Tools.image-converter-f1-desc', icon: ImageIcon, color: 'text-blue-500 dark:text-blue-400' },
      { titleKey: 'Tools.image-converter-f2-title', descriptionKey: 'Tools.image-converter-f2-desc', icon: Zap, color: 'text-amber-500 dark:text-yellow-400' },
      { titleKey: 'Tools.image-converter-f3-title', descriptionKey: 'Tools.image-converter-f3-desc', icon: ShieldCheck, color: 'text-emerald-500 dark:text-green-400' },
    ],
    stepsKeys: ['Tools.image-converter-step1', 'Tools.image-converter-step2', 'Tools.image-converter-step3', 'Tools.image-converter-step4'],
    faqsKeys: [
      { questionKey: 'Tools.image-converter-faq1-q', answerKey: 'Tools.image-converter-faq1-a' },
      { questionKey: 'Tools.image-converter-faq2-q', answerKey: 'Tools.image-converter-faq2-a' },
    ],
  },
  'heic-to-png': {
    titleKey: 'Tools.heic-to-png-title',
    accentKey: 'Tools.heic-to-png-accent',
    descriptionKey: 'Tools.heic-to-png-desc',
    heroIcon: ImageIcon,
    features: [
      { titleKey: 'Tools.heic-to-png-f1-title', descriptionKey: 'Tools.heic-to-png-f1-desc', icon: ImageIcon, color: 'text-orange-500 dark:text-orange-400' },
      { titleKey: 'Tools.heic-to-png-f2-title', descriptionKey: 'Tools.heic-to-png-f2-desc', icon: Zap, color: 'text-amber-500 dark:text-yellow-400' },
      { titleKey: 'Tools.heic-to-png-f3-title', descriptionKey: 'Tools.heic-to-png-f3-desc', icon: ShieldCheck, color: 'text-blue-500 dark:text-blue-400' },
    ],
    stepsKeys: ['Tools.heic-to-png-step1', 'Tools.heic-to-png-step2', 'Tools.heic-to-png-step3', 'Tools.heic-to-png-step4'],
    faqsKeys: [
      { questionKey: 'Tools.heic-to-png-faq1-q', answerKey: 'Tools.heic-to-png-faq1-a' },
      { questionKey: 'Tools.heic-to-png-faq2-q', answerKey: 'Tools.heic-to-png-faq2-a' },
    ],
  },
  'pdf-to-image': {
    titleKey: 'Tools.pdf-to-image-title',
    accentKey: 'Tools.pdf-to-image-accent',
    descriptionKey: 'Tools.pdf-to-image-desc',
    heroIcon: FileText,
    features: [
      { titleKey: 'Tools.pdf-to-image-f1-title', descriptionKey: 'Tools.pdf-to-image-f1-desc', icon: FileText, color: 'text-rose-500 dark:text-red-400' },
      { titleKey: 'Tools.pdf-to-image-f2-title', descriptionKey: 'Tools.pdf-to-image-f2-desc', icon: Zap, color: 'text-amber-500 dark:text-yellow-400' },
      { titleKey: 'Tools.pdf-to-image-f3-title', descriptionKey: 'Tools.pdf-to-image-f3-desc', icon: ShieldCheck, color: 'text-blue-500 dark:text-blue-400' },
    ],
    stepsKeys: ['Tools.pdf-to-image-step1', 'Tools.pdf-to-image-step2', 'Tools.pdf-to-image-step3', 'Tools.pdf-to-image-step4'],
    faqsKeys: [
      { questionKey: 'Tools.pdf-to-image-faq1-q', answerKey: 'Tools.pdf-to-image-faq1-a' },
      { questionKey: 'Tools.pdf-to-image-faq2-q', answerKey: 'Tools.pdf-to-image-faq2-a' },
    ],
  },
  'svg-to-png': {
    titleKey: 'Tools.svg-to-png-title',
    accentKey: 'Tools.svg-to-png-accent',
    descriptionKey: 'Tools.svg-to-png-desc',
    heroIcon: FileCode,
    features: [
      { titleKey: 'Tools.svg-to-png-f1-title', descriptionKey: 'Tools.svg-to-png-f1-desc', icon: FileCode, color: 'text-emerald-500 dark:text-emerald-400' },
      { titleKey: 'Tools.svg-to-png-f2-title', descriptionKey: 'Tools.svg-to-png-f2-desc', icon: Zap, color: 'text-amber-500 dark:text-yellow-400' },
      { titleKey: 'Tools.svg-to-png-f3-title', descriptionKey: 'Tools.svg-to-png-f3-desc', icon: ShieldCheck, color: 'text-blue-500 dark:text-blue-400' },
    ],
    stepsKeys: ['Tools.svg-to-png-step1', 'Tools.svg-to-png-step2', 'Tools.svg-to-png-step3', 'Tools.svg-to-png-step4'],
    faqsKeys: [
      { questionKey: 'Tools.svg-to-png-faq1-q', answerKey: 'Tools.svg-to-png-faq1-a' },
      { questionKey: 'Tools.svg-to-png-faq2-q', answerKey: 'Tools.svg-to-png-faq2-a' },
    ],
  },
};

export default function App({ toolSlug, seoOverride }: { toolSlug?: string; seoOverride?: SeoPageData }) {
  const t = useTranslations('Common');
  const tt = useTranslations('Tools');
  const router = useRouter();
  const searchParams = useSearchParams();

  // Use path-based toolSlug if provided, fall back to query param for backward compat
  const activeTool = toolSlug || searchParams.get('tool') || 'pdf-to-excel';
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const setActiveTool = (toolId: string) => {
    router.push(`/tools/${toolId}`, { scroll: false });
  };

  useEffect(() => {
    setOpenFaq(0);
  }, [activeTool]);

  const currentContent = toolContent[activeTool] || toolContent['pdf-to-excel'];
  const catalogMeta =
    allToolsCatalog.find((item) => item.id === activeTool) || allToolsCatalog[0];
  const activeToolData =
    sidebarTools.find((item) => item.id === activeTool) ||
    sidebarTools.flatMap((item) => item.children || []).find((c) => c.id === activeTool);

  const categorySiblings = allToolsCatalog.filter(
    (item) => item.category === catalogMeta.category
  );

  const combinedFaqs = seoOverride
    ? [
        ...seoOverride.faqs,
        {
          question: t('securityFaqQuestion'),
          answer: t('securityFaqAnswer'),
        },
      ]
    : [
        ...currentContent.faqsKeys.map((faq) => ({
          question: tt(faq.questionKey.split('.')[1]),
          answer: tt(faq.answerKey.split('.')[1]),
        })),
        {
          question: t('securityFaqQuestion'),
          answer: t('securityFaqAnswer'),
        },
      ];

  const coreToolSlug = activeTool;
  const relatedUseCases = Object.values(seoPages).filter(
    (page) => page.coreTool === coreToolSlug
  );
  const filteredUseCases = seoOverride
    ? relatedUseCases.filter((page) => page.slug !== seoOverride.slug)
    : relatedUseCases;

  const ActiveIcon = catalogMeta.icon;

  return (
    <div className="flex h-screen bg-[#f8f9fb] dark:bg-[#090a0f] text-gray-900 dark:text-gray-200 font-sans overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[60] lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Wrapper */}
      <div
        className={`fixed inset-y-0 left-0 z-[70] transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <MainSidebar
          activeTool={activeTool}
          onToolSelect={(toolId) => {
            setActiveTool(toolId);
            setIsSidebarOpen(false);
          }}
        />
      </div>

      {/* Main Workspace Area */}
      <main className="flex-1 flex flex-col overflow-y-auto scroll-smooth w-full lg:w-auto">
        {/* Sticky Glassmorphic Workspace Header */}
        <header className="h-16 border-b border-black/10 dark:border-white/[0.08] flex items-center justify-between px-4 lg:px-8 shrink-0 bg-white/85 dark:bg-[#0b0d12]/85 backdrop-blur-md sticky top-0 z-50">
          <div className="flex items-center gap-3 lg:gap-4 min-w-0">
            <button
              type="button"
              aria-label="Toggle tools sidebar"
              className="lg:hidden p-2 -ml-1 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <XIcon size={20} /> : <Menu size={20} />}
            </button>

            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium min-w-0">
              <Link
                href="/"
                className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors hidden sm:inline"
              >
                {t('home')}
              </Link>
              <span className="text-gray-300 dark:text-gray-700 hidden sm:inline">/</span>
              <Link
                href="/#tools-explorer"
                className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors hidden md:inline"
              >
                {t('tools')}
              </Link>
              <span className="text-gray-300 dark:text-gray-700 hidden md:inline">/</span>
              <span className="font-bold text-gray-900 dark:text-white truncate">
                {activeToolData?.nameKey ? tt(activeToolData.nameKey.split('.')[1]) : catalogMeta.id}
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-[#d4ff33]/20 text-black dark:text-[#d4ff33] border border-[#d4ff33]/30 shrink-0">
                {catalogMeta.badge}
              </span>
            </nav>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono font-semibold text-emerald-700 dark:text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Local Engine: {catalogMeta.engine}</span>
            </div>
            <ThemeToggle />
            <LanguageSwitcher />
            <Link
              href="/#tools-explorer"
              className="inline-flex items-center gap-1.5 bg-black text-white dark:bg-[#d4ff33] dark:text-black px-3.5 py-2 rounded-xl text-xs font-bold hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">All 18 {t('tools')}</span>
            </Link>
          </div>
        </header>

        {/* Quick Category Sibling Switcher Bar */}
        <div className="border-b border-black/5 dark:border-white/[0.06] bg-white/60 dark:bg-[#0e1117]/60 px-4 lg:px-8 py-2.5">
          <div className="max-w-5xl mx-auto flex items-center gap-2 overflow-x-auto scrollbar-hide">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 shrink-0 mr-1">
              Quick Switch:
            </span>
            {categorySiblings.map((sibling) => {
              const isCurrent = sibling.id === activeTool;
              const SiblingIcon = sibling.icon;
              return (
                <button
                  key={sibling.id}
                  type="button"
                  onClick={() => setActiveTool(sibling.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    isCurrent
                      ? 'bg-[#d4ff33] text-black shadow-xs border border-black/10'
                      : 'bg-white dark:bg-white/[0.04] text-gray-600 dark:text-gray-400 border border-black/5 dark:border-white/[0.08] hover:border-black/20 dark:hover:border-white/20 hover:text-black dark:hover:text-white'
                  }`}
                >
                  <SiblingIcon className="w-3.5 h-3.5 shrink-0" />
                  <span>{tt(sibling.nameKey.split('.')[1])}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Workspace Hero + Interactive Tool Area */}
        <section className="relative px-4 md:px-8 pt-8 md:pt-12 pb-16 max-w-5xl mx-auto w-full">
          {/* Ambient Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-[560px] h-[240px] bg-[#d4ff33]/10 dark:bg-[#d4ff33]/[0.07] blur-[110px] rounded-full"
          />

          {/* Compact Tool Header */}
          <div className="relative z-10 text-center mb-8 md:mb-10">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 mb-4">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${catalogMeta.bg} ${catalogMeta.color} border border-current/15`}
              >
                <ActiveIcon className="w-3.5 h-3.5" />
                {catalogMeta.badge}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-white dark:bg-white/[0.05] text-gray-600 dark:text-gray-300 border border-black/10 dark:border-white/10">
                <Cpu className="w-3.5 h-3.5 text-lime-600 dark:text-[#d4ff33]" />
                {catalogMeta.engine}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-3 [text-wrap:balance]">
              {seoOverride ? seoOverride.h1 : tt(currentContent.titleKey.split('.')[1])}{' '}
              <span className="italic font-serif font-normal text-lime-700 dark:text-[#d4ff33]">
                {seoOverride ? seoOverride.h1Accent : tt(currentContent.accentKey.split('.')[1])}
              </span>
            </h1>

            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed [text-wrap:pretty]">
              {seoOverride ? seoOverride.subtitle : tt(currentContent.descriptionKey.split('.')[1])}
            </p>
          </div>

          {/* Active Interactive Tool Component */}
          <div className="relative z-10 mb-10">
            {activeTool === 'compress-images' ? (
              <CompressImagesTool />
            ) : activeTool === 'compress-pdf' ? (
              <CompressPdfTool />
            ) : activeTool === 'compress-video' ? (
              <CompressVideoTool />
            ) : activeTool === 'watermark' ? (
              <WatermarkTool />
            ) : activeTool === 'resize' ? (
              <ImageResizerTool />
            ) : activeTool === 'image-converter' ? (
              <ImageConverterTool />
            ) : activeTool === 'heic-to-png' ? (
              <HeicConverterTool />
            ) : activeTool === 'pdf-to-image' ? (
              <PdfToImageTool />
            ) : activeTool === 'svg-to-png' ? (
              <SvgConverterTool />
            ) : activeTool === 'pdf-to-csv' ? (
              <PdfToCsvTool />
            ) : activeTool === 'csv-to-pdf' ? (
              <CsvToPdfTool />
            ) : activeTool === 'pdf-to-excel' ? (
              <PdfToExcelTool />
            ) : activeTool === 'excel-to-pdf' ? (
              <ExcelToPdfTool />
            ) : activeTool === 'excel-to-csv' ? (
              <ExcelToCsvTool />
            ) : activeTool === 'csv-to-excel' ? (
              <CsvToExcelTool />
            ) : activeTool === 'pdf-to-word' ? (
              <PdfToWordTool />
            ) : activeTool === 'word-to-pdf' ? (
              <WordToPdfTool />
            ) : activeTool === 'video-to-gif' ? (
              <VideoToGifTool />
            ) : (
              <motion.div
                whileHover={{ scale: 1.005 }}
                className="border-2 border-dashed border-lime-400/30 bg-lime-400/5 rounded-[32px] p-8 md:p-20 min-h-[300px] md:min-h-[420px] flex flex-col items-center justify-center group cursor-pointer transition-colors hover:border-lime-400/50"
              >
                <div className="w-14 h-14 bg-lime-400/10 rounded-full flex items-center justify-center text-lime-400 mb-5 group-hover:scale-110 transition-transform">
                  <Upload className="w-7 h-7" />
                </div>
                <button className="bg-[#d4ff33] text-black px-6 py-3.5 rounded-2xl font-bold flex items-center gap-2 hover:bg-[#c2eb2e] transition-colors shadow-lg shadow-lime-400/20 text-sm mb-3">
                  {t('chooseFiles')} <ChevronDown className="w-4 h-4" />
                </button>
                <p className="text-gray-500 text-xs md:text-sm text-center">{t('dropFilesHere')}</p>
              </motion.div>
            )}
          </div>

          {/* 4-Pill Local Sandbox Trust Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-20">
            {[
              {
                icon: Lock,
                title: 'Zero Cloud Uploads',
                desc: 'Files never leave your device',
                accent: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10',
              },
              {
                icon: Cpu,
                title: catalogMeta.engine,
                desc: 'In-browser WebAssembly & Canvas',
                accent: 'text-lime-700 dark:text-[#d4ff33] bg-[#d4ff33]/15',
              },
              {
                icon: Zap,
                title: 'No Paywalls or Sign-Up',
                desc: 'Unlimited local conversions',
                accent: 'text-amber-600 dark:text-amber-400 bg-amber-500/10',
              },
              {
                icon: HardDriveDownload,
                title: 'Instant Direct Save',
                desc: 'Zero watermarks or queues',
                accent: 'text-sky-600 dark:text-sky-400 bg-sky-500/10',
              },
            ].map((pill, idx) => (
              <div
                key={idx}
                className="rounded-2xl p-4 bg-white dark:bg-[#11141c] border border-black/10 dark:border-white/[0.08] flex items-center gap-3"
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${pill.accent}`}>
                  <pill.icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{pill.title}</p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">{pill.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Modern 4-Step Horizontal Process Timeline ("How It Works") */}
          <div className="mb-20">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-widest bg-black/5 dark:bg-white/5 text-gray-700 dark:text-[#d4ff33] border border-black/10 dark:border-white/10 mb-3">
                Step-by-Step Workflow
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                {t('howTo')} {tt(currentContent.titleKey.split('.')[1])}{' '}
                {tt(currentContent.accentKey.split('.')[1])} {t('forFree')}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {currentContent.stepsKeys.map((stepKey, i) => (
                <div
                  key={i}
                  className="relative rounded-3xl p-6 bg-white dark:bg-[#11141c] border border-black/10 dark:border-white/[0.08] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-9 h-9 rounded-xl bg-[#d4ff33] text-black font-mono font-black text-xs flex items-center justify-center shadow-xs">
                        0{i + 1}
                      </span>
                      {i < currentContent.stepsKeys.length - 1 && (
                        <ArrowRight className="w-4 h-4 text-gray-300 dark:text-gray-700 hidden lg:block" />
                      )}
                      {i === currentContent.stepsKeys.length - 1 && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-[#d4ff33]" />
                      )}
                    </div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 leading-relaxed">
                      {tt(stepKey.split('.')[1])}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3-Column Feature Bento Cards */}
          <div className="mb-20">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-3">
                {tt(currentContent.titleKey.split('.')[1])}{' '}
                {tt(currentContent.accentKey.split('.')[1])} {t('inSeconds')}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-sm md:text-base">
                {t('toolDesignedSubtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {currentContent.features.map((feature, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-[#11141c] border border-black/10 dark:border-white/[0.08] rounded-3xl p-7 hover:border-black/25 dark:hover:border-white/20 transition-all"
                >
                  <div
                    className={`w-11 h-11 bg-gray-100 dark:bg-white/[0.06] rounded-2xl flex items-center justify-center ${feature.color} mb-5`}
                  >
                    <feature.icon size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2.5">
                    {tt(feature.titleKey.split('.')[1])}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {tt(feature.descriptionKey.split('.')[1])}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs Accordion Section */}
          <div className="max-w-3xl mx-auto mb-20">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-8 tracking-tight">
              {seoOverride
                ? `${seoOverride.h1} ${seoOverride.h1Accent} FAQs`
                : `${tt(currentContent.titleKey.split('.')[1])} ${tt(
                    currentContent.accentKey.split('.')[1]
                  )} ${t('faqs')}`}
            </h2>
            <div className="space-y-3">
              {combinedFaqs.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div
                    key={i}
                    className="bg-white dark:bg-[#11141c] border border-black/10 dark:border-white/[0.08] rounded-2xl overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left hover:bg-gray-50 dark:hover:bg-white/[0.03] transition-colors"
                    >
                      <span className="font-bold text-sm sm:text-base text-gray-900 dark:text-white">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-lime-600 dark:text-[#d4ff33] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-6 pb-5 text-gray-600 dark:text-gray-400 text-sm leading-relaxed border-t border-gray-100 dark:border-white/[0.05] pt-4"
                        >
                          {faq.answer}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* All 18 Tools Quick Directory Switcher */}
          <div className="mb-20 pt-12 border-t border-black/10 dark:border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                  Switch to Another Local Tool
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  All 18 utilities run 100% locally in your browser with zero file uploads.
                </p>
              </div>
              <Link
                href="/#tools-explorer"
                className="text-xs font-bold text-gray-700 dark:text-[#d4ff33] hover:underline inline-flex items-center gap-1"
              >
                Open Full Explorer <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {allToolsCatalog.map((item) => {
                const isCurrent = item.id === activeTool;
                const ItemIcon = item.icon;
                return (
                  <Link
                    key={item.id}
                    href={`/tools/${item.id}`}
                    className={`group p-3.5 rounded-2xl border flex items-center justify-between gap-3 transition-all ${
                      isCurrent
                        ? 'bg-black text-white dark:bg-[#d4ff33] dark:text-black border-black dark:border-[#d4ff33] shadow-sm'
                        : 'bg-white dark:bg-[#11141c] border-black/10 dark:border-white/[0.08] hover:border-black/30 dark:hover:border-[#d4ff33]/50'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                          isCurrent
                            ? 'bg-white/15 text-[#d4ff33] dark:bg-black/15 dark:text-black'
                            : `${item.bg} ${item.color}`
                        }`}
                      >
                        <ItemIcon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p
                          className={`text-xs font-bold truncate ${
                            isCurrent ? 'text-white dark:text-black' : 'text-gray-900 dark:text-white'
                          }`}
                        >
                          {tt(item.nameKey.split('.')[1])}
                        </p>
                        <p
                          className={`text-[10px] font-mono truncate ${
                            isCurrent
                              ? 'text-white/75 dark:text-black/70'
                              : 'text-gray-500 dark:text-gray-400'
                          }`}
                        >
                          {item.engine}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold shrink-0 ${
                        isCurrent
                          ? 'bg-white/20 text-white dark:bg-black/15 dark:text-black'
                          : 'bg-gray-100 dark:bg-white/[0.06] text-gray-600 dark:text-gray-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Related Use Cases Section */}
          {filteredUseCases.length > 0 && (
            <div className="max-w-4xl mx-auto pt-12 border-t border-black/10 dark:border-white/10">
              <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-white text-center mb-8 tracking-tight">
                {t('directoryPopularTasks')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredUseCases.map((useCase) => (
                  <Link
                    key={useCase.slug}
                    href={`/${useCase.slug}`}
                    className="group flex flex-col justify-center p-5 rounded-2xl border border-black/10 dark:border-white/[0.08] bg-white dark:bg-[#11141c] hover:border-black/30 dark:hover:border-[#d4ff33]/50 transition-all"
                  >
                    <span className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-black dark:group-hover:text-[#d4ff33] transition-colors flex items-center justify-between gap-2">
                      <span>{useCase.title.split('|')[0].trim()}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 shrink-0" />
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 line-clamp-2">
                      {useCase.description}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="bg-white dark:bg-[#06070a] py-12 md:py-16 px-6 md:px-12 border-t border-black/10 dark:border-white/10 mt-auto">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <div className="col-span-1 sm:col-span-2 lg:col-span-1">
                <Link href="/" className="flex items-center gap-2.5 mb-4">
                  <div className="w-7 h-7 bg-[#d4ff33] rounded-lg flex items-center justify-center text-black font-black text-sm">
                    R
                  </div>
                  <span className="text-gray-900 dark:text-white font-extrabold text-lg tracking-tight">
                    Refinedocs
                  </span>
                </Link>
                <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed max-w-xs">
                  {t('weMakePdfEasy')}
                </p>
              </div>

              <div>
                <h4 className="text-gray-900 dark:text-white font-bold text-sm mb-4">{t('solutions')}</h4>
                <ul className="space-y-2.5 text-gray-600 dark:text-gray-400 text-xs">
                  <li>
                    <Link href="/#solutions" className="hover:text-black dark:hover:text-white transition-colors">
                      {t('sales')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/#solutions" className="hover:text-black dark:hover:text-white transition-colors">
                      {t('finance')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/#solutions" className="hover:text-black dark:hover:text-white transition-colors">
                      {t('realEstate')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/#solutions" className="hover:text-black dark:hover:text-white transition-colors">
                      {t('education')}
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-gray-900 dark:text-white font-bold text-sm mb-4">{t('company')}</h4>
                <ul className="space-y-2.5 text-gray-600 dark:text-gray-400 text-xs">
                  <li>
                    <Link href="/#about" className="hover:text-black dark:hover:text-white transition-colors">
                      {t('about')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="hover:text-black dark:hover:text-white transition-colors">
                      {t('faqs')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="hover:text-black dark:hover:text-white transition-colors">
                      {t('blog')}
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-gray-900 dark:text-white font-bold text-sm mb-4">{t('tools')}</h4>
                <ul className="space-y-2.5 text-gray-600 dark:text-gray-400 text-xs">
                  <li>
                    <Link href="/tools/pdf-to-excel" className="hover:text-black dark:hover:text-white transition-colors">
                      {tt('pdf-to-excel')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/tools/compress-pdf" className="hover:text-black dark:hover:text-white transition-colors">
                      {tt('compress-pdf')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/tools/image-converter" className="hover:text-black dark:hover:text-white transition-colors">
                      {tt('image-converter')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/tools/compress-video" className="hover:text-black dark:hover:text-white transition-colors">
                      {tt('compress-video')}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-black/10 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-5">
                <a
                  href="https://www.linkedin.com/in/konwolorentz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Lorentz Konwo on LinkedIn"
                  className="text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="https://x.com/LorentzKonwo"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Lorentz Konwo on X"
                  className="text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                >
                  <Twitter size={18} />
                </a>
                <a
                  href="https://www.youtube.com/@konwolorentz7285"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Lorentz Konwo on YouTube"
                  className="text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                >
                  <Youtube size={18} />
                </a>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] text-gray-500 uppercase tracking-widest font-bold">
                <span>{t('copyright')}</span>
                <Link href="/privacy" className="hover:text-black dark:hover:text-white transition-colors">
                  {t('privacyNotice')}
                </Link>
                <Link href="/terms" className="hover:text-black dark:hover:text-white transition-colors">
                  {t('termsConditions')}
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
