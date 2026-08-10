import type { Metadata } from 'next';
import Link from 'next/link';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import SectionHeading from '@/components/ui/SectionHeading';
import dbConnect from '@/lib/mongodb';
import Job from '@/models/Job';
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Job Postings | Trisara HR Solutions',
  description:
    'Explore current job openings across IT & Technology, Manufacturing, and Pharma sectors in India. Find your next career opportunity with Trisara HR Solutions.',
  openGraph: {
    title: 'Job Postings | Trisara HR Solutions',
    description:
      'Active positions across IT & Technology, Manufacturing, and Pharma. Apply directly and our team will be in touch within one business day.',
  },
};

// Revalidate every 60 seconds so new jobs appear without a full redeploy
export const revalidate = 60;

async function getActiveJobs() {
  await dbConnect();
  const jobs = await Job.find({ status: 'Active' })
    .sort({ postedDate: -1 })
    .select('title department location jobType experienceLevel salaryRange showSalary shortSummary slug postedDate')
    .lean();
  return JSON.parse(JSON.stringify(jobs));
}

/* ─── Badge helpers ─────────────────────────────────────────────────────────── */
function IndustryBadge({ industry }: { industry: string }) {
  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200"
      aria-label={`Industry: ${industry}`}
    >
      {industry}
    </span>
  );
}

function TypeBadge({ type }: { type: string }) {
  const isFullTime = type === 'Full-time';
  return (
    <span
      className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
        isFullTime
          ? 'bg-slate-100 text-slate-700 border-slate-200'
          : 'bg-indigo-50 text-indigo-700 border-indigo-200'
      }`}
    >
      {type}
    </span>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────────── */
export default async function JobPostingsPage() {
  const jobs = await getActiveJobs();

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        id="jobs-hero"
        className="relative pt-32 pb-14 lg:pt-40 lg:pb-20 overflow-hidden bg-gradient-hero"
      >
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-trisara-blue-600/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-trisara-teal-500/10 blur-3xl" />
        </div>
        <div className="section-container relative z-10 text-center">
          <AnimateOnScroll animation="reveal">
            <p className="text-xs font-semibold uppercase tracking-widest text-trisara-teal-300 mb-3">
              We&apos;re Hiring
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              Current <span className="text-gradient-light">Openings</span>
            </h1>
            <p className="text-gray-300 text-base sm:text-lg max-w-xl mx-auto">
              Explore active positions across IT &amp; Technology, Manufacturing, and Pharma.
              Hit &ldquo;Apply Now&rdquo; and our team will reach out within one business day.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── Job Cards Grid ───────────────────────────────────────────────── */}
      <section id="job-listings" className="py-16 lg:py-24 bg-slate-50">
        <div className="section-container">
          <AnimateOnScroll className="mb-12 lg:mb-16" animation="reveal">
            <SectionHeading
              eyebrow="Active Positions"
              title="Find Your Next Opportunity"
              subtitle="Hand-picked roles across three industries. No company names are shared — your application goes directly to our team who will match you to the right employer."
              centered
              light={false}
            />
          </AnimateOnScroll>

          {jobs.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <p className="text-lg font-medium">No active openings right now.</p>
              <p className="text-sm mt-2">Check back soon or get in touch directly.</p>
              <Link href="/contact" className="mt-6 inline-block text-blue-600 hover:underline text-sm font-medium">
                Contact us →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job: import('@/models/Job').IJob, i: number) => (
                <AnimateOnScroll
                  key={job._id}
                  delay={(((i % 3) + 1) as 1 | 2 | 3)}
                  animation="reveal"
                  className="h-full"
                >
                  <div
                    className="group relative bg-white rounded-2xl border border-slate-200
                               shadow-sm hover:shadow-md hover:border-blue-300
                               hover:-translate-y-1.5 transition-all duration-300
                               overflow-hidden h-full flex flex-col"
                  >
                    <div className="h-0.5 w-0 group-hover:w-full bg-blue-600 transition-all duration-500" />
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-start justify-between gap-2 mb-4 flex-wrap">
                        <IndustryBadge industry={job.department} />
                        <TypeBadge type={job.jobType} />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug">
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
                        <svg className="w-3.5 h-3.5 flex-shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{job.location}, India</span>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-1">
                        {job.shortSummary}
                      </p>
                      {job.experienceLevel && (
                        <div className="flex items-center gap-2 mb-5">
                          <svg className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                          <span className="text-xs font-semibold text-blue-600">
                            {job.experienceLevel}
                          </span>
                        </div>
                      )}
                      <Link
                        href={`/jobs/${job.slug}/apply`}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 justify-center mt-auto"
                      >
                        Apply Now
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Closing CTA ──────────────────────────────────────────────────── */}
      <section id="jobs-cta" className="py-14 lg:py-20 bg-gradient-hero border-t border-white/5">
        <div className="section-container text-center">
          <AnimateOnScroll animation="reveal">
            <p className="text-xs font-semibold uppercase tracking-widest text-trisara-teal-300 mb-3">
              Don&apos;t see the right fit?
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Send Us Your Profile</h2>
            <p className="text-gray-300 text-sm sm:text-base max-w-md mx-auto mb-7">
              We&apos;re always looking for exceptional talent. Share your CV and we&apos;ll reach out the moment a relevant opportunity opens up.
            </p>
            <Link href="/contact" id="jobs-contact-cta" className="btn-primary">
              Get in Touch
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
