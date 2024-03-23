import { toast } from "react-toastify";
import { querySelectedRedditMenuData, useFetch } from "../utils/utils";
import { ChangeEvent, useEffect, useState } from "react";
import { QueryRedditChartData, RedditChartData } from "../utils/interface";
import HighChartData from "../chart/newBrushChart";

const RedditChart = () => {
  const apiUrl = String(process.env.REACT_APP_REDDIT_STATS);
  const { data, error } = useFetch(apiUrl);
  const defaultMenu = "New Subscribers";
  const [menu, setMenu] = useState<string>(defaultMenu);
  const [queryData, setQueryData] = useState<QueryRedditChartData[]>([]);

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

  useEffect(() => {
    if (data) {
      const parseData: RedditChartData[] = JSON.parse(data);
      const redditData = querySelectedRedditMenuData(parseData, menu);
      const filterData = redditData
        .map((d) => ({
          ...d,
          data:
            d.data !== null
              ? typeof d.data === "string"
                ? Math.abs(parseFloat(d.data))
                : Math.abs(d.data)
              : null,
        }))
        .filter((d) => d.data !== null);
      setQueryData(filterData);
    }
  }, [data, menu]);

  const highchartsRedditData: Highcharts.SeriesLineOptions[] = [
    {
      type: "line",
      name: "Reddit Data",
      data: queryData.map((d) => ({
        x: typeof d.date === "string" ? new Date(d.date).getTime() : d.date,
        y: typeof d.data === "string" ? parseFloat(d.data) : d.data,
        tooltipContent: d.tooltipContent,
      })),
      tooltip: {
        pointFormatter: function (this: any) {
          return this.tooltipContent;
        },
      },
    },
  ];

  if (error) {
    console.error("Failed fetching reddit chart: ", error);
    toast.error(error);
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center w-3/4 space-y-4">
        <h3 className="font-extrabold text-xl md:text-2xl">
          Reddit Statistics
        </h3>
        <select
          className="bg-gray-400 overflow-hidden max-w-20 md:max-w-44 border-none py-1 lg:py-3 text-xs md:text-base lg:p-3 box-border font-semibold text-gray-800 rounded-md"
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
        <HighChartData
          seriesData={highchartsRedditData}
          title={{ title: "", subtitle: "" }}
        />
      </div>
    </>
  );
};

export default RedditChart;
