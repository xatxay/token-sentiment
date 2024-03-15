/** @jsxImportSource @emotion/react */
import React, { useEffect, useMemo, useState } from "react";
import {
  duplicateCoins,
  extractTwitterSentimentByDay,
  formatCoinSentimentByDayPieChart,
  formatDate,
  insertArrayData,
  removeDuplicate,
  useFetch,
} from "../utils/utils";
import {
  ArrayTweetResult,
  CoinByDateYTProps,
  CoinByDayTwtProps,
  CoinDataTableProps,
  DataTableWithPieChartProps,
  PieChartData,
} from "../utils/interface";
import { createColumnHelper } from "@tanstack/react-table";
import { toast } from "react-toastify";
import DateSelector from "../table/datePicker";
import { DataTable } from "../table/dataTable";
import PieChart from "../chart/pieChart";
import { fadeIn } from "../globalStyle/fadeIn";
import { YoutubeTopCoinsTable } from "../youtube/ytTable";

const CoinDataTable = React.memo(
  ({
    data,
    columns,
    startDate,
    setStartDate,
    twitterMaxDate,
    allDate,
    handleRowClicked,
    twitterExpandData,
    selectedCoin,
    expandTwitterTableBody,
    youtubeExpandData,
    setParseVideoData,
    maxDate,
    youtubeTable,
    isTwitterData,
  }: CoinDataTableProps) => {
    return (
      <>
        <div className="flex items-center justify-center flex-col space-y-4 w-full">
          {startDate && setStartDate && (
            <DateSelector
              startDate={startDate}
              setStartDate={setStartDate}
              twitterMaxDate={twitterMaxDate}
              maxDate={maxDate}
              allDate={allDate}
            />
          )}
          {youtubeTable ? (
            <YoutubeTopCoinsTable
              data={data as CoinByDateYTProps[]}
              selectedCoin={selectedCoin}
              youtubeExpandData={youtubeExpandData}
              handleRowClicked={handleRowClicked}
              setParseVideoData={setParseVideoData}
            />
          ) : (
            <DataTable
              data={data}
              columns={columns}
              handleRowClicked={handleRowClicked}
              expandTwitterTableBody={expandTwitterTableBody}
              twitterExpandData={twitterExpandData}
              selectedCoin={selectedCoin}
              isTwitterData={isTwitterData}
            />
          )}
        </div>
      </>
    );
  }
);

