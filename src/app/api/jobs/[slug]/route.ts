import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Job from '@/models/Job';

export const dynamic = 'force-dynamic';

type Params = Promise<{ slug: string }>;

// GET /api/jobs/[slug] — public, full detail for one Active job
export async function GET(_: Request, { params }: { params: Params }) {
  const { slug } = await params;

  await dbConnect();
  // Note: status is intentionally NOT checked here — this allows applicants who already
  // have the apply page open to complete their submission even if the job is later closed.
  // The apply page itself only does a notFound() on initial server-render for new visitors.
  const job = await Job.findOne({ slug }).lean();

  if (!job) {
    return NextResponse.json({ error: 'Job not found' }, { status: 404 });
  }

  return NextResponse.json({ job });
}
