import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

export default function AboutHero() {
  return (
    <section
      id="about-hero"
      className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-gradient-hero"
    >
      {/* Background orbs */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-trisara-teal-600/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-trisara-blue-600/10 blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        <AnimateOnScroll animation="reveal">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-trisara-teal-300 mb-4">
              About Us
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Recruitment That Goes{' '}
              <span className="text-gradient-light">Beyond the Brief.</span>
            </h1>
            <div className="h-1 w-16 rounded-full bg-gradient-brand mb-6" />
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
              Founded in 2026 and headquartered in Mumbai, TRISARA is a recruitment agency built to be more than just a vendor. We work as an extension of your HR team — combining hands-on sourcing with clear, honest communication at every step of the hiring journey.
            </p>
            <p className="text-gray-400 text-base leading-relaxed max-w-2xl">
              Our focus on targeted, relationship-led recruitment means deeper expertise, stronger networks, and better outcomes for the businesses and candidates we work with. Every placement reflects our commitment to fit, quality, and accountability — not just speed.
            </p>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
