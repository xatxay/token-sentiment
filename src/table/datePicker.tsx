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
  maxDate,
}: StartDate) => {
  const maxDateCal = twitterMaxDate
    ? twitterMaxDate
    : new Date(new Date().setDate(new Date().getDate() - 1));
  const startDateCompare = new Date(startDate);
  startDateCompare.setHours(0, 0, 0, 0);
  const maxDateCompare = twitterMaxDate
    ? new Date(maxDateCal)
    : new Date(new Date().setDate(new Date().getDate() - 1));
  maxDateCompare.setHours(0, 0, 0, 0);
  const isLatestDate = startDateCompare >= maxDateCompare;

  let goBackADay;
  let goForwardADay;
  let minDateAllDate = false;

  if (allDate && allDate.length > 0) {
    const firstDate = allDate[0];
    minDateAllDate = firstDate >= startDateCompare;
    goBackADay = () => {
      if (!minDateAllDate) {
        console.log("mint date: ", !minDateAllDate);
        const previosAvailableDate = findClosestDate(
          startDate,
          "prev",
          allDate
        );
        console.log("previous available: ", previosAvailableDate);
        setStartDate(previosAvailableDate);
      }
    };

    goForwardADay = () => {
      if (!isLatestDate) {
        const nextAvailableDate = findClosestDate(startDate, "next", allDate);
        setStartDate(nextAvailableDate);
      }
    };
  } else {
    goBackADay = () => {
      const previousDay = new Date(startDate.getTime());
      previousDay.setDate(previousDay.getDate() - 1);
      console.log("else going back: ", previousDay);
      setStartDate(previousDay);
    };

    goForwardADay = () => {
      if (!isLatestDate) {
        const nextDay = new Date(startDate.getTime());
        nextDay.setDate(nextDay.getDate() + 1);
        if (nextDay <= maxDateCal) {
          setStartDate(nextDay);
        }
      }
    };
  }

  return (
    <div className="flex flex-row items-center justify-center">
      <button
        className={`bg-gray-400 mx-4 px-2 hover:bg-gray-600 ${
          minDateAllDate ? "cursor-not-allowed opacity-50" : "cursor-pointer"
        }`}
        onClick={goBackADay}
        disabled={minDateAllDate}
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
        className={`${
          isLatestDate ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        } bg-gray-400 mx-4 px-2 hover:bg-gray-600`}
        onClick={goForwardADay}
        disabled={isLatestDate}
      >
        {">"}
      </button>
    </div>
  );
};

export default DateSelector;
