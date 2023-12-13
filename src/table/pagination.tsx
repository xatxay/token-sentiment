import { Pagination } from "../utils/interface";
import { PaginationButton } from "./paginationStyle";

const PaginationControll = ({
  canPreviousPage,
  canNextPage,
  previousPage,
  nextPage,
  pageIndex,
  pageCount,
  setPageIndex,
}: Pagination) => {
  return (
    <>
      <PaginationButton
        onClick={() => setPageIndex(0)}
        disabled={!canPreviousPage}
      >
        {"<<"}
      </PaginationButton>
      <PaginationButton
        onClick={() => previousPage()}
        disabled={!canPreviousPage}
      >
        {"<"}
      </PaginationButton>
      <span>
        Page{" "}
        <strong>
          {pageIndex + 1} of {pageCount}
        </strong>
      </span>
      <PaginationButton onClick={() => nextPage()} disabled={!canNextPage}>
        {">"}
      </PaginationButton>
      <PaginationButton
        onClick={() => setPageIndex(pageCount - 1)}
        disabled={!canNextPage}
      >
        {">>"}
      </PaginationButton>
    </>
  );
};

export default PaginationControll;
