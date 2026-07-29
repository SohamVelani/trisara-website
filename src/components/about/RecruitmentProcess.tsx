import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import SectionHeading from '@/components/ui/SectionHeading';

const steps = [
  {
    number: '01',
    title: 'Requirement Brief',
    description: 'Kickoff call to align on role requirements, team structure, and the profile you\'re looking for.',
  },
  {
    number: '02',
    title: 'Sourcing & Mapping',
    description: 'Targeted search across our talent network — active and passive candidates mapped to your exact brief.',
  },
  {
    number: '03',
    title: 'Screening & Shortlist',
    description: 'Skills, experience, and communication fit verified before any profile reaches your desk.',
  },
  {
    number: '04',
    title: 'Client Interviews',
    description: 'We coordinate scheduling, manage the feedback loop, and keep the process moving efficiently.',
  },
  {
    number: '05',
    title: 'Offer & Onboarding',
    description: 'Support through offer negotiation, acceptance, and joining day — we don\'t disappear post-shortlist.',
  },
];

export default function RecruitmentProcess() {
  return (
    <section id="recruitment-process" className="py-20 lg:py-28 bg-white">
      <div className="section-container">
        <AnimateOnScroll className="mb-12 lg:mb-16" animation="reveal">
          <SectionHeading
            eyebrow="Our Recruitment Process"
            title="From Brief to Joining Day"
            subtitle="A structured, transparent process that keeps you informed at every stage — no black boxes."
          />
        </AnimateOnScroll>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-trisara-blue-300 via-trisara-teal-300 to-transparent hidden sm:block" aria-hidden="true" />

          <div className="space-y-8">
            {steps.map((step, i) => (
              <AnimateOnScroll
                key={step.number}
                delay={(Math.min(i + 1, 6) as 1 | 2 | 3 | 4 | 5 | 6)}
                animation="reveal-left"
                className="relative flex gap-6 sm:gap-8 pl-0 sm:pl-16"
              >
                {/* Step circle */}
                <div className="absolute left-0 top-1 hidden sm:flex w-12 h-12 rounded-full bg-gradient-brand text-white items-center justify-center font-bold text-sm shadow-brand flex-shrink-0">
                  {step.number}
                </div>

                {/* Card */}
                <div className="flex-1 card-base flex gap-4 items-start">
                  {/* Mobile step number */}
                  <div className="sm:hidden flex-shrink-0 w-10 h-10 rounded-full bg-gradient-brand text-white flex items-center justify-center font-bold text-xs shadow-brand">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-trisara-dark mb-1.5">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
