import type { PaginationProps } from "./../types/applications";
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {

  return (
    <div>
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            disabled={currentPage === page}
            onClick={() => onPageChange(page)}
            className={currentPage === page ? "font-bold" : ""}
          >
            {page}
          </button>
        );
      })}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
