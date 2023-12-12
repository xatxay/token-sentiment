import DatePicer from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datePickerStyle.css";
import { StartDate } from "../utils/interface";

const DateSelector = ({ startDate, setStartDate }: StartDate) => {
  const maxDate = new Date();
  maxDate.setHours(0, 0, 0, 0);
  return (
    <DatePicer
      showIcon
      selected={startDate}
      dateFormat="yyyy-MM-dd"
      maxDate={maxDate}
      onChange={(date: Date) => setStartDate(date)}
    />
  );
};

export default DateSelector;
