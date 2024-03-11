import TypewriterEffect from "../globalStyle/typewrite";
import { DataTableProps } from "../utils/interface";
import { DataTable } from "./dataTable";

const NoData = ({ data, columns }: DataTableProps) => {
  return (
    <>
      <span>
        No data for this current day. Please select a different date
        <TypewriterEffect text="..." />
      </span>
      <DataTable data={data} columns={columns} />{" "}
    </>
  );
};

export default NoData;
