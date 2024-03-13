import DatePicer from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datePickerStyle.css";
import { StartDate } from "../utils/interface";
import { findClosestDate } from "../utils/utils";

const DateSelector = ({
  startDate,
  setStartDate,
  twitterMaxDate,
  allDate,
}: StartDate) => {
  const maxDate = twitterMaxDate
    ? twitterMaxDate
    : new Date(new Date().setDate(new Date().getDate() - 1));
  let goBackADay;
  let goForwardADay;

  if (allDate && allDate.length > 0) {
    goBackADay = () => {
      const previosAvailableDate = findClosestDate(startDate, "prev", allDate);
      setStartDate(previosAvailableDate);
    };

    goForwardADay = () => {
      const nextAvailableDate = findClosestDate(startDate, "next", allDate);
      setStartDate(nextAvailableDate);
    };
  } else {
    goBackADay = () => {
      const previousDay = new Date(startDate.getTime());
      previousDay.setDate(previousDay.getDate() - 1);
      setStartDate(previousDay);
    };

    goForwardADay = () => {
      const nextDay = new Date(startDate.getTime());
      nextDay.setDate(nextDay.getDate() + 1);
      if (nextDay <= maxDate) {
        setStartDate(nextDay);
      }
    };
  }

  return (
    <div className="flex flex-row items-center justify-center">
      <button
        className="bg-gray-400 cursor-pointer mx-4 px-2 hover:bg-gray-600"
        onClick={goBackADay}
      >
        {"<"}
      </button>
      {allDate && allDate.length > 0 ? (
        <DatePicer
          selected={startDate}
          dateFormat="yyyy-MM-dd"
          maxDate={maxDate}
          onChange={(date: Date) => setStartDate(date)}
          includeDates={allDate}
          filterDate={(date) =>
            allDate.some((d) => d.toDateString() === date.toDateString())
          }
        />
      ) : (
        <DatePicer
          selected={startDate}
          dateFormat="yyyy-MM-dd"
          maxDate={maxDate}
          onChange={(date: Date) => setStartDate(date)}
        />
      )}
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
