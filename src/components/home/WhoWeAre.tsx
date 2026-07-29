import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import SectionHeading from '@/components/ui/SectionHeading';

const stats = [
  { value: '2026', label: 'Year Founded' },
  { value: 'Mumbai', label: 'Headquartered In' },
  { value: 'Recruitment', label: 'Specialization' },
];

export default function WhoWeAre() {
  return (
    <section id="who-we-are" className="py-20 lg:py-28 bg-white">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text */}
          <AnimateOnScroll animation="reveal-left">
            <SectionHeading
              eyebrow="Who We Are"
              title="More Than a Vendor. An Extension of Your Team."
              subtitle="Trisara manages the full hiring lifecycle — from understanding a role deeply to placing a candidate who fits and stays. We work as an extension of your HR team, not just a vendor, combining hands-on sourcing with clear, honest communication at every step."
            />
          </AnimateOnScroll>

          {/* Right: Stats */}
          <AnimateOnScroll animation="reveal-right">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6">
              {stats.map((stat, i) => (
                <AnimateOnScroll
                  key={stat.label}
                  delay={(i + 1) as 1 | 2 | 3}
                  className="flex items-center gap-5 p-5 rounded-2xl bg-trisara-light border border-gray-100 hover:border-trisara-teal-200 transition-all duration-300 group"
                >
                  <div className="w-1 h-14 rounded-full bg-gradient-brand flex-shrink-0 group-hover:h-16 transition-all duration-300" />
                  <div>
                    <div className="stat-number">{stat.value}</div>
                    <div className="text-sm text-gray-500 font-medium mt-0.5">{stat.label}</div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
