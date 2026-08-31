import nodemailer from 'nodemailer';
import { Resend } from 'resend';
import type { Inquiry } from './types';

export interface DispatchResult {
  sent: boolean;
  method: 'resend' | 'smtp' | 'logged';
  messageId?: string;
  error?: string;
  warning?: string;
}

export async function dispatchInquiryEmail(inquiry: Inquiry): Promise<DispatchResult> {
  const recipientEmail = process.env.CONTACT_EMAIL_TO || 'support@aivolvetechs.com';
  const senderEmail = process.env.SMTP_FROM || 'Aivolve Inquiries <onboarding@resend.dev>';
  const subject = `[New Project Inquiry] ${inquiry.name} - ${inquiry.service} (${inquiry.company || 'Private'})`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #08080a; color: #f1f5f9; padding: 24px; margin: 0; }
          .container { max-width: 600px; margin: 0 auto; background: #0d0d14; border: 1px solid #d4af37; padding: 32px; border-radius: 6px; }
          .header { border-bottom: 1px solid #1e293b; padding-bottom: 16px; margin-bottom: 24px; text-align: left; }
          .title { font-size: 20px; font-weight: 700; color: #fcd34d; margin: 0; text-transform: uppercase; letter-spacing: 2px; }
          .subtitle { font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1.5px; margin-top: 4px; }
          .field-group { margin-bottom: 16px; }
          .label { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; margin-bottom: 4px; font-weight: 600; }
          .value { font-size: 14px; color: #ffffff; background: #14141e; padding: 10px 14px; border: 1px solid #334155; border-radius: 4px; }
          .message-box { background: #14141e; border: 1px solid #d4af37; padding: 14px; border-radius: 4px; font-size: 14px; line-height: 1.6; color: #f8fafc; white-space: pre-wrap; }
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

          ${
            inquiry.company
              ? `
          <div class="field-group">
            <div class="label">Company / Organization</div>
            <div class="value">${inquiry.company}</div>
          </div>`
              : ''
          }

          ${
            inquiry.market
              ? `
          <div class="field-group">
            <div class="label">Target Market / Region</div>
            <div class="value">${inquiry.market}</div>
          </div>`
              : ''
          }

          <div class="field-group">
            <div class="label">Requested Capability / Service</div>
            <div class="value" style="color: #fde68a; font-weight: 600;">${inquiry.service}</div>
          </div>

          ${
            inquiry.budget
              ? `
          <div class="field-group">
            <div class="label">Estimated Budget</div>
            <div class="value">${inquiry.budget}</div>
          </div>`
              : ''
          }

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

  // 1. Try Resend if configured
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const resendResponse = await resend.emails.send({
        from: senderEmail,
        to: [recipientEmail],
        replyTo: inquiry.email,
        subject,
        html: htmlContent,
        text: textContent,
      });

      if (resendResponse.error) {
        console.error('[Email Dispatch] Resend API error:', resendResponse.error);
      } else if (resendResponse.data?.id) {
        console.log(`[Email Dispatch] Successfully sent inquiry via Resend (${resendResponse.data.id})`);
        return { sent: true, method: 'resend', messageId: resendResponse.data.id };
      }
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      console.error('[Email Dispatch] Resend exception:', errMsg);
    }
  }

  // 2. Try SMTP if configured
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
        tls: {
          rejectUnauthorized: false,
        },
      });

      const info = await transporter.sendMail({
        from: process.env.SMTP_FROM || `"${inquiry.name} via Aivolve" <${process.env.SMTP_USER}>`,
        to: recipientEmail,
        replyTo: inquiry.email,
        subject,
        html: htmlContent,
        text: textContent,
      });

      console.log(`[Email Dispatch] Successfully sent inquiry via SMTP (${info.messageId})`);
      return { sent: true, method: 'smtp', messageId: info.messageId };
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      console.error('[Email Dispatch] SMTP exception:', errMsg);
    }
  }

  // 3. Fallback: Log inquiry safely
  console.log(`[Email Dispatch] Inbound inquiry recorded for ${recipientEmail}:`, {
    id: inquiry.id,
    from: `${inquiry.name} <${inquiry.email}>`,
    service: inquiry.service,
    target: recipientEmail,
    note: 'Configure RESEND_API_KEY or SMTP_* environment variables to receive live emails.',
  });

  return {
    sent: false,
    method: 'logged',
    warning: 'Inquiry logged to server console. Configure RESEND_API_KEY or SMTP credentials to enable instant email delivery.',
  };
}