const CoinByDayTwt = ({
  coin,
  handleRowClicked,
  selectedCoin,
}: CoinByDayTwtProps) => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [isLoaded, setIsLoaded] = useState(false);
  const dateFormat = formatDate(startDate);
  const twitterUrl = process.env.REACT_APP_TWITTER_BY_DAY;
  const [noDuplicateData, setNoDuplicateData] = useState<ArrayTweetResult[]>(
    []
  );
  const [duplicateData, setDuplicateData] = useState<ArrayTweetResult[]>([]);
  const [pieChartData, setPieChartData] = useState<PieChartData>({
    series: [0],
    labels: [""],
  });
  const [allTwitterDate, setAllTwitterDate] = useState<Date[]>([]);
  const twitterMaxDate = new Date();
  const { data, error, loading } = useFetch(twitterUrl || "", {
    date: dateFormat,
  });

  useEffect(() => {
    console.log("use data: ", data);
    const twitterResult = extractTwitterSentimentByDay(data);
    if (twitterResult === null) {
      setNoDuplicateData([]);
      setDuplicateData([]);
      setPieChartData({
        series: [0],
        labels: [""],
      });
    } else {
      const arrayData = insertArrayData(twitterResult);
      const sortedArrayData = arrayData.sort((a, b) => b.mentions - a.mentions);
      const noDuplicateData = removeDuplicate(sortedArrayData) || [];
      const duplicateData = duplicateCoins(sortedArrayData, coin || "") || [];
      const pieChartData = formatCoinSentimentByDayPieChart(noDuplicateData);
      setNoDuplicateData(noDuplicateData);
      setDuplicateData(duplicateData);
      setPieChartData(pieChartData);
    }
  }, [coin, data]);

  useEffect(() => {
    const twitterStartDate = new Date(2023, 9, 12);
    const currentDate = new Date();
    const dateArrays: Date[] = [];
    while (twitterStartDate <= currentDate) {
      dateArrays.push(new Date(twitterStartDate));
      twitterStartDate.setDate(twitterStartDate.getDate() + 1);
    }
    setAllTwitterDate(dateArrays);
  }, []);

  if (error) {
    console.error("Failed fetching twitter data: ", error);
    toast.error(error);
  }

  const columnHelper = createColumnHelper<ArrayTweetResult>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("coin", {
        header: () => "Coin",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor((row) => `${row.mentions} (${row.uniqueUser})`, {
        id: "mentionUniqueUsers",
        header: () => "Mentions (Unique Users)",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("avgPostSentiments", {
        header: "Sentiment",
        cell: (info) => info.getValue()?.toFixed(2),
      }),
    ],
    [columnHelper]
  );

  useEffect(() => {
    if (!loading && data) {
      setIsLoaded(true);
    }
  }, [data, loading]);

  return (
    <div className="flex flex-col items-center justify-center w-full space-y-4">
      {noDuplicateData.length > 0 && noDuplicateData !== undefined ? (
        <DataTableWithPieChart
          isLoaded={isLoaded}
          data={noDuplicateData}
          columns={columns}
          coin={coin || null}
          startDate={startDate}
          setStartDate={setStartDate}
          twitterMaxDate={twitterMaxDate}
          series={pieChartData.series}
          labels={pieChartData.labels}
          handleRowClicked={handleRowClicked}
          twitterExpandData={duplicateData}
          selectedCoin={selectedCoin}
          expandTwitterTableBody={true}
          allDate={allTwitterDate}
          isTwitterData={true}
        />
      ) : (
        <div
          css={isLoaded ? fadeIn : undefined}
          className="space-y-4 flex-1 flex items-center justify-center flex-col w-full"
        >
          <h3 className="font-extrabold text-xl md:text-2xl">
            Top Coins By Day
          </h3>
          <CoinDataTable
            data={noDuplicateData}
            columns={columns}
            coin={coin || null}
            startDate={startDate}
            setStartDate={setStartDate}
            twitterMaxDate={twitterMaxDate}
            handleRowClicked={handleRowClicked}
            twitterExpandData={duplicateData}
            selectedCoin={selectedCoin}
            expandTwitterTableBody={true}
            allDate={allTwitterDate}
            isTwitterData={true}
          />
        </div>
      )}
    </div>
  );
};

export const DataTableWithPieChart = ({
  isLoaded,
  data,
  columns,
  coin,
  startDate,
  setStartDate,
  maxDate,
  series,
  labels,
  handleRowClicked,
  twitterExpandData,
  selectedCoin,
  expandTwitterTableBody,
  allDate,
  youtubeExpandData,
  twitterMaxDate,
  youtubeTable,
  setParseVideoData,
  isTwitterData,
}: DataTableWithPieChartProps) => {
  return (
    <div
      className={`flex items-start justify-start lg:space-x-10 flex-col lg:flex-row ${
        youtubeTable && "w-3/4"
      }`}
    >
      <div
        css={isLoaded ? fadeIn : undefined}
        className="flex items-center justify-center flex-col space-y-4 flex-1 w-3/4 lg:w-full"
      >
        <h3 className="font-extrabold text-lg md:text-xl mt-4">
          Top Coins By Day
        </h3>
        <CoinDataTable
          data={data}
          columns={columns}
          coin={coin || null}
          startDate={startDate}
          setStartDate={setStartDate}
          twitterMaxDate={twitterMaxDate}
          handleRowClicked={handleRowClicked}
          twitterExpandData={twitterExpandData}
          selectedCoin={selectedCoin}
          expandTwitterTableBody={expandTwitterTableBody}
          allDate={allDate}
          maxDate={maxDate}
          youtubeExpandData={youtubeExpandData}
          youtubeTable={youtubeTable}
          setParseVideoData={setParseVideoData}
          isTwitterData={isTwitterData}
        />
      </div>
      <div className="flex items-center justify-center flex-col space-y-6 flex-1 w-full">
        <h3 className="font-extrabold text-lg md:text-xl mt-4">
          {youtubeTable
            ? `Top Coins By Day (#Videos)`
            : `Top Coins By Day (#Mentions)`}
        </h3>
        <PieChart series={series} labels={labels} />
      </div>
    </div>
  );
};

export { CoinDataTable, CoinByDayTwt };
