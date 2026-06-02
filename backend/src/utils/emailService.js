require("dotenv").config();

async function sendEmail({ to, subject, html }) {
  if (process.env.EMAIL_ENABLED !== "true") {
    return {
      skipped: true,
      reason: "EMAIL_ENABLED is not true",
    };
  }

  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is missing");
  }

  if (!process.env.EMAIL_FROM) {
    throw new Error("EMAIL_FROM is missing");
  }

  const payload = {
    from: process.env.EMAIL_FROM,
    to: [to],
    subject,
    html,
  };

  if (process.env.EMAIL_REPLY_TO) {
    payload.reply_to = process.env.EMAIL_REPLY_TO;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.error || "Email sending failed");
  }

  return data;
}

module.exports = {
  sendEmail,
};