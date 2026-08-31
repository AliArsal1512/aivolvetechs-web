import nodemailer from 'nodemailer';
import { Resend } from 'resend';
import type { Inquiry } from './types';

export async function dispatchInquiryEmail(
  inquiry: Inquiry,
): Promise<{ sent: boolean; method: string; error?: string }> {
  const recipientEmail = process.env.CONTACT_EMAIL_TO || 'support@aivolvetechs.com';
  const subject = `[New Project Inquiry] ${inquiry.name} - ${inquiry.service} (${inquiry.company || 'Private'})`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #08080a; color: #f1f5f9; padding: 24px; }
          .container { max-width: 600px; margin: 0 auto; background: #0d0d14; border: 1px solid #d4af37; padding: 32px; border-radius: 4px; }
          .header { border-bottom: 1px solid #1e293b; padding-bottom: 16px; margin-bottom: 24px; }
          .title { font-size: 20px; font-weight: bold; color: #fcd34d; margin: 0; text-transform: uppercase; letter-spacing: 2px; }
          .subtitle { font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1.5px; margin-top: 4px; }
          .field-group { margin-bottom: 16px; }
          .label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; margin-bottom: 4px; font-weight: 600; }
          .value { font-size: 14px; color: #ffffff; background: #14141e; padding: 10px 14px; border: 1px solid #334155; border-radius: 2px; }
          .message-box { background: #14141e; border: 1px solid #d4af37; padding: 14px; border-radius: 2px; font-size: 14px; line-height: 1.6; color: #f8fafc; white-space: pre-wrap; }
          .footer { margin-top: 24px; padding-top: 16px; border-top: 1px solid #1e293b; font-size: 11px; color: #64748b; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="title">Aivolve Technologies</h1>
            <div class="subtitle">New Inbound Client Project Transmission</div>
          </div>
          
          <div class="field-group">
            <div class="label">Client Name</div>
            <div class="value">${inquiry.name}</div>
          </div>

          <div class="field-group">
            <div class="label">Work Email</div>
            <div class="value"><a href="mailto:${inquiry.email}" style="color: #fcd34d; text-decoration: none;">${inquiry.email}</a></div>
          </div>

          ${inquiry.company ? `
          <div class="field-group">
            <div class="label">Company / Organization</div>
            <div class="value">${inquiry.company}</div>
          </div>` : ''}

          ${inquiry.market ? `
          <div class="field-group">
            <div class="label">Target Market / Region</div>
            <div class="value">${inquiry.market}</div>
          </div>` : ''}

          <div class="field-group">
            <div class="label">Requested Capability / Service</div>
            <div class="value" style="color: #fde68a; font-weight: 600;">${inquiry.service}</div>
          </div>

          ${inquiry.budget ? `
          <div class="field-group">
            <div class="label">Estimated Budget</div>
            <div class="value">${inquiry.budget}</div>
          </div>` : ''}

          <div class="field-group">
            <div class="label">Project Details / Message</div>
            <div class="message-box">${inquiry.message}</div>
          </div>

          <div class="footer">
            Inquiry ID: ${inquiry.id} • Transmitted: ${inquiry.createdAt} • Aivolve Automated Dispatch
          </div>
        </div>
      </body>
    </html>
  `;

  const textContent = `
NEW PROJECT INQUIRY - AIVOLVE TECHNOLOGIES
==========================================
Client Name: ${inquiry.name}
Email: ${inquiry.email}
Company: ${inquiry.company || 'Not provided'}
Target Market: ${inquiry.market || 'Not provided'}
Service: ${inquiry.service}
Budget: ${inquiry.budget || 'Not provided'}

Message:
${inquiry.message}

Inquiry ID: ${inquiry.id}
Date: ${inquiry.createdAt}
  `.trim();

  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.SMTP_FROM || 'Aivolve Inquiries <onboarding@resend.dev>',
        to: [recipientEmail],
        replyTo: inquiry.email,
        subject,
        html: htmlContent,
        text: textContent,
      });
      return { sent: true, method: 'resend' };
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      console.error('[Email Dispatch] Resend error:', errMsg);
    }
  }

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        secure: process.env.SMTP_PORT === '465',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM || `"${inquiry.name} via Aivolve" <${process.env.SMTP_USER}>`,
        to: recipientEmail,
        replyTo: inquiry.email,
        subject,
        html: htmlContent,
        text: textContent,
      });
      return { sent: true, method: 'smtp' };
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      console.error('[Email Dispatch] SMTP error:', errMsg);
    }
  }

  console.log(`[Email Dispatch] Logged inquiry for ${recipientEmail}:`, {
    id: inquiry.id,
    from: `${inquiry.name} <${inquiry.email}>`,
    service: inquiry.service,
    target: recipientEmail,
  });

  return { sent: false, method: 'logged' };
}
