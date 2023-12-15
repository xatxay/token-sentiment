import React, { useState } from "react";
import BrushChart from "../chart/brushChart";
import { SentimentByUserProps, SentimentValidJson } from "../utils/interface";
import { modifyValidJson, querySentimentCoin, useFetch } from "../utils/utils";
import { SentimentByCoinInput, TopicContainer } from "./twitterStyle";

const SentimentByCoin = () => {
  const [coin, setCoin] = useState<string>("BTC");
  const [filterData, setFilterData] = useState<SentimentValidJson[]>([]);
  const apiUrl = process.env.REACT_APP_SENTIMENT_BY_COIN;
  const { data, error, loading } = useFetch(apiUrl || "");
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
            value={coin}
            required
            placeholder="Enter a coin"
            onChange={(e) => setCoin(e.target.value.toUpperCase())}
          />
        </form>
        <BrushChart data={filterData} />
      </TopicContainer>
    </>
  );
};

export default SentimentByCoin;
