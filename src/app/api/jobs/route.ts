import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Job from '@/models/Job';

export const dynamic = 'force-dynamic';

// GET /api/jobs — public, Active jobs only
export async function GET() {
  await dbConnect();
  const jobs = await Job.find({ status: 'Active' })
    .sort({ postedDate: -1 })
    .select(
      'title department location jobType experienceLevel salaryRange showSalary shortSummary slug postedDate'
    )
    .lean();

  return NextResponse.json({ jobs });
}
