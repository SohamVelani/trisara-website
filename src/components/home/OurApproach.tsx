import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import SectionHeading from '@/components/ui/SectionHeading';

const steps = [
  {
    number: '01',
    title: 'Requirement Scoping',
    description:
      'We start by deeply understanding your role requirements, team structure, and must-have skills before sourcing begins.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Talent Mapping & Sourcing',
    description:
      'Our recruiters map the active and passive talent pool specific to your industry, function, and seniority level.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Rigorous Screening',
    description:
      'Every candidate is screened for skills, experience, and communication fit before a profile ever reaches your desk.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Culture & Fit Assessment',
    description:
      'We assess alignment with your company\'s working style so shortlists convert into offers faster.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
];

export default function OurApproach() {
  return (
    <section id="our-approach" className="py-20 lg:py-28 bg-gradient-section">
      <div className="section-container">
        <AnimateOnScroll className="mb-12 lg:mb-16" animation="reveal">
          <SectionHeading
            eyebrow="Our Approach"
            title="A Process Built for Results"
            subtitle="Every engagement follows a structured, proven methodology — so you get candidates who are qualified, vetted, and aligned with your team."
            centered
          />
        </AnimateOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <AnimateOnScroll
              key={step.number}
              delay={(i + 1) as 1 | 2 | 3 | 4}
              className="card-base group relative overflow-hidden"
            >
              {/* Subtle gradient hover overlay */}
              <div className="absolute inset-0 bg-gradient-brand-soft opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

              <div className="relative z-10">
                {/* Step number */}
                <div className="text-4xl font-black text-gray-100 group-hover:text-trisara-teal-100 transition-colors duration-300 mb-3 leading-none select-none">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="icon-circle mb-4">
                  {step.icon}
                </div>

                <h3 className="text-base font-bold text-trisara-dark mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
