import Link from 'next/link';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

export default function ClosingCTA() {
  return (
    <section id="closing-cta" className="py-20 lg:py-28 bg-white">
      <div className="section-container">
        <AnimateOnScroll animation="reveal">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-brand px-8 sm:px-12 lg:px-20 py-14 lg:py-20 text-center">
            {/* Background decorative */}
            <div aria-hidden="true" className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-white/8 blur-3xl pointer-events-none" />
            <div aria-hidden="true" className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-black/10 blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <p className="text-sm font-semibold uppercase tracking-widest text-white/70 mb-3">
                Let&apos;s Get Started
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                Let&apos;s Build Your Team Together.
              </h2>
              <p className="text-white/80 text-base sm:text-lg max-w-xl mx-auto mb-10">
                Reach out to get started — whether you have an open role today or are planning ahead, we&apos;re here to help.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-trisara-blue-600 font-bold text-base shadow-xl
                           hover:shadow-2xl hover:scale-[1.03] transition-all duration-300"
              >
                Get in Touch
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
