import { toast } from "react-toastify";
import {
  calculateMinMax,
  querySelectedRedditMenuData,
  useFetch,
} from "../utils/utils";
import { ChangeEvent, useState } from "react";
import { QueryRedditChartData, RedditChartData } from "../utils/interface";
import BrushChart from "../chart/brushChart";

const RedditChart = () => {
  const apiUrl = String(process.env.REACT_APP_REDDIT_STATS);
  const { data, error } = useFetch(apiUrl);
  const defaultMenu = "New Subscribers";
  const [menu, setMenu] = useState<string>(defaultMenu);
  let queryData: QueryRedditChartData[] = [];

  const menuOption = [
    "New Subscribers",
    "Total Top 10 Upvotes",
    "Users Online",
    "New Posts",
    "New Comments",
  ];

  const handleSelectMenu = (event: ChangeEvent<HTMLSelectElement>) => {
    setMenu(event.target.value);
  };

  if (data) {
    const parseData: RedditChartData[] = JSON.parse(data);
    queryData = querySelectedRedditMenuData(parseData, menu);
  }

  if (error) {
    console.error("Failed fetching reddit chart: ", error);
    toast.error(error);
  }

  const { min, max } = calculateMinMax(queryData, "data");
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full">
        <h3>Reddit Statistics</h3>
        <select
          className="text-gray-800 p-3 box-border font-semibold bg-gray-400"
          value={menu}
          onChange={handleSelectMenu}
        >
          {menuOption.map((option) => {
            return (
              <option
                className="text-black font-semibold"
                key={option}
                value={option}
              >
                {option}
              </option>
            );
          })}
        </select>
        <BrushChart data={queryData} min={min} max={max} isClickable={false} />
      </div>
    </>
  );
};

export default RedditChart;
