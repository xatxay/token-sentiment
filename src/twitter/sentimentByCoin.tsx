import React, { useEffect, useMemo, useState } from "react";
import BrushChart from "../chart/brushChart";
import {
  BrushChartData,
  SentimentByCoinProps,
  SentimentByUserProps,
  SentimentValidJson,
} from "../utils/interface";
import {
  aggregateSentimentByCoinData,
  modifyValidJson,
  querySentimentCoin,
  useFetch,
} from "../utils/utils";
import DataTableModal from "../table/modal";
import { createColumnHelper } from "@tanstack/react-table";

const SentimentByCoin = ({
  openModal,
  closeModal,
  isOpen,
}: SentimentByCoinProps) => {
  const [coin, setCoin] = useState<string>("ETH");
  const [filterData, setFilterData] = useState<BrushChartData[]>([]);
  const [modifiedData, setModifiedData] = useState<SentimentValidJson[]>([]);
  const [dataTable, setDataTable] = useState<SentimentValidJson[]>([]);
  const apiUrl = process.env.REACT_APP_SENTIMENT_BY_COIN;
  const { data, error, loading } = useFetch(apiUrl || "");
  const { min, max } = { min: -1, max: 1 };

  const columnHelper = createColumnHelper<SentimentValidJson>();
  const columns = useMemo(
    () => [
      columnHelper.accessor("date", {
        header: () => "Date",
        cell: (info) => new Date(info.getValue()).toDateString(),
      }),
      columnHelper.accessor("username", {
        header: "Username",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("coin_sentiment", {
        header: "Sentiment",
        cell: (info) => {
          const sentiment = Object.entries(info.getValue())
            .map(([key, value]) => `${key}: ${value}`)
            .join(", ");
          return sentiment;
        },
      }),
      columnHelper.accessor("tweet_url", {
        header: "Tweet",
        cell: (info) => {
          return (
            <a
              rel="noreferrer"
              className="hover:text-white"
              href={info.row.original.tweet_url}
              target="_blank"
            >
              View Tweet
            </a>
          );
        },
      }),
    ],
    [columnHelper]
  );

  const processData = (coin: string, data: SentimentValidJson[]) => {
    const sentimentData = querySentimentCoin(coin, data);
    setDataTable(sentimentData);
    const groupedData = aggregateSentimentByCoinData(sentimentData, coin);
    setFilterData(groupedData);
  };
  useEffect(() => {
    if (data) {
      const parseData: SentimentByUserProps[] = JSON.parse(data).filter(
        (sentiment: SentimentByUserProps) => sentiment.coin_sentiment !== "{}"
      );
      const newModifiedData = modifyValidJson(parseData);
      setModifiedData(newModifiedData);
    }
  }, [data]);
  useEffect(() => {
    if (coin && modifiedData.length > 0) {
      processData(coin, modifiedData);
    }
  }, [coin, modifiedData]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!coin.trim()) {
      return;
    }
    processData(coin, modifiedData);
  };
  if (loading) {
    return <div>Loading</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  if ((filterData.length = 0)) return <div>NO data</div>;
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full space-y-4">
        <h3 className="font-extrabold text-xl md:text-2xl">
          Sentiment By Coin
        </h3>
        <form onSubmit={handleSubmit}>
          <input
            className="p-1 md:p-2 lg:p-4 items-center bg-gray-400 box-border border-none font-semibold text-base"
            required
            placeholder="Enter a coin! For Example: ETH"
            value={coin}
            onChange={(e) => setCoin(e.target.value.toUpperCase())}
          />
        </form>
        <BrushChart
          data={filterData}
          openModal={openModal}
          min={min}
          max={max}
          isClickable={true}
        />
      </div>
      <DataTableModal
        data={dataTable}
        columns={columns}
        isOpen={isOpen}
        closeModal={closeModal}
      />
    </>
  );
};

export default SentimentByCoin;
