import { useEffect, useState } from "react";
import {
  AggregateSentimentByCoinData,
  ArrayTweetResult,
  BrushChartData,
  ChartDataConfig,
  CoinByDateYTProps,
  Fetchparams,
  FollowersChanges,
  GroupData,
  MinMax,
  PieChartData,
  PollData,
  PollExtract,
  QueryRedditChartData,
  RedditChartData,
  RedditCoinByDay,
  RedditData,
  Result,
  SelectTiktokData,
  SentimentByUserProps,
  SentimentValidJson,
  TiktokStat,
  TweetByDay,
  TweetsData,
  TwitterFollower,
  UserSentimentGroup,
  YoutubeChannelsDataType,
  YoutubeStat,
  YoutubeViewsChange,
} from "./interface";

const useFetch = (apiUrl: string, params?: Fetchparams) => {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

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
        const response = await fetch(url.toString(), { signal });
        if (!response.ok) {
          console.error("error fetching");
          throw new Error(`${response.status}: ${response.statusText}`);
        }
        const jsonResponse = await response.json();
        setData(jsonResponse);
        setError(null);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          setError((err as Error).message);
          console.error("error fetching: ", err);
          setData(null);
        }
      } finally {
        setLoading(false);
      }
    };
    fetData();

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiUrl, params?.date, params?.username]);
  return { data, error, loading };
};

const fetchQuery = async (url: string, params: Fetchparams): Promise<any> => {
  const apiUrl = new URL(url);
  Object.keys(params).forEach((key) => {
    if (params[key]) {
      apiUrl.searchParams.append(key, params[key]);
    }
  });
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

const extractTwitterSentimentByDay = (data: TweetByDay): Result | null => {
  try {
    if (
      !data ||
      !data.top_coins_dict ||
      typeof data.top_coins_dict !== "object" ||
      !data.tweets_data
    )
      return null;

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
          avgUserSentiments: coinData.avg_user_sentiment,
          avgPostSentiments: coinData.avg_post_sentiment,
          twitterUser: t.username,
          twitterUrl: t.tweet_url,
          coinSentiment: t.coin_sentiment[coin],
          allCoinsSentiment: t.coin_sentiment,
        });
      });
    });
    return tableData;
  } catch (err) {
    console.error("Error inserting data to array: ", err);
    throw err;
  }
};

