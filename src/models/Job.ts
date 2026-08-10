import mongoose from 'mongoose';

export interface IJob {
  _id: string;
  // Card fields
  title: string;
  department: string;
  location: string;
  jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  experienceLevel: string;
  salaryRange?: string;
  showSalary: boolean;
  shortSummary: string;
  status: 'Draft' | 'Active' | 'Closed';
  postedDate: Date;
  slug: string;
  // Detail fields
  fullDescription: string;
  responsibilities: string[];
  requiredSkills: string[];
  niceToHaveSkills: string[];
  aboutClient?: string;
  numberOfOpenings: number;
  applicationDeadline?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema = new mongoose.Schema<IJob>(
  {
    // ── Card fields ──────────────────────────────────────────────────────────
    title: { type: String, required: [true, 'Title is required'], trim: true },
    department: { type: String, required: [true, 'Department is required'], trim: true },
    location: { type: String, required: [true, 'Location is required'], trim: true },
    jobType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
      required: [true, 'Job type is required'],
    },
    experienceLevel: { type: String, trim: true, default: '' },
    salaryRange: { type: String, trim: true },
    showSalary: { type: Boolean, default: true },
    shortSummary: { type: String, required: [true, 'Short summary is required'], trim: true },
    status: {
      type: String,
      enum: ['Draft', 'Active', 'Closed'],
      default: 'Draft',
    },
    postedDate: { type: Date, default: Date.now },
    slug: { type: String, required: true, unique: true, trim: true },

    // ── Detail fields ─────────────────────────────────────────────────────────
    fullDescription: { type: String, default: '' },
    responsibilities: [{ type: String }],
    requiredSkills: [{ type: String }],
    niceToHaveSkills: [{ type: String }],
    aboutClient: { type: String, trim: true },
    numberOfOpenings: { type: Number, default: 1, min: 1 },
    applicationDeadline: { type: Date },
  },
  { timestamps: true }
);

// ── Index for fast public queries ─────────────────────────────────────────────
JobSchema.index({ status: 1, postedDate: -1 });


const Job = mongoose.models.Job || mongoose.model<IJob>('Job', JobSchema);
export default Job;

// ── Slug helpers (used by API routes) ────────────────────────────────────────
export function titleToSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export async function generateUniqueSlug(
  baseTitle: string,
  excludeId?: string
): Promise<string> {
  const base = titleToSlug(baseTitle);
  let slug = base;
  let counter = 2;

  for (;;) {
    const query: Record<string, unknown> = { slug };
    if (excludeId) query._id = { $ne: excludeId };
    const existing = await Job.findOne(query).lean();
    if (!existing) return slug;
    slug = `${base}-${counter}`;
    counter++;
  }
}
