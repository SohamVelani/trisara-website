import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions, type SessionData } from '@/lib/session';
import dbConnect from '@/lib/mongodb';
import Job from '@/models/Job';
import mongoose from 'mongoose';

type Params = Promise<{ id: string }>;

export async function PATCH(_: NextRequest, { params }: { params: Params }) {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  if (!session.isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  await dbConnect();

  const job = await Job.findById(id);
  if (!job) {
    return NextResponse.json({ error: 'Job not found' }, { status: 404 });
  }

  // Cycle: Draft → Active → Closed → Draft
  const cycle: Record<string, string> = {
    Draft: 'Active',
    Active: 'Closed',
    Closed: 'Draft',
  };

  job.status = cycle[job.status] as 'Draft' | 'Active' | 'Closed';
  await job.save();

  return NextResponse.json({ status: job.status });
}
