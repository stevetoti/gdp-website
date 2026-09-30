import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { createClient } from '@supabase/supabase-js';
import { guardPublicForm } from '@/lib/security/form-guard';
import { clientIpFromHeaders } from '@/lib/security/turnstile';

export const dynamic = 'force-dynamic';

/**
 * Website forms → GDP inbox (2026-09-30, form-bot-defence skill).
 *
 * Until now the contact page only simulated a send and the project wizard
 * wrote to Supabase straight from the browser. Both now post here: bot
 * checks first (honeypot, fill time, content sanity, server-verified
 * Turnstile), then `gdp_form_ingest` creates a human-mode conversation and
 * the existing queue emails GDP_MESSAGE_NOTIFICATION_EMAIL.
 */
type Payload = {
  kind?: 'contact' | 'project';
  name?: string; email?: string; company?: string; phone?: string;
  service?: string; budget?: string; preferredOffice?: string; timeline?: string; projectType?: string;
  message?: string;
  website?: string; form_started_at?: number; turnstile_token?: string;
};

export async function POST(req: NextRequest) {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return NextResponse.json({ error: 'Messages are temporarily unavailable. Please email info@globaldigitalprime.com.' }, { status: 503 });
  if (req.headers.get('origin') && req.headers.get('origin') !== req.nextUrl.origin) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 });

  let body: Payload;
  try { body = (await req.json()) as Payload; } catch { return NextResponse.json({ error: 'Invalid request' }, { status: 400 }); }
  const name = String(body.name ?? '').trim().slice(0, 200);
  const email = String(body.email ?? '').trim().toLowerCase().slice(0, 254);
  const message = String(body.message ?? '').trim().slice(0, 5000);
  if (name.length < 2 || !/^\S+@\S+\.\S+$/.test(email) || (body.kind !== 'project' && message.length < 1)) {
    return NextResponse.json({ error: 'Please add your name, a valid email and a message.' }, { status: 400 });
  }

  const guard = await guardPublicForm({ honeypot: body.website, formStartedAt: body.form_started_at, turnstileToken: body.turnstile_token, ip: clientIpFromHeaders(req.headers), message, name });
  if (!guard.ok) {
    if (guard.reason === 'honeypot') return NextResponse.json({ success: true });
    return NextResponse.json({ error: guard.message }, { status: 400 });
  }

  const lines = [
    body.kind === 'project' ? `Project enquiry (${String(body.projectType ?? 'general').slice(0, 60)})` : `Contact form (${String(body.service ?? 'general').slice(0, 60)})`,
    body.company ? `Company: ${String(body.company).slice(0, 200)}` : null,
    body.phone ? `Phone: ${String(body.phone).slice(0, 40)}` : null,
    body.budget ? `Budget: ${String(body.budget).slice(0, 60)}` : null,
    body.timeline ? `Timeline: ${String(body.timeline).slice(0, 60)}` : null,
    body.preferredOffice ? `Preferred office: ${String(body.preferredOffice).slice(0, 60)}` : null,
    '',
    message || '(no message)',
  ].filter((l) => l !== null);

  const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data, error } = await db.rpc('gdp_form_ingest', { p_name: name, p_email: email, p_body: lines.join('\n'), p_request_id: `form:${randomUUID()}`, p_flags: guard.flags });
  if (error) {
    console.error('[gdp/contact] ingest failed', error.message);
    return NextResponse.json({ error: 'We could not save your message. Please email info@globaldigitalprime.com.' }, { status: 503 });
  }
  return NextResponse.json({ success: true, id: (data as { message_id?: string } | null)?.message_id ?? null });
}
