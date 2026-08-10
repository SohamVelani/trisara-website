import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import dbConnect from '@/lib/mongodb';
import Application from '@/models/Application';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Extract text fields
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const coverNote = formData.get('coverNote') as string;
    const jobTitle = formData.get('jobTitle') as string;
    const jobSlug = formData.get('jobSlug') as string;
    const industry = formData.get('industry') as string;
    
    // Extract file
    const file = formData.get('resume') as File;

    if (!name || !email || !phone || !file || !jobTitle || !jobSlug) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Server-side validation
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Resume exceeds the 5MB limit' },
        { status: 400 }
      );
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Only PDF files are accepted' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await dbConnect();

    let resumeUrl = '';

    // Check if VERCEL_BLOB is available (User will add token later)
    // For now we'll attempt upload, and gracefully handle if token is missing
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      // Create a unique filename
      const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const blob = await put(`resumes/${filename}`, file, {
        access: 'public',
      });
      resumeUrl = blob.url;
    } else {
      console.warn('BLOB_READ_WRITE_TOKEN is missing. Storing dummy URL.');
      resumeUrl = 'https://dummy-url.vercel-storage.com/dummy.pdf';
    }

    // Save to DB
    const newApplication = await Application.create({
      name,
      email,
      phone,
      resumeUrl,
      coverNote,
      jobTitle,
      jobSlug,
      industry,
    });

    // Send emails via Resend if configured
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);
        
        const internalEmail = process.env.INTERNAL_NOTIFICATION_EMAIL || 'info@trisarahrsolutions.in';
        
        // 1. Internal Notification Email
        await resend.emails.send({
          from: 'Trisara Careers <careers@trisarahrsolutions.in>',
          to: internalEmail,
          subject: `New Application: ${jobTitle} - ${name}`,
          html: `
            <h2>New Job Application</h2>
            <p><strong>Job:</strong> ${jobTitle} (${industry})</p>
            <p><strong>Applicant:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Resume:</strong> <a href="${resumeUrl}">${resumeUrl}</a></p>
            <p><strong>Cover Note:</strong></p>
            <p>${coverNote || '<em>None provided</em>'}</p>
          `,
        });

        // 2. Applicant Confirmation Email
        await resend.emails.send({
          from: 'Trisara Careers <careers@trisarahrsolutions.in>',
          to: email,
          subject: `Application Received: ${jobTitle} at Trisara HR Solutions`,
          html: `
            <h2>Application Received</h2>
            <p>Hi ${name},</p>
            <p>Thank you for applying for the <strong>${jobTitle}</strong> position. We have received your resume and application details.</p>
            <p>Our recruitment team will review your profile and get in touch with you shortly if your qualifications match our current requirements.</p>
            <br/>
            <p>Best regards,</p>
            <p><strong>Trisara HR Solutions</strong></p>
          `,
        });
      } catch (emailError) {
        console.error('Failed to send Resend emails:', emailError);
        // We don't throw here; we still want to return success for the application submission
      }
    }

    return NextResponse.json(
      { success: true, application: newApplication },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Application submission error:', error);
    
    // Check if it's a MongoDB auth error
    if (error.name === 'MongoServerError' && error.message.includes('bad auth')) {
      return NextResponse.json(
        { error: 'Database authentication failed. Please check your MongoDB credentials.' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal Server Error. Please try again later.' },
      { status: 500 }
    );
  }
}
