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
  acceptedMethods: ['E-Transfer', 'Wire Transfer', 'Cash'],
  bankName: 'Scotia Bank',
  accountName: 'ConstrucTeam INC.',
  accountNumber: '0225614',
  routingNumber: '',
  paypalEmail: 'info@constructeam.ca',
  venmoUsername: '',
  notes: `Payment can be made via e-transfer to:
Email: info@constructeam.ca
or
Via Wire transfer - Payment made to:
ConstrucTeam INC.
Bank: Scotia Bank
Transit # 10652
Institution # 002
Account No.# 0225614`,
};

export const defaultTermsConditions: TermsConditions = {
  validityPeriod: '30 days',
  depositRequired: '50%',
  paymentTerms: 'Final payment due upon project completion',
  additionalCharges: 'Additional changes may incur extra charges',
  timeline: 'Estimated completion time will be discussed upon project acceptance',
  notes: `☐Booking Fees: 4% of the the Subtotal amount ($78,500)
☐35% of Payment due two days prior to start date for material, labour, handling and delivery charges, etc.
☐ 25% of payment due after framing, plumbing, and electrical rough in is completed.
☐ 20% of payment due upon completion of installation of drywalls, and doors.
☐ 10% after flooring/baseboard, fixtures, mudding, and sanding is completed.
☐ 6% due upon when finishing is completed.

1) This Purchase Agreement contains all terms and conditions of the sale as agreed by ConsTrucTeam INC and the purchaser
2) No verbal agreement is granted or honored unless it is in writing.
3) ConstrucTeam INC shall not be responsible for damages or delays due to strikes, fire, and other natural disasters.
4) All products installed are standard industry materials unless otherwise stated. Any custom jobs performed will have an extra charge which may include Labour + Material costs.
5) All unpaid and overdue amounts shall bear a service charge of 5% per month from the date of default. This is not interest, nor is it a penalty for the late payment. The service charge is the cost of maintaining an unpaid account.
6) In the event that the account remains overdue for more than 60 days, it will be sent to collection and ConstrucTeam INC will reserve the right to add the corresponding collection agency charges to the overdue balance and collect in full.
7) The collection process may include placing lien/notice of security interest on the title of the property at the client's expense. The registration and discharge legal fees in addition to the collection charges will be added to the total balance due on any Purchase Agreement that remains unpaid more than 60 days of the Purchase Agreement date.
8) ConstrucTeam INC will be responsible if the newly built structure is damaged during installation. The owner will have 30 days to raise this issue, and ConstrucTeam will do its level best to rectify the concern.
9) In unforeseen circumstances (shortage, price hikes etc) ConstrucTeam INC is allowed to revise quote if the work has not started yet.`,
};