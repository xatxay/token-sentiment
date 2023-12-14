import Homepage from "./homepage/homepage";
import ReactModal from "react-modal";
import { ToastContainer } from "react-toastify";

ReactModal.setAppElement("#root");

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick
        pauseOnHover
        theme="dark"
      />
      <Homepage />
    </>
  );
}

export default App;
