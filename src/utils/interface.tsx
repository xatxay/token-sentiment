import { Updater } from "@tanstack/react-table";

export interface TopCoinsDict {
  [key: string]: TopCoinsDictInfo;
}

interface TopCoinsDictInfo {
  avg_post_sentiment: number;
  avg_user_sentiment: number;
  mentions: number;
  unique_users: number;
}

export interface Fetchparams {
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
  tweets_data: Fetchparams;
}

interface CoinResult {
  coinData: TopCoinsDictInfo;
  tweet: TweetsData[];
}

export interface Result {
  [key: string]: CoinResult;
}

export interface DataTableProps extends Modal {
  data: any[];
  columns: any[];
}

export interface ArrayTweetResult {
  coin: string;
  mentions: string | number;
  uniqueUser: number;
  sentiments: string | number;
  twitterUser: string | number;
  twitterUrl: string;
}

export interface StartDate {
  startDate: Date;
  setStartDate: (date: Date) => void;
}

export interface Modal {
  isOpen?: boolean;
  openModal?: (coin: string) => void;
  closeModal?: () => void;
  coin?: string | null;
}

export interface CoinDataTableProps {
  data: ArrayTweetResult[];
  columns: any[];
  isOpen?: boolean;
  coin?: string | null;
  closeModal?: () => void;
  modal: boolean;
  startDate?: Date;
  setStartDate?: (date: Date) => void;
}

export interface Pagination {
  canPreviousPage: boolean;
  canNextPage: boolean;
  previousPage: () => void;
  nextPage: () => void;
  pageIndex: number;
  pageCount: number;
  setPageIndex: (updater: Updater<number>) => void;
}

export interface SentimentByUserProps {
  tweet_url: string;
  username: string;
  coin_sentiment: CoinSentiment | number;
  date: string;
}

interface CoinSentiment {
  [key: string]: number;
}
