import { useEffect, useState } from "react";
import {
  AggregateSentimentByCoinData,
  ArrayTweetResult,
  BrushChartData,
  Fetchparams,
  FollowersChanges,
  GroupData,
  MinMax,
  PieChartData,
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

const fetchQuery = async (url: string, username: string): Promise<any> => {
  const apiUrl = new URL(url);
  apiUrl.searchParams.append("username", username);
  try {
    const response = await fetch(apiUrl.toString());
    if (!response.ok) {
      throw new Error("Network respsonse error");
    }
    const responseJson = await response.json();
    return responseJson;
  } catch (err) {
    console.error("Failed fetching data: ", err);
    throw err;
  }
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
    console.log("passing data: ", data);
    console.log("passing ticker: ", ticker);
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
    // console.log("loop: ", item.date);
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
    // console.log("coinsentimentdata: ", items);
    // console.log("date: ", dateString, new Date(dateString));

    return {
      date: new Date(dateString),
      data: avgSentiment,
      tooltipContent,
    };
  });
};

const groupedDataByDate = (data: TwitterFollower[]): GroupData => {
  try {
    const groupedByDate: GroupData = {};
    // if (!data || data.length === 0) return null;
    data.forEach((item) => {
      if (!groupedByDate[item.date]) {
        groupedByDate[item.date] = [];
      }
      groupedByDate[item.date].push(item);
    });
    console.log("groupdatabydate: ", groupedByDate);
    return groupedByDate;
  } catch (err) {
    console.error("Failed grouping data by date: ", err);
    throw err;
  }
};

const twitterFollowersBrushData = (
  data: TwitterFollower[],
  username: string
): FollowersChanges[] => {
  try {
    const userData = data.filter((d) => d.username === username);
    const followersChanges: FollowersChanges[] = [];

    for (let i = 1; i < userData.length; i++) {
      const prev = userData[i - 1];
      const current = userData[i];
      const change =
        parseInt(current.num_followers) - parseInt(prev.num_followers);
      followersChanges.push({ username, date: current.date, data: change });
    }
    return followersChanges;
  } catch (err) {
    console.error("Error formatting twitter followers brush data: ", err);
    throw err;
  }
};

const calculateMinMax = (dataArray: { data: string | number }[]): MinMax => {
  try {
    const numberValue = dataArray.map((item) => Number(item.data));
    const min = Math.min(...numberValue);
    const max = Math.max(...numberValue);
    console.log("min and max: ", min, max);
    return { min, max };
  } catch (err) {
    console.error("Failed calculating mix and max: ", err);
    throw err;
  }
};

const chartContentFormatted = (data: FollowersChanges[]): BrushChartData[] => {
  try {
    const chartFormatted = data.map((data) => {
      const tooltipContent = `<strong>${data.username}: ${data.data}</strong>`;
      return {
        date: new Date(data.date),
        data: data.data,
        tooltipContent: tooltipContent,
      };
    });
    return chartFormatted;
  } catch (err) {
    console.log("Error formatting chart data: ", err);
    throw err;
  }
};

const formatCoinSentimentByDayPieChart = (
  data: ArrayTweetResult[]
): PieChartData => {
  const labels = data.map((coin) => coin.coin);
  const series = data.map((mention) => mention.mentions);
  const pieChartData = { series, labels };
  console.log("hjkhkk: ", pieChartData);
  return pieChartData;
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
  groupedDataByDate,
  twitterFollowersBrushData,
  calculateMinMax,
  chartContentFormatted,
  formatCoinSentimentByDayPieChart,
  fetchQuery,
};
