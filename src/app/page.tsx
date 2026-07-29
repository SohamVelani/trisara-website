import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import WhoWeAre from '@/components/home/WhoWeAre';
import OurApproach from '@/components/home/OurApproach';
import WhatWeOffer from '@/components/home/WhatWeOffer';
import IndustriesWeServe from '@/components/home/IndustriesWeServe';
import WhyChooseTrisara from '@/components/home/WhyChooseTrisara';
import ClosingCTA from '@/components/home/ClosingCTA';

export const metadata: Metadata = {
  title: 'TRISARA — Your Recruitment Partner | Mumbai',
  description:
    'TRISARA is a Mumbai-based recruitment agency. We manage the full hiring lifecycle — permanent staffing, executive search, contract hiring, and more. Hire with speed, precision, and accountability.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <OurApproach />
      <WhatWeOffer />
      <IndustriesWeServe />
      <WhyChooseTrisara />
      <ClosingCTA />
    </>
  );
}
