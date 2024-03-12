import { toast } from "react-toastify";
import {
  formatDate,
  formatRedditData,
  queryRedditData,
  useFetch,
} from "../utils/utils";
import { useState } from "react";
import { RedditCoinByDay, RedditData } from "../utils/interface";
import { createColumnHelper } from "@tanstack/react-table";
import { CoinDataTable } from "../twitter/coinsByDayTWT";

const TopCoinInCommentReddit = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(
    new Date(new Date().setDate(new Date().getDate() - 1))
  );
  const apiUrl = String(process.env.REACT_APP_REDDIT_WORDS);
  const { data, error } = useFetch(apiUrl);
  let selectedData: RedditCoinByDay[] = [];

  if (data) {
    const parseData: RedditData[] = JSON.parse(data);
    const formattedDate = formatDate(selectedDate);
    const queryData = queryRedditData(formattedDate, parseData);
    if (queryData) {
      selectedData = formatRedditData(queryData || "");
    }
  }

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
    <div className="w-full h-full flex items-center justify-center">
      <CoinDataTable
        data={selectedData}
        columns={columns}
        startDate={selectedDate}
        setStartDate={setSelectedDate}
        modal={false}
      />
    </div>
  );
};

export default TopCoinInCommentReddit;
