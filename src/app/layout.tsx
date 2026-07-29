import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
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
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
