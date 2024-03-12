import { toast } from "react-toastify";
import BrushChart from "../chart/brushChart";
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
    <div className="flex flex-col items-center justify-center w-full space-y-4">
      <h3 className="font-extrabold text-xl md:text-2xl">
        YouTube Statistics Chart
      </h3>
      <BrushChart
        data={youtubeStatChart}
        min={min}
        max={max}
        isClickable={false}
      />
    </div>
  );
};

export default YoutubeStats;
