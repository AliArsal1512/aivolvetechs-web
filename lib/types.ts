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

export interface InquiryResult {
  status: number;
  body: Record<string, unknown>;
}
