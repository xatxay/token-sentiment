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
        <span>{`<<`}</span>
      </PaginationButton>
      <PaginationButton
        onClick={() => previousPage()}
        disabled={!canPreviousPage}
      >
        <span>{`<`}</span>
      </PaginationButton>
      <span>
        Page{" "}
        <strong>
          {pageIndex + 1} of {pageCount}
        </strong>
      </span>
      <PaginationButton onClick={() => nextPage()} disabled={!canNextPage}>
        <span>{`>`}</span>
      </PaginationButton>
      <PaginationButton
        onClick={() => setPageIndex(pageCount - 1)}
        disabled={!canNextPage}
      >
        <span>{`>>`}</span>
      </PaginationButton>
    </>
  );
};

export default PaginationControll;
