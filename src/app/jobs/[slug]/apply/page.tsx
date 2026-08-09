import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { IJob } from '@/models/Job';
import ApplicationForm from '@/components/jobs/ApplicationForm';
import Link from 'next/link';
import dbConnect from '@/lib/mongodb';
import Job from '@/models/Job';

type Props = {
  params: Promise<{ slug: string }>;
};

async function getJob(slug: string): Promise<IJob | null> {
  await dbConnect();
  const job = await Job.findOne({ slug }).lean();
  if (!job) return null;
  return JSON.parse(JSON.stringify(job));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJob(slug);
  if (!job) return { title: 'Job Not Found | Trisara HR Solutions' };
  return {
    title: `Apply for ${job.title} | Trisara HR Solutions`,
    description: `Apply for the ${job.title} role in ${job.location} with Trisara HR Solutions.`,
  };
}

// Adapter so ApplicationForm (which expects the old data shape) works with the new DB model
function adaptJob(job: IJob) {
  return {
    id: job._id,
    slug: job.slug,
    title: job.title,
    industry: job.department,
    location: job.location,
    type: job.jobType as 'Full-time' | 'Contract',
    description: job.shortSummary,
    experience: job.experienceLevel || '',
    salary: job.showSalary ? job.salaryRange : undefined,
    responsibilities: job.responsibilities || [],
    requirements: job.requiredSkills || [],
    fullDescription: job.fullDescription,
  };
}

export default async function ApplyPage({ params }: Props) {
  const { slug } = await params;
  const job = await getJob(slug);

  // Return 404 for new visitors if job doesn't exist or isn't Active
  if (!job || job.status !== 'Active') {
    notFound();
  }

  const adapted = adaptJob(job);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* ── Dark Header Section for Navbar Visibility ── */}
      <section className="bg-gradient-hero pt-32 pb-14 lg:pt-40 lg:pb-16 border-b border-white/10">
        <div className="section-container max-w-6xl">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to all jobs
          </Link>

          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 mb-4">
                {job.department}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                {job.title}
              </h1>
              <div className="flex items-center gap-2 text-slate-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {job.location}, India
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content Grid ── */}
      <div className="section-container max-w-6xl mt-10 lg:mt-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">

          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-10">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">About the Role</h2>
              {job.fullDescription ? (
                <p className="text-slate-600 leading-relaxed whitespace-pre-line">{job.fullDescription}</p>
              ) : (
                <p className="text-slate-600 leading-relaxed">{job.shortSummary}</p>
              )}
            </section>

            {adapted.responsibilities.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4">Key Responsibilities</h2>
                <ul className="space-y-3">
                  {adapted.responsibilities.map((req: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 leading-relaxed">
                      <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {adapted.requirements.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4">Requirements & Experience</h2>
                <ul className="space-y-3">
                  {adapted.requirements.map((req: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 leading-relaxed">
                      <svg className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Right Column: Sidebar & Form */}
          <div className="lg:col-span-1 space-y-8">
            {/* Meta Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Job Overview</h3>
              <div className="space-y-5">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Recruiting Partner</p>
                  <p className="font-medium text-slate-900">Trisara HR Solutions</p>
                </div>
                <div className="w-full h-px bg-slate-100" />
                <div>
                  <p className="text-sm text-slate-500 mb-1">Employment Type</p>
                  <p className="font-medium text-slate-900">{job.jobType}</p>
                </div>
                <div className="w-full h-px bg-slate-100" />
                <div>
                  <p className="text-sm text-slate-500 mb-1">Location</p>
                  <p className="font-medium text-slate-900">{job.location}, India</p>
                </div>
                {job.showSalary && job.salaryRange && (
                  <>
                    <div className="w-full h-px bg-slate-100" />
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Approximate Salary</p>
                      <p className="font-medium text-slate-900">{job.salaryRange}</p>
                    </div>
                  </>
                )}
                {job.numberOfOpenings && job.numberOfOpenings > 1 && (
                  <>
                    <div className="w-full h-px bg-slate-100" />
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Openings</p>
                      <p className="font-medium text-slate-900">{job.numberOfOpenings}</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Application Form */}
            <ApplicationForm job={adapted as any} />
          </div>
        </div>
      </div>
    </div>
  );
}
