const pool = require("../config/db");
const { sendEmail } = require("../utils/emailService");
const { contactMessageTemplate } = require("../utils/emailTemplates");

function validateContactPayload(body) {
  const { fullName, email, subject, message } = body;

  if (!fullName || !String(fullName).trim()) {
    return "Full name is required";
  }

  if (!email || !String(email).trim()) {
    return "Email is required";
  }

  if (!subject || !String(subject).trim()) {
    return "Subject is required";
  }

  if (!message || !String(message).trim()) {
    return "Message is required";
  }

  return null;
}

async function createContactMessage(req, res, next) {
  try {
    const validationError = validateContactPayload(req.body);

    if (validationError) {
      return res.status(400).json({
        error: validationError,
      });
    }

    const { fullName, email, subject, message } = req.body;

    const result = await pool.query(
      `
      INSERT INTO contact_messages (
        full_name,
        email,
        subject,
        message
      )
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [
        String(fullName).trim(),
        String(email).trim(),
        String(subject).trim(),
        String(message).trim(),
      ]
    );

    const savedMessage = result.rows[0];

    const receiverEmail =
      process.env.CONTACT_RECEIVER_EMAIL ||
      process.env.EMAIL_REPLY_TO ||
      "foxjonathan083@gmail.com";

    const emailTemplate = contactMessageTemplate({
      fullName: savedMessage.full_name,
      email: savedMessage.email,
      subject: savedMessage.subject,
      message: savedMessage.message,
    });

    try {
      await sendEmail({
        to: receiverEmail,
        subject: emailTemplate.subject,
        html: emailTemplate.html,
      });
    } catch (emailError) {
      console.error("Contact email failed:", emailError.message);

      return res.status(201).json({
        message:
          "Message saved, but email could not be sent. Please check email setup.",
        contactMessageId: savedMessage.id,
        emailSent: false,
      });
    }

    res.status(201).json({
      message: "Message sent successfully",
      contactMessageId: savedMessage.id,
      emailSent: true,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createContactMessage,
};