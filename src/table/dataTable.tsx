// import { useTable, usePagination } from "react-table";
import { TwitterTableBody } from "../twitter/twitterTableBody";
import { DataTableProps } from "../utils/interface";
import PaginationControll from "./pagination";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useState } from "react";

const cellStyle = {
  width: "275px",
  overflowWrap: "break-word" as const,
  whiteSpace: "normal" as const,
};

const DataTable = ({
  data,
  columns,
  handleRowClicked,
  expandTwitterTableBody,
  twitterExpandData,
  selectedCoin,
  // expandYoutubeTableBody,
  // youtubeExpandData,
  // setParseVideoData,
  openTiktokLink,
  sentimentByUser,
}: DataTableProps) => {
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
      <table
      // className={`${expandYoutubeTableBody && "min-w-min"}  border-collapse`}
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup, index) => (
            <tr key={`${headerGroup.id}, ${index}`}>
              {headerGroup.headers.map((header, i) => (
                <td
                  style={cellStyle}
                  className="p-1 md:p-2 lg:px-8 text-xs md:text-sm lg:text-base font-bold text-center border-2 border-gray-500"
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
                  if (sentimentByUser) {
                    window.open(row.original.tweet_url, "_blank");
                  }
                  if (openTiktokLink) {
                    const tiktokLink = `https://www.tiktok.com/@${row.original.username}/video/${row.original.video_id}`;
                    window.open(tiktokLink, "_blank");
                  }
                  if (handleRowClicked) {
                    handleRowClicked(row.original.coin);
                  }
                }}
                className={
                  handleRowClicked || openTiktokLink || sentimentByUser
                    ? `hover:bg-gray-800 cursor-pointer`
                    : "cursor-default"
                }
              >
                {row.getVisibleCells().map((cell, index) => (
                  <td
                    style={cellStyle}
                    className="p-1 md:p-2 lg:px-8 text-xs md:text-sm lg:text-base text-center border-2 border-gray-500 text-gray-400"
                    key={`${cell.id}, ${index}`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
              {expandTwitterTableBody &&
              selectedCoin &&
              selectedCoin === row.original.coin ? (
                <TwitterTableBody data={twitterExpandData || []} key={row.id} />
              ) : null}
              {/* {expandYoutubeTableBody &&
              selectedCoin &&
              selectedCoin === row.original.coin ? (
                <YoutubeTableBody data={youtubeExpandData || []} key={row.id} />
              ) : null} */}
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
    </>
  );
};

export { DataTable };
