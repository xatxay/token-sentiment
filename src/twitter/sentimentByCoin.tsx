import React, { useMemo, useState } from "react";
import BrushChart from "../chart/brushChart";
import {
  SentimentByCoinProps,
  SentimentByUserProps,
  SentimentValidJson,
} from "../utils/interface";
import { modifyValidJson, querySentimentCoin, useFetch } from "../utils/utils";
import {
  SentimentByCoinInput,
  TopicContainer,
  TwitterTableName,
} from "./twitterStyle";
import DataTableModal from "../table/modal";
import { createColumnHelper } from "@tanstack/react-table";

const SentimentByCoin = ({
  openModal,
  closeModal,
  isOpen,
}: SentimentByCoinProps) => {
  const [coin, setCoin] = useState<string>("BTC");
  const [filterData, setFilterData] = useState<SentimentValidJson[]>([]);
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
        cell: (info) =>
          Object.entries(info.getValue())
            .map(([key, value]) => `${key}: ${value}`)
            .join(", "),
      }),
      columnHelper.accessor("tweet_url", {
        header: "Tweet",
        cell: (info) => {
          return (
            <TwitterTableName
              href={info.row.original.tweet_url}
              target="_blank"
            >
              View Tweet
            </TwitterTableName>
          );
        },
      }),
    ],
    [columnHelper]
  );

  let modifiedData: SentimentValidJson[] = [];
  if (data) {
    const parseData: SentimentByUserProps[] = JSON.parse(data).filter(
      (sentiment: SentimentByUserProps) => sentiment.coin_sentiment !== "{}"
    );
    // console.log("gdgdfgfdg: ", parseData);
    modifiedData = modifyValidJson(parseData);
  }
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!coin.trim()) {
      return;
    }
    const data = querySentimentCoin(coin, modifiedData);
    setFilterData(data);
    console.log("query: ", data);
  };
  // console.log("valid data: ", modifiedData);
  if (loading) {
    return <div>Loading</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  console.log("submit coin: ", coin);
  return (
    <>
      <TopicContainer>
        <h3>Sentiment By Coin</h3>
        <form onSubmit={handleSubmit}>
          <SentimentByCoinInput
            required
            placeholder="Enter a coin! For Example: ETH"
            onChange={(e) => setCoin(e.target.value.toUpperCase())}
          />
        </form>
        <BrushChart data={filterData} coin={coin} openModal={openModal} />
      </TopicContainer>
      <DataTableModal
        data={filterData}
        columns={columns}
        isOpen={isOpen}
        closeModal={closeModal}
      />
    </>
  );
};

export default SentimentByCoin;
