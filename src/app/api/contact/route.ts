import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ContactSubmission from '@/models/ContactSubmission';
import { rateLimit } from '@/lib/rateLimiter';

// Simple HTML/script tag stripper — prevents stored XSS in the DB
function sanitize(str: string): string {
  return str
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .trim();
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  // ── 1. Rate limiting ────────────────────────────────────────────────────────
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  const rateLimitResult = rateLimit(ip, 5, 15 * 60 * 1000); // 5 per 15 min

  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      {
        success: false,
        message: 'Too many requests. Please try again in a few minutes.',
      },
      { status: 429 }
    );
  }

  // ── 2. Parse body ────────────────────────────────────────────────────────────
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request body.' },
      { status: 400 }
    );
  }

  // ── 3. Extract & sanitize fields ─────────────────────────────────────────────
  const name = typeof body.name === 'string' ? sanitize(body.name) : '';
  const email = typeof body.email === 'string' ? sanitize(body.email) : '';
  const company = typeof body.company === 'string' ? sanitize(body.company) : '';
  const message = typeof body.message === 'string' ? sanitize(body.message) : '';

  // ── 4. Server-side validation ─────────────────────────────────────────────────
  const errors: string[] = [];

  if (!name || name.length < 1) {
    errors.push('Name is required.');
  } else if (name.length > 100) {
    errors.push('Name must be 100 characters or fewer.');
  }

  if (!email) {
    errors.push('Email is required.');
  } else if (!validateEmail(email)) {
    errors.push('Please provide a valid email address.');
  } else if (email.length > 254) {
    errors.push('Email must be 254 characters or fewer.');
  }

  if (company.length > 200) {
    errors.push('Company name must be 200 characters or fewer.');
  }

  if (!message || message.length < 1) {
    errors.push('Message is required.');
  } else if (message.length > 2000) {
    errors.push('Message must be 2000 characters or fewer.');
  }

  if (errors.length > 0) {
    return NextResponse.json(
      { success: false, message: 'Validation failed.', errors },
      { status: 400 }
    );
  }

  // ── 5. Save to MongoDB ────────────────────────────────────────────────────────
  try {
    await dbConnect();

    await ContactSubmission.create({ name, email, company, message });

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you! Your message has been received. We'll get back to you shortly.",
      },
      { status: 201 }
    );
  } catch (error) {
    // Log full error server-side; never expose to client
    console.error('[/api/contact] Error saving submission:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong. Please try again later.',
      },
      { status: 500 }
    );
  }
}

// Reject all non-POST methods explicitly
export async function GET() {
  return NextResponse.json(
    { success: false, message: 'Method not allowed.' },
    { status: 405 }
  );
}
