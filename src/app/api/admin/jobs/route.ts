import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions, type SessionData } from '@/lib/session';
import dbConnect from '@/lib/mongodb';
import Job, { generateUniqueSlug } from '@/models/Job';

async function requireAdmin(): Promise<boolean> {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  return !!session.isAdmin;
}

// GET — all jobs (any status) for admin dashboard
export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();
  const jobs = await Job.find({}).sort({ postedDate: -1 }).lean();
  return NextResponse.json({ jobs });
}

// POST — create new job
export async function POST(request: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();

  const body = await request.json();

  // Validate required fields
  const required = ['title', 'department', 'location', 'jobType', 'shortSummary'];
  for (const field of required) {
    if (!body[field]) {
      return NextResponse.json({ error: `${field} is required` }, { status: 400 });
    }
  }

  // Generate slug from title (only on create)
  const slug = await generateUniqueSlug(body.title);

  const job = await Job.create({
    ...body,
    slug,
    postedDate: new Date(),
  });

  return NextResponse.json({ job }, { status: 201 });
}
