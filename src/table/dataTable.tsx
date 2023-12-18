// import { useTable, usePagination } from "react-table";
import { DataTableProps } from "../utils/interface";
import { Table, TableContainer, TableHead } from "./tableStyle";
import PaginationControll from "./pagination";
import { PaginationContainer } from "./paginationStyle";
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
      <TableContainer>
        <Table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead head key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableHead key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableHead>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
        <PaginationContainer>
          <PaginationControll
            canPreviousPage={table.getCanPreviousPage()}
            canNextPage={table.getCanNextPage()}
            previousPage={previousPage}
            nextPage={nextPage}
            pageIndex={table.getState().pagination.pageIndex}
            pageCount={table.getPageCount()}
            setPageIndex={(newPageIndex) => setPageIndexNumber(newPageIndex)}
          />
        </PaginationContainer>
      </TableContainer>
    </>
  );
};

export { DataTable };
