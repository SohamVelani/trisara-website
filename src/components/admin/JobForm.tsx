'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { IJob } from '@/models/Job';

type JobFormData = Omit<IJob, '_id' | 'postedDate' | 'createdAt' | 'updatedAt'>;

interface Props {
  initialData?: Partial<IJob>;
  jobId?: string; // present in edit mode
}

const EMPTY_FORM: JobFormData = {
  title: '',
  department: '',
  location: '',
  jobType: 'Full-time',
  experienceLevel: '',
  salaryRange: '',
  showSalary: true,
  shortSummary: '',
  status: 'Draft',
  slug: '',
  fullDescription: '',
  responsibilities: [''],
  requiredSkills: [''],
  niceToHaveSkills: [''],
  aboutClient: '',
  numberOfOpenings: 1,
  applicationDeadline: undefined,
};

function ArrayField({
  label,
  values,
  onChange,
  placeholder,
}: {
  label: string;
  values: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  const update = (i: number, val: string) => {
    const next = [...values];
    next[i] = val;
    onChange(next);
  };
  const add = () => onChange([...values, '']);
  const remove = (i: number) => onChange(values.filter((_, idx) => idx !== i));

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
      <div className="space-y-2">
        {values.map((v, i) => (
          <div key={i} className="flex gap-2">
            <input
              type="text"
              value={v}
              onChange={e => update(i, e.target.value)}
              placeholder={placeholder}
              className="flex-1 px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all"
            />
            {values.length > 1 && (
              <button
                type="button"
                onClick={() => remove(i)}
                className="px-2 text-slate-400 hover:text-red-500 transition-colors text-lg leading-none"
                aria-label="Remove"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="mt-2 text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
      >
        <span className="text-base leading-none">+</span> Add item
      </button>
    </div>
  );
}

export default function JobForm({ initialData, jobId }: Props) {
  const router = useRouter();
  const isEdit = !!jobId;

  const [form, setForm] = useState<JobFormData>(() => {
    if (!initialData) return EMPTY_FORM;
    return {
      ...EMPTY_FORM,
      ...initialData,
      responsibilities: initialData.responsibilities?.length
        ? initialData.responsibilities
        : [''],
      requiredSkills: initialData.requiredSkills?.length ? initialData.requiredSkills : [''],
      niceToHaveSkills: initialData.niceToHaveSkills?.length
        ? initialData.niceToHaveSkills
        : [''],
    };
  });

  const [slugEdited, setSlugEdited] = useState(isEdit);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const set = useCallback(
    <K extends keyof JobFormData>(key: K, value: JobFormData[K]) => {
      setForm(prev => {
        const next = { ...prev, [key]: value };
        // Auto-generate slug from title in CREATE mode only, and only if not manually edited
        if (key === 'title' && !isEdit && !slugEdited) {
          const slug = (value as string)
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
          next.slug = slug;
        }
        return next;
      });
    },
    [isEdit, slugEdited]
  );

  const handleSlugChange = (v: string) => {
    setSlugEdited(true);
    set('slug', v);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!form.title.trim()) return setError('Title is required');
    if (!form.department.trim()) return setError('Department is required');
    if (!form.location.trim()) return setError('Location is required');
    if (!form.shortSummary.trim()) return setError('Short summary is required');
    if (!form.slug.trim()) return setError('Slug is required');

    setSaving(true);

    const payload = {
      ...form,
      responsibilities: form.responsibilities.filter(s => s.trim()),
      requiredSkills: form.requiredSkills.filter(s => s.trim()),
      niceToHaveSkills: form.niceToHaveSkills.filter(s => s.trim()),
    };

    const url = isEdit ? `/api/admin/jobs/${jobId}` : '/api/admin/jobs';
    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push('/admin/dashboard');
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || 'Failed to save job');
      setSaving(false);
    }
  };

  const inputCls =
    'w-full px-3 py-2.5 rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all';
  const labelCls = 'block text-sm font-medium text-slate-700 mb-1.5';
  const sectionCls = 'bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-sm';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
          {error}
        </div>
      )}

      {/* ── Section 1: Card Preview Info ────────────────────────────────────── */}
      <div className={sectionCls}>
        <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
          Card Preview Info
          <span className="ml-2 text-xs font-normal text-slate-400">
            Shown on the public job listing page
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label className={labelCls}>Job Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={e => set('title', e.target.value)}
              className={inputCls}
              placeholder="e.g. Senior DevOps Engineer"
              required
            />
          </div>

          <div>
            <label className={labelCls}>Department / Industry *</label>
            <input
              type="text"
              value={form.department}
              onChange={e => set('department', e.target.value)}
              className={inputCls}
              placeholder="e.g. IT & Technology"
              required
            />
          </div>

          <div>
            <label className={labelCls}>Location *</label>
            <input
              type="text"
              value={form.location}
              onChange={e => set('location', e.target.value)}
              className={inputCls}
              placeholder="e.g. Mumbai"
              required
            />
          </div>

          <div>
            <label className={labelCls}>Job Type *</label>
            <select
              value={form.jobType}
              onChange={e => set('jobType', e.target.value as JobFormData['jobType'])}
              className={inputCls}
            >
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
              <option>Internship</option>
            </select>
          </div>

          <div>
            <label className={labelCls}>Experience Level</label>
            <input
              type="text"
              value={form.experienceLevel}
              onChange={e => set('experienceLevel', e.target.value)}
              className={inputCls}
              placeholder="e.g. 3–5 years"
            />
          </div>

          <div>
            <label className={labelCls}>Salary Range</label>
            <input
              type="text"
              value={form.salaryRange || ''}
              onChange={e => set('salaryRange', e.target.value)}
              className={inputCls}
              placeholder="e.g. ₹12–18 LPA"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="showSalary"
              checked={form.showSalary}
              onChange={e => set('showSalary', e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 accent-blue-600"
            />
            <label htmlFor="showSalary" className="text-sm font-medium text-slate-700">
              Show salary publicly
            </label>
          </div>

          <div className="sm:col-span-2">
            <label className={labelCls}>Short Summary * (1–2 lines for the card)</label>
            <textarea
              value={form.shortSummary}
              onChange={e => set('shortSummary', e.target.value)}
              className={`${inputCls} resize-none`}
              rows={2}
              placeholder="One or two sentences summarising the role…"
              required
            />
          </div>

          <div>
            <label className={labelCls}>Status</label>
            <select
              value={form.status}
              onChange={e => set('status', e.target.value as JobFormData['status'])}
              className={inputCls}
            >
              <option value="Draft">Draft</option>
              <option value="Active">Active</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div>
            <label className={labelCls}>
              URL Slug{' '}
              <span className="text-slate-400 font-normal">
                {isEdit ? '(edit carefully — breaks existing links)' : '(auto-generated)'}
              </span>
            </label>
            <input
              type="text"
              value={form.slug}
              onChange={e => handleSlugChange(e.target.value)}
              className={inputCls}
              placeholder="e.g. senior-devops-engineer"
              required
            />
          </div>
        </div>
      </div>

      {/* ── Section 2: Full Job Details ──────────────────────────────────────── */}
      <div className={sectionCls}>
        <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
          Full Job Details
          <span className="ml-2 text-xs font-normal text-slate-400">
            Shown on the job detail / apply page
          </span>
        </h2>

        <div>
          <label className={labelCls}>Full Description</label>
          <textarea
            value={form.fullDescription}
            onChange={e => set('fullDescription', e.target.value)}
            className={`${inputCls} resize-y`}
            rows={6}
            placeholder="Write 2–3 paragraphs describing the role, team, and opportunity…"
          />
        </div>

        <ArrayField
          label="Key Responsibilities"
          values={form.responsibilities}
          onChange={v => set('responsibilities', v)}
          placeholder="e.g. Design and maintain CI/CD pipelines"
        />

        <ArrayField
          label="Required Skills"
          values={form.requiredSkills}
          onChange={v => set('requiredSkills', v)}
          placeholder="e.g. 3+ years of Node.js experience"
        />

        <ArrayField
          label="Nice-to-Have Skills (Optional)"
          values={form.niceToHaveSkills}
          onChange={v => set('niceToHaveSkills', v)}
          placeholder="e.g. Experience with Terraform"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelCls}>About the Client (Optional)</label>
            <textarea
              value={form.aboutClient || ''}
              onChange={e => set('aboutClient', e.target.value)}
              className={`${inputCls} resize-none`}
              rows={3}
              placeholder="Brief context about the client — without naming them…"
            />
          </div>

          <div className="space-y-5">
            <div>
              <label className={labelCls}>Number of Openings</label>
              <input
                type="number"
                min={1}
                value={form.numberOfOpenings}
                onChange={e => set('numberOfOpenings', parseInt(e.target.value) || 1)}
                className={inputCls}
              />
            </div>

            <div>
              <label className={labelCls}>Application Deadline (Optional)</label>
              <input
                type="date"
                value={
                  form.applicationDeadline
                    ? new Date(form.applicationDeadline).toISOString().split('T')[0]
                    : ''
                }
                onChange={e =>
                  set(
                    'applicationDeadline',
                    e.target.value ? new Date(e.target.value) : undefined
                  )
                }
                className={inputCls}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Actions ──────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-4 pb-10">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed text-sm"
        >
          {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Job'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/dashboard')}
          className="px-6 py-2.5 rounded-xl font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-all text-sm"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
