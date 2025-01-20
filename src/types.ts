export type ClaimStatus = 'pending' | 'processing' | 'resolved' | 'rejected';
export type InsuranceType = 'auto' | 'home' | 'health' | 'life' | 'liability';
export type ContractStatus = 'active' | 'pending' | 'expired' | 'cancelled';
export type SupportTicketType = 'complaint' | 'question' | 'other';
export type SupportTicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type DocumentCategory = 'contracts' | 'invoices' | 'certificates' | 'personal';

export interface Claim {
  id: string;
  type: string;
  description: string;
  date: string;
  status: ClaimStatus;
  documents: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Insurance {
  id: string;
  type: InsuranceType;
  contractNumber: string;
  startDate: string;
  endDate: string;
  premium: number;
  status: ContractStatus;
  documents: string[];
}

export interface SupportTicket {
  id: string;
  type: SupportTicketType;
  contractNumber?: string;
  message: string;
  attachments: string[];
  status: SupportTicketStatus;
  createdAt: string;
  updatedAt: string;
  responses: SupportResponse[];
}

export interface SupportResponse {
  id: string;
  message: string;
  createdAt: string;
  isAgent: boolean;
}

export interface Document {
  id: string;
  name: string;
  category: DocumentCategory;
  url: string;
  size: number;
  createdAt: string;
  contractId?: string;
}

export interface Notification {
  id: string;
  message: string;
  date: string;
  read: boolean;
}