import { useTable } from "react-table";
import { CoinDataTableProps, DataTableProps } from "../utils/interface";
import { Table, TableHead } from "./tableStyle";
import {
  BackgroundTable,
  LeftContainer,
  RightContainer,
  TopicHeader,
  TwitterPage,
} from "../twitter/twitterStyle";
import DateSelector from "./datePicker";

const DataTable = ({ data, columns }: DataTableProps) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <>
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
              <tr {...row.getRowProps()} key={row.id}>
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
