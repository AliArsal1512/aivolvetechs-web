export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  fullDescription?: string;
  deliverable?: string;
  icon: string;
  keywords: string[];
  features: string[];
}

export interface MarketItem {
  region: string;
  description: string;
  countries: string[];
  isPrimary?: boolean;
}

export interface ClientTier {
  title: string;
  subtitle?: string;
  description: string;
  solution: string;
}

export interface Differentiator {
  title: string;
  description: string;
}

export interface TeamDepartment {
  name: string;
  description: string;
  roles: string[];
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  deliverable: string;
}

export interface ContactInquiry {
  fullName: string;
  email: string;
  company: string;
  region: string;
  serviceInterest: string;
  budgetRange: string;
  message: string;
}
