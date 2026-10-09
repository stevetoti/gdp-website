// Twilio can deliver a business-scoped user ID when WhatsApp hides the phone.
export function whatsappIdentity(address: string): { ref: string; phone: string | null } | null {
  if (/^whatsapp:\+[1-9]\d{6,14}$/.test(address))
    return { ref: address.slice(10), phone: address.slice(9) };
  if (/^whatsapp:[A-Z]{2}\.(?:ENT\.)?[A-Za-z0-9]{1,128}$/.test(address))
    return { ref: address.slice(9), phone: null };
  return null;
}
export function whatsappAddress(ref: string): string {
  const address = /^\d+$/.test(ref) ? `whatsapp:+${ref}` : `whatsapp:${ref}`;
  if (!whatsappIdentity(address)) throw new Error("Invalid WhatsApp recipient");
  return address;
}
export function withinWindow(
  lastInbound: string | null,
  now = Date.now(),
): boolean {
  if (!lastInbound) return false;
  const age = now - Date.parse(lastInbound);
  return Number.isFinite(age) && age >= 0 && age < 24 * 60 * 60 * 1000;
}
export function wantsHuman(body: string, keywords: string[]): boolean {
  const text = body.toLowerCase().trim();
  return (
    keywords.some((k) => text === k.toLowerCase()) ||
    /\b(talk|speak|connect|chat)\s+(to|with)\s+(a\s+|an\s+|the\s+)?(human|agent|person|someone|stephen|team)\b/i.test(
      text,
    )
  );
}
export function plainText(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, "$1 ($2)")
    .replace(/[*#`]/g, "")
    .trim()
    .slice(0, 4000);
}
export function equalSecret(a: string, b: string): boolean {
  if (!a || !b || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
export async function twilioSignature(
  url: string,
  form: URLSearchParams,
  token: string,
): Promise<string> {
  const keys = [...new Set(form.keys())].sort();
  let data = url;
  for (const k of keys)
    for (const v of [...new Set(form.getAll(k))].sort()) data += k + v;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(token),
    { name: "HMAC", hash: "SHA-1" },
    false,
    ["sign"],
  );
  return btoa(
    String.fromCharCode(
      ...new Uint8Array(
        await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data)),
      ),
    ),
  );
}
