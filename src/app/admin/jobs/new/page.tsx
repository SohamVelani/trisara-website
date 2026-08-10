import JobForm from '@/components/admin/JobForm';

export default function NewJobPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Create New Job Posting</h1>
        <p className="text-slate-500 text-sm mt-0.5">Fill in the details below. Status defaults to Draft — set to Active when ready to publish.</p>
      </div>
      <JobForm />
    </div>
  );
}
