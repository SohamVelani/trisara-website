import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import SectionHeading from '@/components/ui/SectionHeading';

export default function TeamSection() {
  return (
    <section id="team" className="py-20 lg:py-28 bg-white">
      <div className="section-container">
        <AnimateOnScroll className="mb-12 lg:mb-16" animation="reveal">
          <SectionHeading
            eyebrow="Meet Our Team"
            title="The Team"
          />
        </AnimateOnScroll>

        <AnimateOnScroll delay={1} animation="reveal">
          <div className="group relative overflow-hidden rounded-2xl bg-trisara-light border border-gray-100 p-7 max-w-xs
                         hover:border-trisara-teal-200 hover:shadow-card transition-all duration-300">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-trisara-blue-500 to-trisara-teal-500 flex items-center justify-center
                            text-white font-bold text-xl mb-5 shadow-sm group-hover:scale-105 transition-transform duration-300">
              SV
            </div>

            {/* Info */}
            <h3 className="text-lg font-bold text-trisara-dark mb-1">Soham Velani</h3>
            <p className="text-trisara-teal-600 text-sm font-medium">Founder</p>

            {/* Bottom accent */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-brand opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
