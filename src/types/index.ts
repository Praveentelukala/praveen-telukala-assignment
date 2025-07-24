export interface AadharRecord {
  aadharNumber: string;
  name: string;
  income: number;
  address: string;
  phoneNumber: string;
  isValid: boolean;
}

export interface Application {
  id: string;
  aadharNumber: string;
  applicantName: string;
  income: number;
  address: string;
  phoneNumber: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
  reviewedDate?: string;
  rejectionReason?: string;
  expectedConnectionDate?: string;
  concernedOfficer?: {
    name: string;
    designation: string;
    contactNumber: string;
  };
  subsidyAmount?: number;
  subsidyPercentage?: number;
}

export interface SubsidyBracket {
  minIncome: number;
  maxIncome: number;
  percentage: number;
  label: string;
}