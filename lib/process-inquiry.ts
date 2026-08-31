import { dispatchInquiryEmail } from './dispatch-email';
import type { Inquiry, InquiryResult } from './types';

export async function processInquiry(body: unknown): Promise<InquiryResult> {
  try {
    let payload = body;

    // Handle stringified JSON if received
    if (typeof payload === 'string') {
      try {
        payload = JSON.parse(payload);
      } catch {
        return { status: 400, body: { error: 'Invalid JSON payload received.' } };
      }
    }

    if (!payload || typeof payload !== 'object') {
      return { status: 400, body: { error: 'Request body must be a valid JSON object.' } };
    }

    const { name, email, company, market, service, budget, message } = payload as Record<
      string,
      unknown
    >;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return { status: 400, body: { error: 'Full name is required.' } };
    }

    if (
      !email ||
      typeof email !== 'string' ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      return { status: 400, body: { error: 'A valid work email address is required.' } };
    }

    if (!service || typeof service !== 'string' || service.trim().length === 0) {
      return { status: 400, body: { error: 'Please select a core discipline/service.' } };
    }

    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return {
        status: 400,
        body: { error: 'Please provide a brief project summary (minimum 5 characters).' },
      };
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

    return {
      status: 201,
      body: {
        success: true,
        message:
          'Thank you! Your project inquiry has been transmitted to support@aivolvetechs.com. Our principal leads will contact you shortly.',
        inquiryId: newInquiry.id,
        deliveryMethod: dispatchResult.method,
        delivered: dispatchResult.sent,
        ...(dispatchResult.warning ? { note: dispatchResult.warning } : {}),
      },
    };
  } catch (err) {
    console.error('Error handling inquiry submission:', err);
    return {
      status: 500,
      body: {
        error: 'Failed to process inquiry. Please try again or email support@aivolvetechs.com directly.',
      },
    };
  }
}
