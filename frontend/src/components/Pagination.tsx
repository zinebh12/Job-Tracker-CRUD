import type { PaginationProps } from "../types/applications";
import PaginationUI from "@/components/smoothui/pagination";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  return (
    <PaginationUI
      page={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
    />
  );
};

export default Pagination;
