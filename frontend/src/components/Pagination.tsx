import type { PaginationProps } from "../types/applications";
import PaginationUI from "@/components/smoothui/pagination";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  return (
    <div className="flex w-full justify-center py-2">
      <PaginationUI
        page={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        className="text-forest"
      />
    </div>
  );
};

export default Pagination;
