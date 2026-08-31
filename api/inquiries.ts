import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
import { Resend } from 'resend';

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  company?: string;
  market?: string;
  service: string;
  budget?: string;
  message: string;
  createdAt: string;
}

export interface DispatchResult {
  sent: boolean;
  method: 'resend' | 'smtp' | 'logged';
  messageId?: string;
  error?: string;
  warning?: string;
}

function setCorsHeaders(res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Max-Age', '86400');
}

async function dispatchInquiryEmail(inquiry: Inquiry): Promise<DispatchResult> {
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
      const createTransport =
        nodemailer.createTransport || (nodemailer as any).default?.createTransport;
      const transporter = createTransport({
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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCorsHeaders(res);

  // 1. CORS Preflight
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  // 2. Health & Information Endpoint (GET)
  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'ok',
      service: 'Aivolve Inquiries API',
      endpoint: '/api/inquiries',
      acceptedMethods: ['POST', 'GET', 'OPTIONS'],
      message:
        'Aivolve Inquiries API is operational. Submit inquiries by sending a POST request with JSON payload { name, email, service, message, company?, market?, budget? }.',
      timestamp: new Date().toISOString(),
    });
  }

  // 3. Method validation
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: `Method ${req.method} not allowed. Send a POST request to submit inquiries.`,
    });
  }

  // 4. Handle POST
  try {
    let payload = req.body;

    if (typeof payload === 'string') {
      try {
        payload = JSON.parse(payload);
      } catch {
        return res.status(400).json({ error: 'Invalid JSON payload received.' });
      }
    }

    if (!payload || typeof payload !== 'object') {
      return res.status(400).json({ error: 'Request body must be a valid JSON object.' });
    }

    const { name, email, company, market, service, budget, message } = payload as Record<
      string,
      unknown
    >;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({ error: 'Full name is required.' });
    }

    if (
      !email ||
      typeof email !== 'string' ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      return res.status(400).json({ error: 'A valid work email address is required.' });
    }

    if (!service || typeof service !== 'string' || service.trim().length === 0) {
      return res.status(400).json({ error: 'Please select a core discipline/service.' });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return res.status(400).json({
        error: 'Please provide a brief project summary (minimum 5 characters).',
      });
    }

    const newInquiry: Inquiry = {
      id: `INQ-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: name.trim().slice(0, 100),
      email: email.trim().toLowerCase().slice(0, 150),
      company: company ? String(company).trim().slice(0, 100) : '',
      market: market ? String(market).trim().slice(0, 100) : 'UAE / GCC',
      service: service.trim().slice(0, 100),
      budget: budget ? String(budget).trim().slice(0, 100) : '$5k - $15k',
      message: message.trim().slice(0, 3000),
      createdAt: new Date().toISOString(),
    };

    console.log(
      `[Aivolve Inquiries] Processing inquiry from ${newInquiry.name} (${newInquiry.email}) for "${newInquiry.service}"`,
    );

    const dispatchResult = await dispatchInquiryEmail(newInquiry);

    return res.status(201).json({
      success: true,
      message:
        'Thank you! Your project inquiry has been transmitted to support@aivolvetechs.com. Our principal leads will contact you shortly.',
      inquiryId: newInquiry.id,
      deliveryMethod: dispatchResult.method,
      delivered: dispatchResult.sent,
      ...(dispatchResult.warning ? { note: dispatchResult.warning } : {}),
    });
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    console.error('[API /inquiries] Unhandled error:', errMsg);
    return res.status(500).json({
      error: 'Failed to process inquiry. Please try again or email support@aivolvetechs.com directly.',
    });
  }
}
