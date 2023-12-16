import { useEffect, useState } from "react";
import {
  AggregateSentimentByCoinData,
  ArrayTweetResult,
  BrushChartData,
  Fetchparams,
  Result,
  SentimentByUserProps,
  SentimentValidJson,
  TweetByDay,
  TweetsData,
  TwitterFollower,
  UserSentimentGroup,
} from "./interface";

const useFetch = (apiUrl: string, params?: Fetchparams) => {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetData = async () => {
      if (!apiUrl) return;
      setLoading(true);
      const url = new URL(apiUrl);
      if (params) {
        Object.keys(params).forEach((key) => {
          if (params[key]) {
            url.searchParams.append(key, params[key]);
          }
        });
      }
      try {
        const response = await fetch(url.toString());
        if (!response.ok) {
          console.error("error fetching");
          throw new Error(`${response.status}: ${response.statusText}`);
        }
        const jsonResponse = await response.json();
        setData(jsonResponse);
        setError(null);
        return { data, error };
      } catch (err) {
        setError((err as Error).message);
        console.error("error fetching: ", err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiUrl, params?.date, params?.username]);
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
    // console.log("array: ", tableData);
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

const duplicateCoins = (data: ArrayTweetResult[], ticker: string) => {
  try {
    const filterData = data.filter((coin) => {
      if (coin.coin === ticker) {
        return true;
      }
      return false;
    });
    return filterData;
  } catch (err) {
    console.error("Error extract duplicate coins");
  }
};

const sentimentFormatted = (tickerSentiment: string): string | null => {
  try {
    if (tickerSentiment === "{}") {
      return null;
    }
    const regex = /'(\w+)':\s*(-?\d+)/g;
    const matches = tickerSentiment.matchAll(regex);
    const formattedSentiment = Array.from(matches)
      .map((match) => `${match[1]}: ${match[2]}`)
      .join(", ");
    return formattedSentiment;
  } catch (err) {
    console.error("Error formatted sentiment: ", err);
    throw err;
  }
};

const modifyValidJson = (
  sentimentData: SentimentByUserProps[]
): SentimentValidJson[] => {
  try {
    const validJsonData = sentimentData.map((data) => {
      return {
        ...data,
        coin_sentiment: JSON.parse(data.coin_sentiment.replace(/'/g, '"')),
      };
    });
    return validJsonData;
  } catch (err) {
    console.error("Error turning string to valid json: ", err);
    throw err;
  }
};

const querySentimentCoin = (
  ticker: string,
  data: SentimentValidJson[]
): SentimentValidJson[] => {
  const newTicker =
    ticker === "CRYPTO"
      ? ticker.charAt(0).toUpperCase() + ticker.slice(1).toLowerCase()
      : ticker;
  try {
    const coinSentiment = data.filter((coin) => {
      if (newTicker in coin.coin_sentiment) {
        return true;
      }
      return false;
    });
    return coinSentiment;
  } catch (err) {
    console.error("Error querying sentiment coin: ", err);
    throw err;
  }
};

const extractUniqueUsers = (data: TwitterFollower[]): string[] => {
  try {
    const uniqueUsersSet = new Set<string>();
    data.forEach((user) => uniqueUsersSet.add(user.username));
    const uniqueUserArray = Array.from(uniqueUsersSet);
    return uniqueUserArray;
  } catch (err) {
    console.error("Error extracting unique users: ", err);
    throw err;
  }
};

const aggregateSentimentByCoinData = (
  data: SentimentValidJson[],
  coin: string
): BrushChartData[] => {
  const groupedByDate: AggregateSentimentByCoinData = {};

  //group data by date
  data.forEach((item) => {
    const dateString = new Date(item.date).toDateString();
    if (!groupedByDate[dateString]) {
      groupedByDate[dateString] = [];
    }
    groupedByDate[dateString].push(item);
  });

  return Object.keys(groupedByDate).map((dateString) => {
    const items = groupedByDate[dateString];
    let userSentiments: UserSentimentGroup = {};

    //group data by username
    items.forEach((item) => {
      const username = item.username;
      const sentiment = item.coin_sentiment[coin].toString();
      if (!userSentiments[username]) {
        userSentiments[username] = [];
      }
      userSentiments[username].push(sentiment);
    });

    const combinedUserSentiments = Object.keys(userSentiments).map(
      (username) => {
        return `${username}: ${userSentiments[username].join(", ")}`;
      }
    );

    const avgSentiment = (
      items.reduce((acc, cur) => {
        const sentimentValue = cur.coin_sentiment[coin];
        return acc + sentimentValue;
      }, 0) / items.length
    ).toFixed(2);

    const tooltipContent =
      `<strong>Sentiment: ${avgSentiment}</strong><br>` +
      combinedUserSentiments.join("<br>");
    console.log("asdasdasdasd: ", items);

    return {
      date: new Date(dateString),
      avgSentiment,
      tooltipContent,
    };
  });
};

export {
  useFetch,
  extractTwitterSentimentByDay,
  insertArrayData,
  formatDate,
  removeDuplicate,
  duplicateCoins,
  sentimentFormatted,
  modifyValidJson,
  querySentimentCoin,
  extractUniqueUsers,
  aggregateSentimentByCoinData,
};
