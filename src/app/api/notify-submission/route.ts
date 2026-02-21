import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Log the submission (in production, send email notification)
    console.log('New project submission:', {
      name: data.contact_name,
      email: data.contact_email,
      company: data.company_name,
      project: data.project_type,
      budget: data.budget_range,
      timeline: data.timeline,
    });

    // TODO: Integrate with email service (SendGrid, Resend, etc.)
    // For now, just return success

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Notification error:', error);
    return NextResponse.json(
      { error: 'Failed to send notification' },
      { status: 500 }
    );
  }
}
