import ReactModal from "react-modal";
import { DataTableProps } from "../utils/interface";
import "./modalStyle.css";
import { DataTable } from "./dataTable";

const DataTableModal = ({
  data,
  columns,
  isOpen,
  closeModal,
}: DataTableProps) => {
  console.log("isopen: ", isOpen);
  console.log("modal data: ", data);
  return (
    <ReactModal
      isOpen={isOpen || false}
      onRequestClose={closeModal}
      className="modal"
      overlayClassName="overlay"
    >
      {/* <span>testing</span> */}
      <DataTable data={data} columns={columns} />
    </ReactModal>
  );
};

export default DataTableModal;
