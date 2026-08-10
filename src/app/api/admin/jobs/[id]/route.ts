import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions, type SessionData } from '@/lib/session';
import dbConnect from '@/lib/mongodb';
import Job, { generateUniqueSlug, titleToSlug } from '@/models/Job';
import mongoose from 'mongoose';

type Params = Promise<{ id: string }>;

async function requireAdmin(): Promise<boolean> {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  return !!session.isAdmin;
}

// PUT — full update (slug only changes if admin explicitly sends a new one)
export async function PUT(request: NextRequest, { params }: { params: Params }) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  await dbConnect();
  const body = await request.json();

  // Slug stability: only regenerate if admin explicitly provides a new slug value
  // that differs from the existing one
  const existing = await Job.findById(id).lean();
  if (!existing) {
    return NextResponse.json({ error: 'Job not found' }, { status: 404 });
  }

  let slug = existing.slug;
  if (body.slug && body.slug !== existing.slug) {
    // Admin deliberately changed slug — ensure uniqueness (excluding this doc)
    const newBase = titleToSlug(body.slug);
    slug = await generateUniqueSlug(newBase, id);
  }

  const updated = await Job.findByIdAndUpdate(
    id,
    { ...body, slug },
    { new: true, runValidators: true }
  ).lean();

  return NextResponse.json({ job: updated });
}

// DELETE — remove job
export async function DELETE(_: NextRequest, { params }: { params: Params }) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  await dbConnect();
  const result = await Job.findByIdAndDelete(id);
  if (!result) {
    return NextResponse.json({ error: 'Job not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
