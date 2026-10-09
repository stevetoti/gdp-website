import { NextRequest, NextResponse } from "next/server";
import { randomBytes, createHmac } from "crypto";
export const dynamic = "force-dynamic";
const cookieName = "gdp_chat_session";
async function proxy(req: NextRequest, action: "send" | "history") {
  const url = process.env.SUPABASE_URL,
    secret = process.env.GDP_INTERNAL_SECRET;
  if (!url || !secret)
    return NextResponse.json(
      {
        error:
          "Chat is temporarily unavailable. Please email info@globaldigitalprime.com.",
      },
      { status: 503 },
    );
  if (action === "send" && req.headers.get("origin") !== req.nextUrl.origin)
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  let session = req.cookies.get(cookieName)?.value;
  if (!session || !/^[a-f0-9]{64}$/.test(session))
    session = randomBytes(32).toString("hex");
  try {
    const input = action === "send" ? await req.json() : {};
    if (
      action === "send" &&
      (typeof input.text !== "string" || input.text.length > 4000)
    )
      return NextResponse.json(
        { error: "Message must be at most 4000 characters." },
        { status: 400 },
      );
    const ip =
      req.headers.get("x-vercel-forwarded-for") ||
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      "local";
    const ip_hash = createHmac("sha256", secret).update(ip).digest("hex");
    const r = await fetch(`${url}/functions/v1/gdp-web-chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-gdp-secret": secret },
      body: JSON.stringify({
        action,
        session,
        ip_hash,
        text: input.text,
        request_id: input.request_id,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(12000),
    });
    const result = NextResponse.json(await r.json(), {
      status: r.status,
      headers: { "Cache-Control": "no-store" },
    });
    result.cookies.set(cookieName, session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    return result;
  } catch {
    return NextResponse.json(
      { error: "Chat could not connect. Please try again." },
      { status: 502 },
    );
  }
}
export function GET(req: NextRequest) {
  return proxy(req, "history");
}
export function POST(req: NextRequest) {
  return proxy(req, "send");
}
