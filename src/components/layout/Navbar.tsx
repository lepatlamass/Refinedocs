import { getTranslations } from 'next-intl/server';
import { Link } from '../../navigation';
import LanguageSwitcher from '../LanguageSwitcher';
import { ThemeToggle } from '../ThemeToggle';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';

export default async function Navbar() {
  const tCommon = await getTranslations('Common');

  return (
    <header className="h-16 border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between px-4 sm:px-8 bg-white/85 dark:bg-[#0a0b0e]/85 backdrop-blur-md sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-[#d4ff33] rounded-lg flex items-center justify-center text-black font-black text-lg shadow-sm border border-black/10 group-hover:scale-105 transition-transform">
              R
            </div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-black dark:text-white">
                Refinedocs
              </span>
              <span className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-black/5 dark:bg-white/[0.07] text-gray-600 dark:text-gray-300 border border-black/5 dark:border-white/10">
                <ShieldCheck className="w-3 h-3 text-emerald-500 dark:text-[#d4ff33]" />
                LOCAL
              </span>
            </div>
          </Link>

          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-700 hover:text-black hover:bg-black/5 dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/5 transition-colors"
            >
              {tCommon('home')}
            </Link>
            <Link
              href="/#tools-explorer"
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-700 hover:text-black hover:bg-black/5 dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/5 transition-colors"
            >
              {tCommon('tools')}
            </Link>
            <Link
              href="/#solutions"
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-700 hover:text-black hover:bg-black/5 dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/5 transition-colors"
            >
              {tCommon('solutions')}
            </Link>
            <Link
              href="/faq"
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-700 hover:text-black hover:bg-black/5 dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/5 transition-colors"
            >
              {tCommon('faqs')}
            </Link>
            <Link
              href="/blog"
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-700 hover:text-black hover:bg-black/5 dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/5 transition-colors"
            >
              {tCommon('blog')}
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <ThemeToggle />
          <LanguageSwitcher />
          <Link
            href="/tools/pdf-to-excel"
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 bg-black text-white dark:bg-[#d4ff33] dark:text-black text-xs font-bold rounded-xl hover:opacity-90 dark:hover:bg-[#bce622] transition-all whitespace-nowrap shadow-sm"
          >
            <span>{tCommon('tools')}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