const formatDate = (date: Date): string => {
  try {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const newDate = date.getDate().toString().padStart(2, "0");
    const dateFormat = `${year}-${month}-${newDate}`;
    return dateFormat;
  } catch (err) {
    console.error("Error formating date: ", err);
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
    console.error("Error removing duplicate: ", err);
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
    console.log("array data: ", data);
    console.log("filter data: ", filterData);
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

const extractUniqueUsers = <T extends object, K extends keyof T>(
  data: T[],
  propertyName: K
): T[K][] => {
  try {
    const uniqueUsersSet = new Set<T[K]>();
    data.forEach((user) => uniqueUsersSet.add(user[propertyName]));
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
  // console.log("data: ", data);
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
    // console.log("items: ", items);

    //group data by username
    items.forEach((item) => {
      const username = item.username;
      const sentiment = item.coin_sentiment[coin]?.toString();
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
    data.forEach((item) => {
      if (!groupedByDate[item.date]) {
        groupedByDate[item.date] = [];
      }
      groupedByDate[item.date].push(item);
    });
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

const calculateMinMax = <T extends object, K extends keyof T>(
  dataArray: T[],
  propertyName: K
): MinMax => {
  try {
    const numberValue = dataArray.map((item) => Number(item[propertyName]));
    const min = Math.min(...numberValue);
    const max = Math.max(...numberValue);
    return { min, max };
  } catch (err) {
    console.error("Failed calculating mix and max: ", err);
    throw err;
  }
};

const chartContentFormatted = <T,>(
  data: T[],
  config: ChartDataConfig<T>
): BrushChartData[] => {
  try {
    return data.map((item) => ({
      date: new Date(config.getDate(item)),
      data: config.getDataValue(item),
      tooltipContent: config.getTooltipContent(item),
    }));
  } catch (err) {
    console.error("Error formatting chart data: ", err);
    throw err;
  }
};

const formatCoinSentimentByDayPieChart = (
  data: ArrayTweetResult[]
): PieChartData => {
  const labels = data.map((coin) => coin.coin);
  const series = data.map((mention) => mention.mentions);
  const pieChartData = { series, labels };
  return pieChartData;
};

const formatYoutubeStats = (data: YoutubeStat[]): BrushChartData[] => {
  try {
    const chartFormatted = data.map((stat) => {
      const keyword = extractYtKeyword(stat.common_words);
      const tooltipContent = `<strong>Total Views: ${stat.total_views.toLocaleString(
        "en-US"
      )}</strong><br><strong>Top KeyWords: ${keyword}`;
      return {
        date: new Date(stat.date),
        data: stat.total_views,
        tooltipContent,
      };
    });
    return chartFormatted;
  } catch (err) {
    console.error("Failed formating youtube stats: ", err);
    throw err;
  }
};

const formatYAxisValue = (value: number): string => {
  try {
    if (value >= 1e6) {
      return (value / 1e6).toFixed(2) + "M";
    } else if (value >= 1e3) {
      return (value / 1e3).toFixed(2) + "K";
    } else {
      return value.toFixed(0);
    }
  } catch (err) {
    console.error("Error formattting value: ", err);
    throw err;
  }
};

const extractYtKeyword = (data: string): string => {
  try {
    const validJson = data.replace(/'/g, '"');
    const jsonArray: { [key: string]: number }[] = JSON.parse(validJson);
    const result = jsonArray.map((obj) => Object.keys(obj)[0]).join(", ");
    return result;
  } catch (err) {
    console.error("Failed extracting keyword: ", err);
    throw err;
  }
};

const calculateYtViewsByDay = (
  data: YoutubeChannelsDataType[],
  channelName: string
): YoutubeViewsChange[] => {
  try {
    const userChannel = data.filter(
      (channel) =>
        channel.channel_name === channelName &&
        Number(channel.total_views) !== 0
    );
    const viewsChange: YoutubeViewsChange[] = [];

    for (let i = 1; i < userChannel.length; i++) {
      const prev = userChannel[i - 1];
      const current = userChannel[i];
      const change = parseInt(current.total_views) - parseInt(prev.total_views);
      viewsChange.push({ channelName, data: change, date: current.date });
    }
    return viewsChange;
  } catch (err) {
    console.error("Error calculating yt views by day: ", err);
    throw err;
  }
};

const extractTiktokMenu = (data: TiktokStat[]): string[] => {
  try {
    if (data.length > 0) {
      return Object.keys(data[0]);
    }
    return [];
  } catch (err) {
    console.error("Error extracting tiktok menu: ", err);
    throw err;
  }
};

const menuOptionsKeyMapping = (menu: string): keyof TiktokStat | undefined => {
  const menuKeyMapping: { [key: string]: keyof TiktokStat } = {
    "New Followers": "total_followers",
    "New Likes": "total_likes",
    "Views (Last 10 Vid)": "views_last_10",
    "Comments (Last 10 Vid)": "comments_last_10",
    "Shares (Last 10 Vid)": "shares_last_10",
    "Likes (Last 10 Vid)": "likes_last_10",
    "Sentiment (Last 10 Vid)": "sentiment_last_10",
  };
  return menuKeyMapping[menu];
};

const menuOptionReddit = (menu: string): keyof RedditChartData => {
  const menuReddit: { [key: string]: keyof RedditChartData } = {
    "New Subscribers": "subscribers",
    "Total Top 10 Upvotes": "total_upvotes_top_10",
    "Users Online": "users_online",
    "New Posts": "num_posts",
    "New Comments": "num_comments",
  };
  return menuReddit[menu];
};

const handleTikTokMenuSelection = (
  data: TiktokStat[],
  username: string,
  menu: string
): SelectTiktokData[] => {
  try {
    const menuSelected = menuOptionsKeyMapping(menu);
    if (!menuSelected) {
      throw new Error("Invalid menu option selected");
    }
    const userData = data.filter((user) => user.username === username);
    if (userData.length === 0) {
      throw new Error("User not found");
    }
    const menuData = userData.map((data) => ({
      date: data.date,
      username: data.username,
      [menuSelected]: data[menuSelected],
    }));
    return menuData;
  } catch (err) {
    console.error("Failed handling tiktok menu selection: ", err);
    throw err;
  }
};

const getTiktokConfigValue = (stat: SelectTiktokData): string => {
  try {
    const keys = Object.keys(stat);
    const keysValue = keys.find((key) => key !== "date" && key !== "username");
    return keysValue ? stat[keysValue] : "";
  } catch (err) {
    console.error("Error getting tiktok config value: ", err);
    throw err;
  }
};

const queryRedditData = (
  selectedDate: string,
  data: RedditData[]
): string | undefined => {
  try {
    const selectedData = data.find((info) => info.date === selectedDate);
    const topCoin = selectedData ? selectedData.top_coins : undefined;
    return topCoin;
  } catch (err) {
    console.error("Failed query reddit data: ", err);
    throw err;
  }
};

const formatRedditData = (data: string): RedditCoinByDay[] => {
  try {
    const newData = data.replace(/'/g, '"');
    const parseData = JSON.parse(newData);
    const arrayData = Object.entries(parseData).map(([key, value]) => ({
      coin: key,
      occurences: value as number,
    }));
    return arrayData;
  } catch (err) {
    console.error("Failed format reddit data");
    throw err;
  }
};

const querySelectedRedditMenuData = (
  data: RedditChartData[],
  menu: string
): QueryRedditChartData[] => {
  try {
    const menuSelected = menuOptionReddit(menu);
    if (!menuSelected) {
      throw new Error("No menu selection");
    }
    const menuData = data.map((reddit, index, array) => {
      let subscibeChange: number | null = null;
      if (index !== 0) {
        const prev = array[index - 1];
        subscibeChange =
          parseInt(reddit.subscribers) - parseInt(prev.subscribers);
      }

      return {
        date: reddit.date,
        data:
          menuSelected === "subscribers"
            ? subscibeChange
            : reddit[menuSelected],
        tooltipContent: `<strong>${menu}: ${
          menuSelected === "subscribers" ? subscibeChange : reddit[menuSelected]
        }</strong>`,
      };
    });
    return menuData;
  } catch (err) {
    console.error("Error querying reddit chart data: ", err);
    throw err;
  }
};

const extractPollData = (data: PollData[]): PollExtract[] => {
  try {
    const pollData = data.map((data) => {
      const pollDict: number[] = Object.values(
        JSON.parse(data.poll_dict.replace(/'/g, '"'))
      );
      return {
        ...data,
        poll_dict: pollDict,
      };
    });
    return pollData;
  } catch (err) {
    console.error("Error extracting poll data: ", err);
    throw err;
  }
};

export const findClosestDate = (
  currentDate: Date,
  direction: "next" | "prev",
  allDate: Date[]
): Date => {
  const sortedDates = allDate.sort((a, b) => a.getTime() - b.getTime());
  if (direction === "next" && sortedDates !== undefined) {
    return sortedDates.find((date) => date > currentDate) || currentDate;
  } else {
    return (
      [...sortedDates].reverse().find((date) => date < currentDate) ||
      currentDate
    );
  }
};

export const formatYoutubeDataPieChart = (
  data: CoinByDateYTProps[]
): PieChartData => {
  const labels = data.map((coin) => coin.coin);
  const series = data.map((mention) => Number(mention.num_videos));
  const pieChartData = { series, labels };
  return pieChartData;
};

export const getAllAvailableDate = (dates: string[]): Date[] => {
  const localTimezoneDates = Array.from(new Set(dates)).map((dateStr) => {
    const parts = dateStr.split("-").map((part) => parseInt(part, 10));
    const year = parts[0];
    const month = parts[1] - 1;
    const day = parts[2];
    return new Date(year, month, day);
  });
  return localTimezoneDates;
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
  formatYoutubeStats,
  formatYAxisValue,
  extractYtKeyword,
  calculateYtViewsByDay,
  extractTiktokMenu,
  handleTikTokMenuSelection,
  getTiktokConfigValue,
  queryRedditData,
  formatRedditData,
  menuOptionReddit,
  querySelectedRedditMenuData,
  extractPollData,
};
