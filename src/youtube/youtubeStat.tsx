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
import { useEffect, useState } from "react";

const YoutubeStats = () => {
  const { data, error } = useFetch(String(process.env.REACT_APP_YOUTUBE_STAT));
  const [youtubeStatChart, setYoutubeStatChart] = useState<BrushChartData[]>(
    []
  );

  useEffect(() => {
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
      setYoutubeStatChart(chartContentFormatted(parseData, youtubeConfig));
    }
  }, [data]);

  if (error) {
    console.error("Error fetching yt stat: ", error);
    toast.error(error);
  }
  const { min, max } = calculateMinMax(youtubeStatChart, "data");
  useEffect(() => {
    console.log("min: ", min);
    console.log("max: ", max);
    console.log("youtube stat chart: ", youtubeStatChart);
  }, [max, min, youtubeStatChart]);
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
