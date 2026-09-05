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

export interface ApplicationsResponse {
  applications: Application[];
  pagination: Pagination;
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
}

export type ApplicationStatus = "Applied" | "Interview" | "Offer" | "Rejected";

export interface NewApplicationFormProps {
  onSubmit: (
    company: string,
    position: string,
    location: string,
    status: ApplicationStatus,
    date_applied: Date | null,
    salary: number | null,
    notes: string,
  ) => void;
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
  onEdit: (
    id: number,
    company: string,
    position: string,
    location: string,
    status: ApplicationStatus,
    date_applied: Date | null,
    salary: number | null,
    notes: string,
  ) => void;
}
