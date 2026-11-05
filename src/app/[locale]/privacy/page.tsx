import { getTranslations } from 'next-intl/server';
import { Link } from '../../../navigation';
import Navbar from '../../../components/layout/Navbar';
import ToolsDirectory from '../../../components/layout/ToolsDirectory';
import Footer from '../../../components/layout/Footer';
import type { Metadata } from 'next';
import { locales } from '../../../i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = 'https://refinedocs.com';

  const languages: Record<string, string> = {
    'x-default': `${siteUrl}/en/privacy`,
  };
  for (const loc of locales) {
    languages[loc] = `${siteUrl}/${loc}/privacy`;
  }

  return {
    title: 'Privacy Policy | Refinedocs',
    description: 'Privacy Policy for Refinedocs — 100% Client-Side, Open-Source Document & Media Processing.',
    alternates: {
      canonical: `${siteUrl}/${locale}/privacy`,
      languages,
    },
    openGraph: {
      title: 'Privacy Policy | Refinedocs',
      description: 'Privacy Policy for Refinedocs — 100% Client-Side, Open-Source Document & Media Processing.',
      url: `${siteUrl}/${locale}/privacy`,
      type: 'website',
    },
  };
}

export default async function PrivacyPage() {
  const tCommon = await getTranslations('Common');
  
  return (
    <div className="min-h-screen bg-white dark:bg-[#111111] text-black dark:text-white font-sans selection:bg-[#d4ff33] selection:text-black">
      <Navbar />
      
      <main className="py-20 px-6 sm:px-12">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-[#d4ff33] hover:underline mb-12 inline-block text-sm">
            ← {tCommon('home')}
          </Link>
          <h1 className="text-3xl font-extrabold mb-8 tracking-tight">{tCommon('privacyNotice')}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-12">Last updated: November 2026</p>

          <div className="prose prose-sm dark:prose-invert max-w-none text-[15px] leading-relaxed space-y-8">
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-900 dark:text-emerald-300">
              <h3 className="text-lg font-bold mb-2">Privacy by Design: 0 Bytes Uploaded</h3>
              <p className="text-sm m-0">
                Refinedocs is an open-source, client-side application. All document transformations, image conversions, and video processing execute entirely inside your local web browser using WebAssembly and HTML5 Canvas. Your files are never uploaded to any remote server or stored anywhere on the cloud.
              </p>
            </div>

            <section className="space-y-4">
              <h2 className="text-xl font-bold">1. No User Accounts & No Personal Profiles</h2>
              <p>
                Refinedocs does not require or offer user registration, login accounts, passwords, or personal profiles. You can use every tool in the suite anonymously and without providing an email address, name, or phone number.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold">2. Local-Only Document & File Processing</h2>
              <p>
                When you select or drop a file into any Refinedocs utility (e.g., PDF to Excel, Compress PDF, HEIC to PNG, Video to GIF):
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The file is loaded directly into your browser&apos;s memory.</li>
                <li>Processing runs on your local CPU / GPU via WebAssembly (such as PDF.js, SheetJS, pdf-lib, and FFmpeg WASM) and HTML5 Canvas APIs.</li>
                <li>Converted files are generated on your computer and saved directly to your local device.</li>
                <li>No copies of your source files or generated results are ever transmitted across the internet to our servers.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold">3. No Payment Information & No Subscriptions</h2>
              <p>
                Refinedocs is 100% free and open source under the Apache-2.0 license. There are no paid tiers, subscriptions, paywalls, or credit packages. We do not collect credit card information, bank details, or billing addresses.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold">4. Zero Telemetry, Analytics, or Tracking Cookies</h2>
              <p>
                We do not use tracking cookies, cross-site trackers, advertising networks, or third-party behavioral analytics. Your session data remains strictly in your browser. Any temporary caching uses standard browser storage (such as IndexedDB) solely to allow seamless file saving on your own computer.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold">5. Open Source Code Verification</h2>
              <p>
                Because Refinedocs is open source, anyone can inspect, audit, and verify our client-side architecture directly on GitHub at{' '}
                <a
                  href="https://github.com/lepatlamass/Refinedocs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lime-600 dark:text-[#d4ff33] underline font-medium"
                >
                  github.com/lepatlamass/Refinedocs
                </a>.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold">6. Contact</h2>
              <p>
                If you have questions about this Privacy Policy or wish to contribute to the open-source project, please reach out via GitHub or email us at{' '}
                <a href="mailto:contact@refinedocs.com" className="text-lime-600 dark:text-[#d4ff33] underline">
                  contact@refinedocs.com
                </a>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <ToolsDirectory />
      <Footer />
    </div>
  );
}
