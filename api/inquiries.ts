import type { VercelRequest, VercelResponse } from '@vercel/node';
import { processInquiry } from '../lib/process-inquiry';

function setCorsHeaders(res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Max-Age', '86400');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCorsHeaders(res);

  // 1. Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  // 2. Handle GET requests (direct browser visits, health checks, uptime monitors)
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

  // 3. Reject any method other than POST
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: `Method ${req.method} not allowed. Send a POST request to submit inquiries.`,
    });
  }

  // 4. Process POST inquiry
  try {
    const result = await processInquiry(req.body);
    return res.status(result.status).json(result.body);
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    console.error('[API /inquiries] Unhandled error:', errMsg);
    return res.status(500).json({
      error: 'An unexpected internal error occurred. Please contact support@aivolvetechs.com directly.',
    });
  }
}
