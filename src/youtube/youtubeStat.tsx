import { toast } from "react-toastify";
import BrushChart from "../chart/brushChart";
import { TopicContainer } from "../twitter/twitterStyle";
import {
  BrushChartData,
  ChartDataConfig,
  YoutubeStat,
} from "../utils/interface";
import {
  calculateMinMax,
  chartContentFormatted,
  extractYtKeyword,
  useFetch,
} from "../utils/utils";

const YoutubeStats = () => {
  const { data, error } = useFetch(String(process.env.REACT_APP_YOUTUBE_STAT));

  let youtubeStatChart: BrushChartData[] = [];
  if (data) {
    const parseData: YoutubeStat[] = JSON.parse(data);
    // console.log("youtube stats: ", parseData);
    const youtubeConfig: ChartDataConfig<YoutubeStat> = {
      getDataValue: (start) => start.total_views,
      getTooltipContent: (stat) => {
        const keyword = extractYtKeyword(stat.common_words);
        return `<strong>Total Views: ${stat.total_views.toLocaleString(
          "en-US"
        )}</strong><br><strong>Top Keywords: ${keyword}`;
      },
      getDate: (stat) => stat.date,
    };
    youtubeStatChart = chartContentFormatted(parseData, youtubeConfig);
    // console.log("brush yt data: ", youtubeStatChart);
  }

  if (error) {
    console.error("Error fetching yt stat: ", error);
    toast.error(error);
  }

  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  const { min, max } = calculateMinMax(youtubeStatChart, "data");
  return (
    <TopicContainer>
      <h3>Youtube Statistics</h3>
      <BrushChart
        data={youtubeStatChart}
        min={min}
        max={max}
        isClickable={false}
      />
    </TopicContainer>
  );
};

export default YoutubeStats;
