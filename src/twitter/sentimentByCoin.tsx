import React, { useEffect, useMemo, useState } from "react";
import {
  BrushChartDataTest2,
  SentimentByUserProps,
  SentimentValidJson,
} from "../utils/interface";
import {
  aggregateSentimentByCoinData,
  modifyValidJson,
  querySentimentCoin,
  useFetch,
} from "../utils/utils";
import { createColumnHelper } from "@tanstack/react-table";
import HighChartData from "../chart/newBrushChart";
import { DataTable } from "../table/dataTable";

const SentimentByCoin = () => {
  const [coin, setCoin] = useState<string>("BTC");
  const [filterData, setFilterData] = useState<BrushChartDataTest2[]>([]);
  const [modifiedData, setModifiedData] = useState<SentimentValidJson[]>([]);
  const [dataTable, setDataTable] = useState<SentimentValidJson[]>([]);
  const apiUrl = process.env.REACT_APP_SENTIMENT_BY_COIN;
  const { data, error, loading } = useFetch(apiUrl || "");

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
    ],
    [columnHelper]
  );

  const processData = (coin: string, data: SentimentValidJson[]) => {
    const sentimentData = querySentimentCoin(coin, data);
    const groupedData = aggregateSentimentByCoinData(sentimentData, coin);
    setFilterData(groupedData);
  };

  const processClickEventData = (
    coin: string,
    data: SentimentValidJson[],
    date: number
  ) => {
    const sentimentData = querySentimentCoin(coin, data);
    setDataTable(
      sentimentData.filter(
        (d) =>
          new Date(d.date).setHours(0, 0, 0, 0) ===
          new Date(date).setHours(0, 0, 0, 0)
      )
    );
  };

  const handleChartPointClick = (event: Highcharts.PointClickEventObject) => {
    const clickDate = event.point.x;
    console.log("date clicked: ", clickDate);
    processClickEventData(coin, modifiedData, clickDate);
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

  const highChartsSentimentByCoinsFormat: Highcharts.SeriesLineOptions[] = [
    {
      type: "line",
      name: "Sentiment",
      data: filterData.map((d) => ({
        x: d.date,
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

  if (loading) {
    return <div>Loading</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center w-3/4 space-y-4">
        <h3 className="font-extrabold text-xl md:text-2xl">
          Sentiment By Coin
        </h3>
        <form onSubmit={handleSubmit}>
          <input
            className="p-1 md:p-2 lg:p-3 items-center bg-gray-400 box-border border-none font-semibold text-base rounded-md"
            required
            placeholder="Enter a coin! For Example: BTC"
            value={coin}
            onChange={(e) => setCoin(e.target.value.toUpperCase())}
          />
        </form>
        <HighChartData
          seriesData={highChartsSentimentByCoinsFormat}
          title={{
            title: "Sentiment By Coins",
            subtitle: "Cick on the data point to see more data",
          }}
          handleChartPointClick={handleChartPointClick}
        />
      </div>
      <div className="w-1/2 flex items-center justify-center flex-col">
        <DataTable data={dataTable} columns={columns} sentimentByUser={true} />
      </div>
    </>
  );
};

export default SentimentByCoin;
