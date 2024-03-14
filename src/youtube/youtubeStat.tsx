import { toast } from "react-toastify";
import { YoutubeStat } from "../utils/interface";
import { extractYtKeyword, useFetch } from "../utils/utils";
import { useEffect, useState } from "react";
import HighChartData from "../chart/newBrushChart";

const YoutubeStats = () => {
  const { data, error, loading } = useFetch(
    String(process.env.REACT_APP_YOUTUBE_STAT)
  );
  const [youtubeData, setYoutubeData] = useState<YoutubeStat[]>([]);

  const formattedSeriesData: Highcharts.SeriesLineOptions[] = [
    {
      type: "line",
      name: "Views",
      data: youtubeData.map((d) => ({
        x: d.date,
        y: d.total_views,
        common_words: d.common_words,
      })),
      tooltip: {
        pointFormatter: function (this: any): string {
          const keyword = extractYtKeyword(this.common_words as string);
          return `<strong>Views: ${
            this.y && this.y.toLocaleString("en-US")
          }</strong><br><strong>Top Keywords: ${keyword}</strong>`;
        },
      },
    },
  ];

  useEffect(() => {
    if (data) {
      const parseData: YoutubeStat[] = JSON.parse(data);
      setYoutubeData(parseData);
    }
  }, [data]);

  if (error) {
    console.error("Error fetching yt stat: ", error);
    toast.error(error);
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col items-center justify-center w-3/4 space-y-4">
      <HighChartData
        seriesData={formattedSeriesData}
        title={{
          title: "YOUTUBE STATISTIC",
          subtitle: "(HOVER FOR TOP KEYWORDS)",
        }}
      />
    </div>
  );
};

export default YoutubeStats;
