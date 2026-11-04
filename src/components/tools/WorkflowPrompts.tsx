import React from 'react';
import {
  ArrowRight,
  FileText,
  Image as ImageIcon,
  Sparkles,
  FileSpreadsheet,
  Droplets,
  Minimize,
  Maximize,
  RefreshCw,
  FileCode,
  FileVideo,
} from 'lucide-react';
import { Link } from '@/navigation';

interface WorkflowAction {
  slug: string;
  label: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

const WORKFLOW_MAPPING: Record<string, WorkflowAction[]> = {
  'compress-pdf': [
    { slug: 'pdf-to-word', label: 'Convert to Word', description: 'Need to edit this PDF?', icon: FileText, color: 'text-blue-500' },
    { slug: 'watermark', label: 'Add Watermark', description: 'Protect your document', icon: Droplets, color: 'text-purple-500' },
  ],
  'pdf-to-word': [
    { slug: 'compress-pdf', label: 'Compress PDF', description: 'Make the file smaller', icon: Minimize, color: 'text-rose-500' },
    { slug: 'word-to-pdf', label: 'Convert Back to PDF', description: 'Lock document formatting', icon: FileText, color: 'text-indigo-500' },
  ],
  'word-to-pdf': [
    { slug: 'compress-pdf', label: 'Compress PDF', description: 'Reduce PDF file size', icon: Minimize, color: 'text-rose-500' },
    { slug: 'watermark', label: 'Add Watermark', description: 'Stamp confidential pages', icon: Droplets, color: 'text-blue-500' },
  ],
  'pdf-to-excel': [
    { slug: 'excel-to-csv', label: 'Excel to CSV', description: 'Export clean CSV data', icon: FileCode, color: 'text-emerald-500' },
    { slug: 'compress-pdf', label: 'Compress PDF', description: 'Shrink source PDF size', icon: Minimize, color: 'text-rose-500' },
  ],
  'resize': [
    { slug: 'compress-images', label: 'Compress Image', description: 'Reduce file size for web', icon: Minimize, color: 'text-lime-500' },
    { slug: 'image-converter', label: 'Change Format', description: 'Convert to PNG, JPG, or WebP', icon: RefreshCw, color: 'text-cyan-500' },
  ],
  'compress-images': [
    { slug: 'resize', label: 'Resize Dimensions', description: 'Scale to exact pixel size', icon: Maximize, color: 'text-sky-500' },
    { slug: 'image-converter', label: 'Convert Format', description: 'Switch between PNG/JPG/WebP', icon: ImageIcon, color: 'text-cyan-500' },
  ],
  'compress-video': [
    { slug: 'video-to-gif', label: 'Convert to GIF', description: 'Create animated GIF loop', icon: FileVideo, color: 'text-pink-500' },
    { slug: 'compress-images', label: 'Compress Images', description: 'Optimize image assets', icon: Minimize, color: 'text-lime-500' },
  ],
  default: [
    { slug: 'compress-pdf', label: 'Compress PDF', description: 'Reduce document file size', icon: Minimize, color: 'text-rose-500' },
    { slug: 'pdf-to-excel', label: 'PDF to Excel', description: 'Extract tables into .xlsx', icon: FileSpreadsheet, color: 'text-emerald-500' },
  ],
};

export default function WorkflowPrompts({ currentTool }: { currentTool: string }) {
  const actions = WORKFLOW_MAPPING[currentTool] || WORKFLOW_MAPPING.default;

  return (
    <div className="mt-8 pt-8 border-t border-black/10 dark:border-white/10 w-full text-left">
      <h4 className="text-xs font-mono font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-widest flex items-center gap-2">
        <Sparkles size={15} className="text-lime-600 dark:text-[#d4ff33]" />
        Suggested Next Step
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action) => (
          <Link
            key={action.slug}
            href={`/tools/${action.slug}`}
            className="group p-4 bg-gray-50 dark:bg-white/[0.03] border border-black/10 dark:border-white/10 rounded-2xl flex items-center gap-4 hover:border-black/30 dark:hover:border-[#d4ff33]/40 hover:bg-white dark:hover:bg-white/[0.06] transition-all shadow-xs hover:shadow-md"
          >
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center bg-white dark:bg-black/30 shrink-0 ${action.color} border border-black/5 dark:border-white/10`}
            >
              <action.icon size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium mb-0.5">{action.description}</p>
              <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-black dark:group-hover:text-[#d4ff33] transition-colors truncate">
                {action.label}
              </p>
            </div>
            <div className="shrink-0">
              <ArrowRight
                size={16}
                className="text-gray-400 group-hover:text-black dark:group-hover:text-[#d4ff33] group-hover:translate-x-1 transition-all"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
