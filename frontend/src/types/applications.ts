export interface Application {
  id: number;
  company: string;
  position: string;
  location: string | null;
  status: "Applied" | "Interview" | "Offer" | "Rejected";
  date_applied: string | null;
  salary: number | null;
  notes: string | null;
  created_at: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface Stats {
    total: number;
    active: number;
    applied: number;
    interview: number;
    offer: number;
    rejected: number;
}

export interface ApplicationsResponse {
  applications: Application[];
  pagination: Pagination;
  stats: Stats;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface SearchProps {
  onSearch: (term: string) => void;
}

export interface StatusFilterProps {
  onStatusChange: (status: string) => void;
  selectedStatus: string;
}

export type ApplicationStatus = "Applied" | "Interview" | "Offer" | "Rejected";

export interface NewApplicationFormProps {
  company: string;
  position: string;
  location: string;
  status: ApplicationStatus;
  date_applied: string | null;
  salary: number | null;
  notes: string;
}

export type OnCancel = () => void;

export interface NewApplicationFormSubmit {
  onSubmit: (application: NewApplicationFormProps) => Promise<void>;
  onCancel: OnCancel;
}

export interface UpdateApplication {
  id: number;
  company: string;
  position: string;
  location: string;
  status: ApplicationStatus;
  date_applied: string | null;
  salary: number | null;
  notes: string;
}

export interface EditApplicationProps {
  application: Application;
  onEdit: (application: UpdateApplication) => Promise<void>;
  onCancel: OnCancel;
}

export type ToastState = {
  type: "success" | "error" | "";
  message: string;
} | null;
