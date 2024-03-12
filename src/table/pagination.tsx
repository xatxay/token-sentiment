import { Pagination } from "../utils/interface";

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
      <button
        className={`border-none font-bold text-sm bg-gray-300 px-2 ld:px-4 lg:py-1 text-gray-700 ${
          !canPreviousPage
            ? "cursor-default hover:bg-gray-300"
            : "cursor-pointer hover:bg-gray-500"
        }`}
        onClick={() => setPageIndex(0)}
        disabled={!canPreviousPage}
      >
        {"<<"}
      </button>
      <button
        className={`border-none font-bold text-sm bg-gray-300 px-2 ld:px-4 lg:py-1 text-gray-700 ${
          !canPreviousPage
            ? "cursor-default hover:bg-gray-300"
            : "cursor-pointer hover:bg-gray-500"
        }`}
        onClick={() => previousPage()}
        disabled={!canPreviousPage}
      >
        {"<"}
      </button>
      <span className="text-xs md:text-sm lg:text-base">
        Page{" "}
        <strong>
          {pageIndex + 1} of {pageCount}
        </strong>
      </span>
      <button
        className={`border-none font-bold text-sm bg-gray-300 px-2 ld:px-4 lg:py-1 text-gray-700 ${
          !canPreviousPage
            ? "cursor-default hover:bg-gray-300"
            : "cursor-pointer hover:bg-gray-500"
        }`}
        onClick={() => nextPage()}
        disabled={!canNextPage}
      >
        {">"}
      </button>
      <button
        className={`border-none font-bold text-sm bg-gray-300 px-2 ld:px-4 lg:py-1 text-gray-700 ${
          !canPreviousPage
            ? "cursor-default hover:bg-gray-300"
            : "cursor-pointer hover:bg-gray-500"
        }`}
        onClick={() => setPageIndex(pageCount - 1)}
        disabled={!canNextPage}
      >
        {">>"}
      </button>
    </>
  );
};

export default PaginationControll;
