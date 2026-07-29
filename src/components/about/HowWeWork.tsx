import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import SectionHeading from '@/components/ui/SectionHeading';

const steps = [
  {
    number: '01',
    title: 'Kickoff Call & JD Alignment',
    description: 'We get aligned on the role, the team, the culture, and what success looks like before anything else.',
  },
  {
    number: '02',
    title: 'Dedicated Recruiter Assigned',
    description: 'One recruiter owns your mandate end-to-end — you always know who to call.',
  },
  {
    number: '03',
    title: 'Weekly Progress Updates',
    description: 'Regular check-ins on pipeline status, sourcing quality, and any market feedback we gather.',
  },
  {
    number: '04',
    title: 'Interview Coordination',
    description: 'We handle scheduling, candidate preparation, and post-interview feedback collection.',
  },
  {
    number: '05',
    title: 'Offer, Onboarding & Support',
    description: 'We stay engaged through offer acceptance, notice period, and joining — ensuring no last-minute dropouts.',
  },
];

export default function HowWeWork() {
  return (
    <section id="how-we-work" className="py-20 lg:py-28 bg-gradient-section">
      <div className="section-container">
        <AnimateOnScroll className="mb-12 lg:mb-16" animation="reveal">
          <SectionHeading
            eyebrow="How We Work Together"
            title="A Partnership, Not a Transaction"
            subtitle="When you engage Trisara, here's exactly how the relationship is structured from day one."
          />
        </AnimateOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <AnimateOnScroll
              key={step.number}
              delay={(((i % 3) + 1) as 1 | 2 | 3)}
              className="card-base group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-brand opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />
              <div className="text-5xl font-black text-gray-100 group-hover:text-trisara-teal-100 transition-colors duration-300 mb-3 leading-none select-none">
                {step.number}
              </div>
              <h3 className="text-base font-bold text-trisara-dark mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {step.description}
              </p>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
