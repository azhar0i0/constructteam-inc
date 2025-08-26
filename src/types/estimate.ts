export interface CompanyInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface PaymentInfo {
  acceptedMethods: string[];
  bankName: string;
  accountName: string;
  accountNumber: string;
  routingNumber: string;
  paypalEmail: string;
  venmoUsername: string;
  notes: string;
}

export interface TermsConditions {
  validityPeriod: string;
  depositRequired: string;
  paymentTerms: string;
  additionalCharges: string;
  timeline: string;
  notes: string;
}

export interface ClientInfo {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface ProjectDetails {
  title: string;
  description: string;
  estimateNumber: string;
  validUntil: string;
}

export interface LineItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface Section {
  id: string;
  title: string;
  lineItems: LineItem[];
}

export interface EstimateData {
  company: CompanyInfo;
  client: ClientInfo;
  project: ProjectDetails;
  sections: Section[];
  taxRate: number;
  paymentInfo: PaymentInfo;
  termsConditions: TermsConditions;
}

export const defaultCompanyInfo: CompanyInfo = {
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
};

export const defaultClientInfo: ClientInfo = {
  companyName: '',
  contactName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
};

export const defaultProjectDetails: ProjectDetails = {
  title: '',
  description: '',
  estimateNumber: `EST-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
  validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
};

export const defaultPaymentInfo: PaymentInfo = {
  acceptedMethods: ['Bank Transfer', 'Check'],
  bankName: '',
  accountName: '',
  accountNumber: '',
  routingNumber: '',
  paypalEmail: '',
  venmoUsername: '',
  notes: '',
};

export const defaultTermsConditions: TermsConditions = {
  validityPeriod: '30 days',
  depositRequired: '50%',
  paymentTerms: 'Final payment due upon project completion',
  additionalCharges: 'Additional changes may incur extra charges',
  timeline: 'Estimated completion time will be discussed upon project acceptance',
  notes: 'This estimate includes all specified services. Any additional features or changes requested during the project will be quoted separately.',
};