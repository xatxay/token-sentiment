import { useState } from "react";
import Homepage from "./homepage/homepage";
import ReactModal from "react-modal";
import { ToastContainer } from "react-toastify";

ReactModal.setAppElement("#root");

function App() {
  const [startDate, setStartDate] = useState<Date>(new Date());

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick
        pauseOnHover
        theme="dark"
      />
      <Homepage startDate={startDate} setStartDate={setStartDate} />
    </>
  );
}

export default App;
