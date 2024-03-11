// import { useTable, usePagination } from "react-table";
import { DataTableProps } from "../utils/interface";
import PaginationControll from "./pagination";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useState } from "react";

const DataTable = ({ data, columns }: DataTableProps) => {
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
  // if (data.length === 0 || columns.length === 0) return;

  return (
    <>
      <div className="flex flex-col items-center w-full">
        <table className="w-full border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <td
                    className="p-3 text-center border-2 border-gray-500"
                    key={header.id}
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
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    className="p-3 text-center border-2 border-gray-500 text-gray-400"
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
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
