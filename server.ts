import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';
import { Resend } from 'resend';

// Safe for both CJS and ESM
const __filename = typeof __filename !== 'undefined'
  ? __filename
  : fileURLToPath(import.meta.url);

const __dirname = typeof __dirname !== 'undefined'
  ? __dirname
  : path.dirname(__filename);

interface Inquiry {
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

// In-memory store for inquiries
const inquiriesStore: Inquiry[] = [];

// Helper to send email notification to support@aivolvetechs.com
async function dispatchInquiryEmail(inquiry: Inquiry): Promise<{ sent: boolean; method: string; error?: string }> {
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

  // 1. Try Resend if API key is provided
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

  // 2. Try standard SMTP if host and credentials are provided
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

  // 3. Fallback: Log inquiry clearly to console
  console.log(`[Email Dispatch] Logged inquiry for ${recipientEmail}:`, {
    id: inquiry.id,
    from: `${inquiry.name} <${inquiry.email}>`,
    service: inquiry.service,
    target: recipientEmail,
  });

  return { sent: false, method: 'logged' };
}

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3000', 10);

  if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
  }

  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      service: 'Aivolve Techs API',
      timestamp: new Date().toISOString(),
    });
  });

  // Contact / Project Inquiry submission endpoint
  app.post('/api/inquiries', async (req, res) => {
    try {
      const { name, email, company, market, service, budget, message } = req.body;

      // Validation
      if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return res.status(400).json({ error: 'Name is required' });
      }

      if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        return res.status(400).json({ error: 'A valid email address is required' });
      }

      if (!service || typeof service !== 'string' || service.trim().length === 0) {
        return res.status(400).json({ error: 'Please select a service' });
      }

      if (!message || typeof message !== 'string' || message.trim().length < 5) {
        return res.status(400).json({ error: 'Please provide a brief message (minimum 5 characters)' });
      }

      const newInquiry: Inquiry = {
        id: `INQ-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        name: name.trim().slice(0, 100),
        email: email.trim().toLowerCase().slice(0, 150),
        company: company ? String(company).trim().slice(0, 100) : '',
        market: market ? String(market).trim().slice(0, 100) : 'UAE / GCC',
        service: service.trim().slice(0, 100),
        budget: budget ? String(budget).trim().slice(0, 100) : '',
        message: message.trim().slice(0, 2000),
        createdAt: new Date().toISOString(),
      };

      inquiriesStore.push(newInquiry);
      console.log(`[Aivolve Inquiries] New project inquiry from ${newInquiry.name} (${newInquiry.email}) for service "${newInquiry.service}"`);

      // Dispatch email to support@aivolvetechs.com
      const dispatchResult = await dispatchInquiryEmail(newInquiry);

      return res.status(201).json({
        success: true,
        message: 'Thank you! Your project inquiry has been transmitted to support@aivolvetechs.com. Our principal leads will contact you shortly.',
        inquiryId: newInquiry.id,
        deliveryMethod: dispatchResult.method,
      });
    } catch (err) {
      console.error('Error handling inquiry submission:', err);
      return res.status(500).json({ error: 'Failed to process inquiry. Please try again or email support@aivolvetechs.com directly.' });
    }
  });

  // Vite middleware for development vs static files in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Aivolve Techs Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
