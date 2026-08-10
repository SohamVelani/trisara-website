import Link from 'next/link';
import dbConnect from '@/lib/mongodb';
import Job from '@/models/Job';
import DashboardClient from './DashboardClient';
export const dynamic = 'force-dynamic';

async function getJobs() {
  await dbConnect();
  const jobs = await Job.find({})
    .sort({ postedDate: -1 })
    .select('title department status postedDate slug jobType')
    .lean();
  return JSON.parse(JSON.stringify(jobs)); // serialise for client
}

export default async function AdminDashboard() {
  const jobs = await getJobs();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header row */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Job Postings</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {jobs.length} total posting{jobs.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link
          href="/admin/jobs/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Job
        </Link>
      </div>

      <DashboardClient jobs={jobs} />
    </div>
  );
}
