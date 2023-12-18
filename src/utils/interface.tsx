import { Updater } from "@tanstack/react-table";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

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
  mentions: number;
  uniqueUser: number;
  sentiments: number;
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
  data: ArrayTweetResult[] | CoinByDateYTProps[];
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
  coin_sentiment: string;
  date: number;
}

export interface TwitterInfluencers {
  user_id: number;
  username: string;
}

export interface SentimentByInfluencer extends DataTableProps {
  twitterInfluencers: string[];
  username: string;
  handleSelectUser: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export interface BrushChartState {
  options: any;
  series: any[];
  optionsLine: any;
  seriesLine: any[];
}

export interface PieChartState {
  chartOptions: any;
  series: any[];
}

export interface SentimentValidJson {
  tweet_url: string;
  username: string;
  coin_sentiment: CoinSentiment;
  date: number;
}

interface CoinSentiment {
  [key: string]: number;
}

export interface BrushChartProps extends SentimentByCoinProps {
  data: any[];
  min: number;
  max: number;
  isClickable: boolean;
}

export interface AggregateSentimentByCoinData {
  [key: string]: SentimentValidJson[];
}

export interface SentimentByCoinProps {
  openModal?: () => void;
  closeModal?: () => void;
  isOpen?: boolean;
}

export interface TwitterFollower {
  date: string;
  user_id: string;
  username: string;
  num_followers: string;
}

export interface UserSentimentGroup {
  [key: string]: string[];
}

export interface BrushChartData {
  date: Date | string;
  data: number | string;
  tooltipContent: string;
}

export interface GroupData {
  [key: string]: TwitterFollower[];
}

export interface MinMax {
  min: number;
  max: number;
}

export interface UserChanges {
  [date: string]: number;
}

export interface FollowersChanges extends FilterData {
  username: string;
}

export interface YoutubeViewsChange extends FilterData {
  channelName: string;
}

export interface FilterData {
  date: string;
  data: number;
}

export interface PieChartData {
  series: number[];
  labels: string[];
}

export interface TypewriterProps {
  text: string;
  speed?: number;
  loopDelay?: number;
}

export interface CoinByDateYTProps {
  coin: string;
  date: string;
  num_videos: string;
  sentiment: string;
  total_views: string;
  title: string;
  views: string;
  id: string;
}

export interface CoinByDayDataYt {
  openCoinByDateModalYt: (coin: string) => void;
  closeCoinByDateModalYt: () => void;
  isOpenYtModal: boolean;
  selectedCoinYt: string;
  ytSelectedDate: Date;
  setYtSelectedData: Dispatch<SetStateAction<Date>>;
  videoFetchData: string;
}

export interface YoutubeStat {
  common_words: string;
  date: number;
  total_views: number;
}

export interface YoutubeChannelsDataType {
  date: string;
  channel_id: string;
  channel_name: string;
  subscriber_count: string;
  total_views: string;
}

export interface ChartDataConfig<T> {
  getDataValue: (item: T) => number | string;
  getTooltipContent: (item: T) => string;
  getDate: (item: T) => Date | number | string;
}
