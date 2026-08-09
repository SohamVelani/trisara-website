'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Job {
  _id: string;
  title: string;
  department: string;
  status: 'Draft' | 'Active' | 'Closed';
  postedDate: string;
  slug: string;
  jobType: string;
}

const STATUS_STYLES: Record<string, string> = {
  Draft: 'bg-slate-100 text-slate-600 border-slate-200',
  Active: 'bg-green-50 text-green-700 border-green-200',
  Closed: 'bg-red-50 text-red-700 border-red-200',
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${STATUS_STYLES[status] ?? 'bg-slate-100 text-slate-600'}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
          status === 'Active' ? 'bg-green-500' : status === 'Closed' ? 'bg-red-400' : 'bg-slate-400'
        }`}
      />
      {status}
    </span>
  );
}

export default function DashboardClient({ jobs: initial }: { jobs: Job[] }) {
  const [jobs, setJobs] = useState(initial);

  const handleStatusToggle = async (id: string) => {
    const res = await fetch(`/api/admin/jobs/${id}/status`, { method: 'PATCH' });
    if (res.ok) {
      const { status } = await res.json();
      setJobs(prev => prev.map(j => (j._id === id ? { ...j, status } : j)));
    }
  };

  const handleDelete = async (id: string, title: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${title}"?\n\nThis is irreversible. Unlike "Close", deletion permanently removes the posting from the database.`
    );
    if (!confirmed) return;

    const res = await fetch(`/api/admin/jobs/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setJobs(prev => prev.filter(j => j._id !== id));
    } else {
      alert('Failed to delete job. Please try again.');
    }
  };

  if (jobs.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center shadow-sm">
        <svg className="w-12 h-12 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="text-slate-500 font-medium mb-4">No job postings yet</p>
        <Link
          href="/admin/jobs/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors text-sm"
        >
          Create your first job
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="text-left px-5 py-3.5 font-semibold text-slate-600">Title</th>
              <th className="text-left px-5 py-3.5 font-semibold text-slate-600 hidden sm:table-cell">Department</th>
              <th className="text-left px-5 py-3.5 font-semibold text-slate-600">Status</th>
              <th className="text-left px-5 py-3.5 font-semibold text-slate-600 hidden md:table-cell">Posted</th>
              <th className="text-right px-5 py-3.5 font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {jobs.map(job => (
              <tr key={job._id} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-4">
                  <div>
                    <p className="font-semibold text-slate-900">{job.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">/jobs/{job.slug}/apply</p>
                  </div>
                </td>
                <td className="px-5 py-4 text-slate-600 hidden sm:table-cell">{job.department}</td>
                <td className="px-5 py-4">
                  <StatusBadge status={job.status} />
                </td>
                <td className="px-5 py-4 text-slate-500 hidden md:table-cell">
                  {new Date(job.postedDate).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2 justify-end flex-wrap">
                    {/* Edit */}
                    <Link
                      href={`/admin/jobs/${job._id}/edit`}
                      className="text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                      Edit
                    </Link>

                    {/* Quick status cycle */}
                    <button
                      onClick={() => handleStatusToggle(job._id)}
                      className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors ${
                        job.status === 'Active'
                          ? 'border-red-200 text-red-600 hover:bg-red-50'
                          : 'border-green-200 text-green-700 hover:bg-green-50'
                      }`}
                    >
                      {job.status === 'Active' ? 'Close' : job.status === 'Closed' ? 'Reopen' : 'Activate'}
                    </button>

                    {/* Delete — with confirmation */}
                    <button
                      onClick={() => handleDelete(job._id, job.title)}
                      className="text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-200 text-slate-400 hover:border-red-200 hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
