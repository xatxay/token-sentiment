// import { useTable, usePagination } from "react-table";
import { CoinDataTableProps, DataTableProps } from "../utils/interface";
import { Table, TableContainer, TableHead } from "./tableStyle";
import {
  BackgroundTable,
  LeftContainer,
  RightContainer,
  TopicHeader,
  TwitterPage,
} from "../twitter/twitterStyle";
import DateSelector from "./datePicker";
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
    debugTable: true,
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

const CoinDataTable = ({
  data,
  columns,
  startDate,
  setStartDate,
  modal,
}: CoinDataTableProps) => {
  return (
    <>
      <TopicHeader>
        <h3>Twitter Sentiment</h3>
      </TopicHeader>
      <TwitterPage>
        <LeftContainer>
          <BackgroundTable>
            <h3>Top Coins By Day</h3>
            {!modal && startDate && setStartDate && (
              <DateSelector startDate={startDate} setStartDate={setStartDate} />
            )}
            <DataTable data={data} columns={columns} />
          </BackgroundTable>
        </LeftContainer>
        <RightContainer>
          <BackgroundTable>Testing</BackgroundTable>
        </RightContainer>
      </TwitterPage>
    </>
  );
};

export { CoinDataTable, DataTable };
