import BrushChart from "../chart/brushChart";
import { TopicContainer } from "../twitter/twitterStyle";
import { BrushChartData, YoutubeStat } from "../utils/interface";
import { calculateMinMax, formatYoutubeStats, useFetch } from "../utils/utils";

const YoutubeStats = () => {
  const { data, error, loading } = useFetch(
    String(process.env.REACT_APP_YOUTUBE_STAT)
  );

  let youtubeStatChart: BrushChartData[] = [];
  if (data) {
    const parseData: YoutubeStat[] = JSON.parse(data);
    console.log("youtube stats: ", parseData);
    youtubeStatChart = formatYoutubeStats(parseData);
    console.log("brush yt data: ", youtubeStatChart);
  }
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
