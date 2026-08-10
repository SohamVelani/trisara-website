import type { Metadata } from 'next';
import { Inter, Jost } from 'next/font/google';
import './globals.css';
import LayoutWrapper from '@/components/layout/LayoutWrapper';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

/** Jost — closest free match to the geometric thin-tracked wordmark in the logo */
const jost = Jost({
  subsets: ['latin'],
  weight: ['200', '300'],
  display: 'swap',
  variable: '--font-jost',
});

export const metadata: Metadata = {
  title: {
    default: 'TRISARA — Recruitment Agency | Mumbai',
    template: '%s | TRISARA',
  },
  description:
    'TRISARA is a Mumbai-based recruitment agency helping growing businesses hire with speed, precision, and accountability. Permanent staffing, executive search, contract hiring, and more.',
  keywords: [
    'recruitment agency',
    'Mumbai recruitment',
    'permanent staffing',
    'executive search',
    'contract staffing',
    'IT hiring',
    'BFSI recruitment',
    'Trisara',
  ],
  authors: [{ name: 'TRISARA' }],
  creator: 'TRISARA',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://trisara.in',
    siteName: 'TRISARA',
    title: 'TRISARA — Recruitment Agency | Mumbai',
    description:
      'Helping growing businesses hire with speed, precision, and accountability. Mumbai-based recruitment specialists.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TRISARA — Recruitment Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TRISARA — Recruitment Agency',
    description: 'Helping growing businesses hire with speed, precision, and accountability.',
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL('https://trisara.in'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jost.variable}`}>
      <body className="font-sans antialiased">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
