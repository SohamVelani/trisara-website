import Link from 'next/link';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero"
    >
      {/* Background decorative elements */}
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        {/* Soft glow orbs */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-trisara-blue-600/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-trisara-teal-500/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-trisara-blue-800/8 blur-3xl" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="section-container relative z-10 py-32 pt-40 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/8 border border-white/12 text-trisara-teal-300 text-xs font-semibold uppercase tracking-widest mb-8 animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-trisara-teal-400 animate-pulse-soft" />
          Recruitment Specialists · Mumbai
        </div>

        {/* Main heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6 animate-fade-in-up">
          <span className="block">TRISARA —</span>
          <span className="block text-gradient-light">Your Recruitment</span>
          <span className="block">Partner.</span>
        </h1>

        {/* Subtext */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-300 leading-relaxed mb-10 animate-fade-in-up-slow">
          A firm built to help growing businesses hire with{' '}
          <span className="text-trisara-teal-300 font-medium">speed</span>,{' '}
          <span className="text-trisara-teal-300 font-medium">precision</span>, and{' '}
          <span className="text-trisara-teal-300 font-medium">accountability</span>.
          We manage the full hiring lifecycle — working as an extension of your HR team.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up-slow">
          <Link href="/contact" className="btn-primary text-base px-8 py-3.5">
            Get in Touch
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link href="/about" className="btn-primary-light text-base px-8 py-3.5 !text-trisara-blue-700">
            Learn About Us
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="mt-20 flex justify-center animate-fade-in-up-slow">
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <div className="w-px h-10 bg-gradient-to-b from-gray-500 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
