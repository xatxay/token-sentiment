import { useState } from "react";
import Homepage from "./homepage/homepage";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

function App() {
  const [startDate, setStartDate] = useState<Date>(new Date());

  return <Homepage startDate={startDate} setStartDate={setStartDate} />;
}

export default App;
