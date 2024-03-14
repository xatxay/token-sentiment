import { toast } from "react-toastify";
import { YoutubeStat } from "../utils/interface";
import { useFetch } from "../utils/utils";
import { useEffect, useState } from "react";
import HighChartData from "../chart/newBrushChart";

const YoutubeStats = () => {
  const { data, error, loading } = useFetch(
    String(process.env.REACT_APP_YOUTUBE_STAT)
  );
  const [youtubeData, setYoutubeData] = useState<YoutubeStat[]>([]);

  useEffect(() => {
    if (data) {
      const parseData: YoutubeStat[] = JSON.parse(data);
      console.log("parse data: ", parseData);
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
    <div className="flex flex-col items-center justify-center w-full space-y-4">
      <h3 className="font-extrabold text-xl md:text-2xl">
        YouTube Statistics Chart
      </h3>
      {/* <BrushChart
        data={youtubeStatChart}
        min={min}
        max={max}
        isClickable={false}
      /> */}
      <HighChartData data={youtubeData} />
    </div>
  );
};

export default YoutubeStats;
