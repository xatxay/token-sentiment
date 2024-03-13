import { toast } from "react-toastify";
import {
  formatDate,
  formatRedditData,
  getAllAvailableDate,
  queryRedditData,
  useFetch,
} from "../utils/utils";
import { useEffect, useState } from "react";
import { RedditCoinByDay, RedditData } from "../utils/interface";
import { createColumnHelper } from "@tanstack/react-table";
import { CoinDataTable } from "../twitter/coinsByDayTWT";

const TopCoinInCommentReddit = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(
    new Date(new Date().setDate(new Date().getDate() - 1))
  );
  const apiUrl = String(process.env.REACT_APP_REDDIT_WORDS);
  const { data, error } = useFetch(apiUrl);
  const [selectedData, setSelectedData] = useState<RedditCoinByDay[]>([]);
  const [redditAvailableDate, setRedditAvailbleDate] = useState<Date[]>([]);

  useEffect(() => {
    if (data) {
      const parseData: RedditData[] = JSON.parse(data);
      const formattedDate = formatDate(selectedDate);
      const queryData = queryRedditData(formattedDate, parseData);
      if (queryData) {
        const redditData = formatRedditData(queryData || "");
        setSelectedData(redditData);
      }
      const dates = parseData.map((d) => d.date);
      const redditDates = getAllAvailableDate(dates);
      setRedditAvailbleDate(redditDates);
    }
  }, [data, selectedDate]);

  if (error) {
    console.error(error);
    toast.error(error);
  }

  const columnHelper = createColumnHelper<RedditCoinByDay>();
  const columns = [
    columnHelper.accessor("coin", {
      header: "Coin",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("occurences", {
      header: "Occurences",
      cell: (info) => info.getValue(),
    }),
  ];
  return (
    <div className="w-full h-full flex items-center justify-center flex-col space-y-4">
      <h3 className="font-extrabold text-xl md:text-2xl">Top Coins By Day</h3>
      <CoinDataTable
        data={selectedData}
        columns={columns}
        startDate={selectedDate}
        setStartDate={setSelectedDate}
        allDate={redditAvailableDate}
      />
    </div>
  );
};

export default TopCoinInCommentReddit;
