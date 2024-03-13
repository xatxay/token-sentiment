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
    expandYoutubeTableBody,
    youtubeExpandData,
    setParseVideoData,
  }: CoinDataTableProps) => {
    console.log("data: ", data);
    return (
      <>
        <div className="flex items-center justify-center flex-col space-y-4">
          {startDate && setStartDate && (
            <DateSelector
              startDate={startDate}
              setStartDate={setStartDate}
              twitterMaxDate={twitterMaxDate}
              allDate={allDate}
            />
          )}
          <DataTable
            data={data}
            columns={columns}
            handleRowClicked={handleRowClicked}
            expandTwitterTableBody={expandTwitterTableBody}
            twitterExpandData={twitterExpandData}
            selectedCoin={selectedCoin}
            expandYoutubeTableBody={expandYoutubeTableBody}
            youtubeExpandData={youtubeExpandData}
            setParseVideoData={setParseVideoData}
          />
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
    console.log("duplicate data: ", duplicateData);
    console.log("no duplicate data: ", noDuplicateData);
  }, [duplicateData, noDuplicateData]);

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
          maxDate={twitterMaxDate}
          series={pieChartData.series}
          labels={pieChartData.labels}
          handleRowClicked={handleRowClicked}
          twitterExpandData={duplicateData}
          selectedCoin={selectedCoin}
          expandTwitterTableBody={true}
        />
      ) : (
        <div
          css={isLoaded ? fadeIn : undefined}
          className="space-y-4 flex-1 flex items-center justify-center flex-col"
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
          />
        </div>
      )}
      {/* <DataTableModal
        data={duplicateData}
        columns={columns}
        isOpen={isOpen}
        closeModal={closeModal}
        coin={coin}
      /> */}
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
  expandYoutubeTableBody,
  youtubeExpandData,
}: DataTableWithPieChartProps) => {
  return (
    <div className="flex items-start justify-start lg:space-x-28 flex-col md:flex-row">
      <div
        css={isLoaded ? fadeIn : undefined}
        className="flex items-center justify-center flex-col space-y-4 flex-1 max-w-min"
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
          twitterMaxDate={maxDate}
          handleRowClicked={handleRowClicked}
          twitterExpandData={twitterExpandData}
          selectedCoin={selectedCoin}
          expandTwitterTableBody={expandTwitterTableBody}
          expandYoutubeTableBody={expandYoutubeTableBody}
          allDate={allDate}
          youtubeExpandData={youtubeExpandData}
        />
      </div>
      <div className="flex items-center justify-center flex-col space-y-6 flex-1 w-full">
        <h3 className="font-extrabold text-lg md:text-xl mt-4">
          Top Coins By Day (#Mentions)
        </h3>
        <PieChart series={series} labels={labels} />
      </div>
    </div>
  );
};

export { CoinDataTable, CoinByDayTwt };
