export interface TopCoinsDict {
  [key: string]: TopCoinsDictInfo;
}

interface TopCoinsDictInfo {
  avg_post_sentiment: number;
  avg_user_sentiment: number;
  mentions: number;
  unique_users: number;
}

export interface TweetsDataString {
  [key: string]: string;
}

export interface TweetsData {
  tweet_url: string;
  username: string;
  coin_sentiment: { [key: string]: number };
  date: number;
}

export interface TweetByDay {
  top_coins_dict: TopCoinsDict;
  tweets_data: TweetsDataString;
}

interface CoinResult {
  coinData: TopCoinsDictInfo;
  tweet: TweetsData[];
}

export interface Result {
  [key: string]: CoinResult;
}

export type DataTableProps = {
  data: any[];
  columns: any[];
};

export interface ArrayTweetResult {
  coin: string;
  mentions: string | number;
  uniqueUser: string | number;
  sentiments: string | number;
  twitterUser: string | number;
  twitterUrl: string;
}

export interface StartDate {
  startDate: Date;
  setStartDate: (date: Date) => void;
}
