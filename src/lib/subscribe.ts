// Subscribe an email to MailerLite. The actual API call happens server-side in
// the Vercel function at /api/subscribe so the MailerLite token is NEVER exposed
// in the browser bundle. This file just validates and forwards the email.
export type SubscribeResult = { ok: boolean; message: string };

export async function subscribe(email: string, group?: string): Promise<SubscribeResult> {
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { ok: false, message: "Please enter a valid email." };
  }
  try {
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(group ? { email, group } : { email }),
    });
    const data = (await res.json().catch(() => null)) as SubscribeResult | null;
    if (data && typeof data.ok === "boolean") return data;
    return { ok: false, message: "Something went wrong. Please try again." };
  } catch {
    // No serverless endpoint (e.g. local `vite` dev) or network error.
    return { ok: false, message: "Email signup is being connected — check back soon." };
  }
}
