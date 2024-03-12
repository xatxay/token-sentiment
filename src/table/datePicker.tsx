import DatePicer from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datePickerStyle.css";
import { StartDate } from "../utils/interface";

const DateSelector = ({ startDate, setStartDate }: StartDate) => {
  const maxDate = new Date(new Date().setDate(new Date().getDate() - 1));

  const goBackADay = () => {
    const previousDay = new Date(startDate.getTime());
    previousDay.setDate(previousDay.getDate() - 1);
    setStartDate(previousDay);
  };

  const goForwardADay = () => {
    const nextDay = new Date(startDate.getTime());
    nextDay.setDate(nextDay.getDate() + 1);
    if (nextDay <= maxDate) {
      setStartDate(nextDay);
    }
  };

  return (
    <div className="flex flex-row items-center justify-center">
      <button
        className="bg-gray-400 cursor-pointer mx-4 px-2 hover:bg-gray-600"
        onClick={goBackADay}
      >
        {"<"}
      </button>
      <DatePicer
        selected={startDate}
        dateFormat="yyyy-MM-dd"
        maxDate={maxDate}
        onChange={(date: Date) => setStartDate(date)}
      />
      <button
        className="bg-gray-400 cursor-pointer mx-4 px-2 hover:bg-gray-600"
        onClick={goForwardADay}
      >
        {">"}
      </button>
    </div>
  );
};

export default DateSelector;
