import React from 'react';
import '../index.css';
import type { Metadata } from 'next';

const SITE_URL = 'https://refinedocs.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Refinedocs – 100% Free Document & Image Tools | No Sign-Up Required',
    template: '%s | Refinedocs – Free Tools',
  },
  description:
    '100% free online document and image tools — no account, no watermarks, no limits. Convert PDF to Excel, Word & CSV, convert images, compress files & more. 100% client-side privacy.',
  keywords: [
    'free PDF converter',
    'free online tools no sign up',
    'free document converter',
    'free image tools',
    'PDF to Excel free',
    'PDF to Word free',
    'PDF to CSV free',
    'PDF to JPG free',
    'PDF to image free',
    'Word to PDF free',
    'Excel to PDF free',
    'CSV to PDF free',
    'Excel to CSV free',
    'CSV to Excel free',
    'compress PDF free',
    'compress video free',
    'compress image free',
    'free image compressor',
    'free image resizer',
    'free image converter',
    'free watermark tool',
    'HEIC to PNG free',
    'HEIC to JPG free',
    'SVG to PNG free',
    'video to GIF free',
    'free file converter',
    'no watermark free tools',
    'no registration free tools',
    'no account needed free tools',
    'Refinedocs',
  ],
  authors: [{ name: 'Refinedocs' }],
  creator: 'Refinedocs',
  publisher: 'Refinedocs',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Refinedocs',
    title: 'Refinedocs – 100% Free Document & Image Tools | No Sign-Up Required',
    description:
      '100% free online tools — no account, no watermarks, no limits. Convert PDF, compress images, convert documents & more. 100% client-side privacy.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1024,
        height: 1024,
        alt: 'Refinedocs – All-in-One Document & Image Tools',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Refinedocs – 100% Free Document & Image Tools | No Sign-Up Required',
    description:
      '100% free online tools — no account needed. Convert PDF, compress files, convert formats & more. 100% client-side privacy.',
    images: ['/og-image.jpg'],
    creator: '@refinedocs',
  },
  icons: {
    icon: '/favicon.ico',
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      'x-default': SITE_URL,
      'en': `${SITE_URL}/en`,
      'es': `${SITE_URL}/es`,
      'fr': `${SITE_URL}/fr`,
      'it': `${SITE_URL}/it`,
      'pt-PT': `${SITE_URL}/pt-PT`,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
