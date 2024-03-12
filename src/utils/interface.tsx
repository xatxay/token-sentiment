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
  data:
    | ArrayTweetResult[]
    | CoinByDateYTProps[]
    | RedditCoinByDay[]
    | PollExtract[];
  columns: any[];
  isOpen?: boolean;
  coin?: string | null;
  closeModal?: () => void;
  modal: boolean;
  startDate?: Date;
  setStartDate?: (date: Date) => void;
  poll?: boolean;
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

export interface TiktokStat {
  comments_last_10: string;
  date: string;
  likes_last_10: string;
  sentiment_last_10: string;
  shares_last_10: string;
  total_followers: string;
  total_likes: string;
  username: string;
  views_last_10: string;
}

export interface SelectTiktokData {
  [x: string]: string;
  date: string;
  username: string;
}

export interface TikTokVideo {
  created_time: string;
  sentiment_dict: string;
  username: string;
  video_id: string;
}

export interface RedditData {
  date: string;
  top_words: string;
  top_coins: string;
}

export interface RedditCoinByDay {
  coin: string;
  occurences: number;
}

export interface RedditChartData {
  date: string;
  num_comments: string;
  num_posts: string;
  subreddit: string;
  subscribers: string;
  total_upvotes_top_10: string;
  users_online: string;
}

export interface QueryRedditChartData {
  date: string;
  data: string | null | number;
  tooltipContent: string;
}

interface PollBase {
  timestamp: string;
  tweet_url: string;
  tweet_text: string;
  result: string;
  category: string;
}

export interface PollData extends PollBase {
  poll_dict: string;
}

export interface PollExtract extends PollBase {
  poll_dict: number[];
}

export interface PollChart {
  poll_dict: string[];
}

export interface PollBarProps {
  values: number[];
  colors: string[];
}

export interface AuthenticatedRouteProps {
  isAuthenticated: boolean;
  children: JSX.Element;
}

export interface HomePageProps {
  twitterName: string;
  twitterPfp: string;
}

export interface LoginProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setTwitterName: React.Dispatch<React.SetStateAction<string>>;
  setTwitterPfp: React.Dispatch<React.SetStateAction<string>>;
}
