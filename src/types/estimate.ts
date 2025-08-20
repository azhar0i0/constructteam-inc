export interface CompanyInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
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
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface EstimateData {
  company: CompanyInfo;
  client: ClientInfo;
  project: ProjectDetails;
  lineItems: LineItem[];
  taxRate: number;
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