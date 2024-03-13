// import { useTable, usePagination } from "react-table";
import { TwitterTableBody } from "../twitter/twitterTableBody";
import { DataTableProps } from "../utils/interface";
import { YoutubeTableBody } from "../youtube/youtubeTableBody";
import PaginationControll from "./pagination";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useState } from "react";

const DataTable = ({
  data,
  columns,
  handleRowClicked,
  expandTwitterTableBody,
  twitterExpandData,
  selectedCoin,
  expandYoutubeTableBody,
  youtubeExpandData,
  setParseVideoData,
}: DataTableProps) => {
  console.log(
    "datatable: ",
    youtubeExpandData,
    selectedCoin,
    expandYoutubeTableBody
  );
  const [pageIndexNumber, setPageIndexNumber] = useState<number>(0);
  const maxPageSize = 5;
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination: {
        pageIndex: pageIndexNumber,
        pageSize: maxPageSize,
      },
    },
  });

  const nextPage = () => {
    const newPageIndex = pageIndexNumber + 1;
    setPageIndexNumber(newPageIndex);
  };

  const previousPage = () => {
    const newPageIndex = pageIndexNumber - 1;
    setPageIndexNumber(newPageIndex);
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <table className="max-w-full border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup, index) => (
              <tr key={`${headerGroup.id}, ${index}`}>
                {headerGroup.headers.map((header, i) => (
                  <td
                    className="p-1 md:p-2 text-xs md:text-sm text-center border-2 border-gray-500"
                    key={`${header.id}, ${i}`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </td>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, index) => (
              <>
                <tr
                  key={`${row.id} ${index}`}
                  onClick={() => {
                    if (
                      expandYoutubeTableBody &&
                      youtubeExpandData &&
                      youtubeExpandData?.length > 0
                    ) {
                      setParseVideoData && setParseVideoData([]);
                    }
                    if (handleRowClicked) {
                      handleRowClicked(row.original.coin);
                    }
                  }}
                  className={
                    handleRowClicked
                      ? `hover:bg-gray-800 cursor-pointer`
                      : "cursor-default"
                  }
                >
                  {row.getVisibleCells().map((cell, index) => (
                    <td
                      className="p-1 md:p-2 text-xs md:text-sm text-center border-2 border-gray-500 text-gray-400"
                      key={`${cell.id}, ${index}`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
                {expandTwitterTableBody &&
                selectedCoin &&
                selectedCoin === row.original.coin ? (
                  <TwitterTableBody
                    data={twitterExpandData || []}
                    key={row.id}
                  />
                ) : null}
                {expandYoutubeTableBody &&
                selectedCoin &&
                selectedCoin === row.original.coin ? (
                  <YoutubeTableBody
                    data={youtubeExpandData || []}
                    key={row.id}
                  />
                ) : null}
              </>
            ))}
          </tbody>
        </table>
        <div className="flex flex-row items-center justify-center w-full gap-5 mt-5">
          <PaginationControll
            canPreviousPage={table.getCanPreviousPage()}
            canNextPage={table.getCanNextPage()}
            previousPage={previousPage}
            nextPage={nextPage}
            pageIndex={table.getState().pagination.pageIndex}
            pageCount={table.getPageCount()}
            setPageIndex={(newPageIndex) => setPageIndexNumber(newPageIndex)}
          />
        </div>
      </div>
    </>
  );
};

export { DataTable };
