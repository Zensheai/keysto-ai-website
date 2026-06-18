// Vercel serverless function — POST /api/subscribe
// Adds an email to MailerLite using the secret token from a server-side env var.
// The token is NEVER sent to the browser. Configure in Vercel:
//   MAILERLITE_TOKEN     (required)  — your MailerLite API key
//   MAILERLITE_GROUP_ID  (optional)  — a group/list id to add subscribers to
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, message: "Method not allowed." });
    return;
  }

  const email = req.body && req.body.email;
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    res.status(400).json({ ok: false, message: "Please enter a valid email." });
    return;
  }

  const token = process.env.MAILERLITE_TOKEN;
  if (!token) {
    // Not configured yet — fail gracefully, don't pretend it worked.
    res.status(200).json({ ok: false, message: "Email signup is being connected — check back soon." });
    return;
  }

  const groupId = process.env.MAILERLITE_GROUP_ID;
  const payload = groupId ? { email, groups: [groupId] } : { email };

  try {
    const r = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (r.status === 200 || r.status === 201) {
      res.status(200).json({ ok: true, message: "You're in! Check your inbox." });
      return;
    }
    if (r.status === 422) {
      // Validation error (often: already subscribed) — treat as success for UX.
      res.status(200).json({ ok: true, message: "You're already on the list — thanks!" });
      return;
    }
    res.status(200).json({ ok: false, message: "Something went wrong. Please try again." });
  } catch {
    res.status(200).json({ ok: false, message: "Network error. Please try again." });
  }
}
