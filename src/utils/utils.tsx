import { useEffect, useState } from "react";
import { ArrayTweetResult, Result, TweetByDay, TweetsData } from "./interface";

const useFetch = (apiUrl: string, date: string) => {
  const [data, setData] = useState<TweetByDay | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  console.log(apiUrl, date);

  useEffect(() => {
    const fetData = async () => {
      if (!apiUrl) return;
      setLoading(true);
      const url = new URL(apiUrl);
      url.searchParams.append("date", date);
      try {
        const response = await fetch(url.toString());
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }
        const jsonResponse = await response.json();
        setData(jsonResponse);
        setError(null);
        return { data, error };
      } catch (err) {
        setError((err as Error).message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiUrl, date]);
  return { data, error, loading };
};

const extractTwitterSentimentByDay = (data: TweetByDay): Result => {
  try {
    const result: Result = {};
    for (const coin of Object.keys(data.top_coins_dict)) {
      const coinData = data.top_coins_dict[coin];
      const tweetData = data.tweets_data;
      if (tweetData) {
        const parseTweetData: TweetsData[] = JSON.parse(tweetData[coin]);
        result[coin] = {
          coinData: coinData,
          tweet: parseTweetData,
        };
      }
    }
    return result;
  } catch (err) {
    console.error("Error extracting twitter sentiment by day: ", err);
    throw err;
  }
};

const insertArrayData = (data: Result): ArrayTweetResult[] => {
  try {
    let tableData: ArrayTweetResult[] = [];
    Object.entries(data).forEach(([coin, { coinData, tweet }]) => {
      tweet.forEach((t: TweetsData) => {
        tableData.push({
          coin: coin,
          mentions: coinData.mentions,
          uniqueUser: coinData.unique_users,
          sentiments: t.coin_sentiment[coin],
          twitterUser: t.username,
          twitterUrl: t.tweet_url,
        });
      });
    });
    console.log("array: ", tableData);
    return tableData;
  } catch (err) {
    console.log("Error inserting data to array: ", err);
    throw err;
  }
};

const formatDate = (date: Date): string => {
  try {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const newDate = date.getDate();
    const dateFormat = `${year}-${month}-${newDate}`;
    return dateFormat;
  } catch (err) {
    console.log("Error formating date: ", err);
    throw err;
  }
};

const removeDuplicate = (data: ArrayTweetResult[]) => {
  try {
    let coinSet = new Set();
    const filterData = data.filter((coin) => {
      if (!coinSet.has(coin.coin)) {
        coinSet.add(coin.coin);
        return true;
      }
      return false;
    });
    return filterData;
  } catch (err) {
    console.log("Error removing duplicate: ", err);
  }
};

export {
  useFetch,
  extractTwitterSentimentByDay,
  insertArrayData,
  formatDate,
  removeDuplicate,
};
