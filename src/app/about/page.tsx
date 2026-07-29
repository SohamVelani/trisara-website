import type { Metadata } from 'next';
import AboutHero from '@/components/about/AboutHero';
import RecruitmentProcess from '@/components/about/RecruitmentProcess';
import HowWeWork from '@/components/about/HowWeWork';
import TeamSection from '@/components/about/TeamSection';
import ClosingCTA from '@/components/home/ClosingCTA';

export const metadata: Metadata = {
  title: 'About Us — TRISARA',
  description:
    'Learn about TRISARA — a Mumbai-based recruitment agency founded in 2026. Meet our founder, understand our process, and see how we work together.',
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <RecruitmentProcess />
      <HowWeWork />
      <TeamSection />
      <ClosingCTA />
    </>
  );
}
