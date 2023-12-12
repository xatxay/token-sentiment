import ReactModal from "react-modal";
import { DataTableProps } from "../utils/interface";
import "./modalStyle.css";
import { CoinDataTable } from "./dataTable";

const DataTableModal = ({
  data,
  columns,
  isOpen,
  closeModal,
  coin,
}: DataTableProps) => {
  return (
    <ReactModal
      isOpen={isOpen || false}
      onRequestClose={closeModal}
      className="modal"
      overlayClassName="overlay"
    >
      {/* <span>{coin}</span> */}
      <CoinDataTable data={data} columns={columns} modal={true} />
    </ReactModal>
  );
};

export default DataTableModal;
