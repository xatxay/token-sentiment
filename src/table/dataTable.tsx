import { useTable } from "react-table";
import { DataTableProps } from "../utils/interface";
import { Table, TableHead } from "./tableStyle";

const DataTable = ({ data, columns }: DataTableProps) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <Table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TableHead head {...column.getHeaderProps()}>
                {column.render("Header")}
              </TableHead>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <TableHead {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </TableHead>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default DataTable;
