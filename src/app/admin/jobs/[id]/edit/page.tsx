import { notFound } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import Job from '@/models/Job';
import JobForm from '@/components/admin/JobForm';

type Props = { params: Promise<{ id: string }> };

export default async function EditJobPage({ params }: Props) {
  const { id } = await params;

  await dbConnect();
  const job = await Job.findById(id).lean();

  if (!job) notFound();

  // Serialise mongoose doc for client component
  const serialised = JSON.parse(JSON.stringify(job));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Edit Job Posting</h1>
        <p className="text-slate-500 text-sm mt-0.5">
          Editing <span className="font-medium text-slate-700">{job.title}</span>.
          The slug will not change automatically when you edit the title.
        </p>
      </div>
      <JobForm initialData={serialised} jobId={id} />
    </div>
  );
}
