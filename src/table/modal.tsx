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
  // console.log("data table: ", data);
  return (
    <ReactModal
      isOpen={isOpen || false}
      onRequestClose={closeModal}
      className="absolute flex items-center justify-center border-none p-8 modal w-5/6 h-5/6 md:h-3/4 m-auto overflow-hidden"
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 z-50 overlay flex items-center justify-center"
    >
      <DataTable data={data} columns={columns} />
    </ReactModal>
  );
};

export default DataTableModal;
