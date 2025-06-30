import { Resend } from "resend";

interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(options: EmailOptions): Promise<void> {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: options.to,
      subject: options.subject,
      text: options.text ?? "",
      html: options.html || options.text,
    });

    if (error) {
      console.error("Resend API Error:", error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    console.log("✅ Email sent successfully via Resend:", data?.id);
  } catch (error) {
    console.error("Failed to send email:", error);
    throw new Error("Failed to send email");
  }
}
