import { toast } from "react-toastify";
import {
  calculateMinMax,
  querySelectedRedditMenuData,
  useFetch,
} from "../utils/utils";
import { TopicContainer } from "../twitter/twitterStyle";
import { DropDownMenu, DropDownOptions } from "../table/dropdownStyle";
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
    // console.log("reddit chart: ", parseData);
    queryData = querySelectedRedditMenuData(parseData, menu);
    // console.log("queryData: ", queryData);
  }

  if (error) {
    console.error("Failed fetching reddit chart: ", error);
    toast.error(error);
  }

  const { min, max } = calculateMinMax(queryData, "data");
  return (
    <>
      <TopicContainer>
        <h3>Reddit Statistics</h3>
        <DropDownMenu value={menu} onChange={handleSelectMenu}>
          {menuOption.map((option) => {
            return (
              <DropDownOptions key={option} value={option}>
                {option}
              </DropDownOptions>
            );
          })}
        </DropDownMenu>
        <BrushChart data={queryData} min={min} max={max} isClickable={false} />
      </TopicContainer>
    </>
  );
};

export default RedditChart;
