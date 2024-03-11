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
  return (
    <ReactModal
      isOpen={isOpen || false}
      onRequestClose={closeModal}
      className="modal"
      overlayClassName="overlay"
    >
      <DataTable data={data} columns={columns} />
    </ReactModal>
  );
};

export default DataTableModal;
