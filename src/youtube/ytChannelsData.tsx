import { toast } from "react-toastify";
import {
  calculateMinMax,
  calculateYtViewsByDay,
  chartContentFormatted,
  extractUniqueUsers,
  useFetch,
} from "../utils/utils";
import {
  BrushChartData,
  ChartDataConfig,
  YoutubeChannelsDataType,
  YoutubeViewsChange,
} from "../utils/interface";
import BrushChart from "../chart/brushChart";
import { ChangeEvent, useEffect, useState } from "react";

const YoutubeChannelsData = () => {
  const apiUrl = String(process.env.REACT_APP_YOUTUBE_CHANNELS_DATA);
  const { data, error, loading } = useFetch(apiUrl);
  const defaultChannel = "CryptosRUs";
  const [selectedChannel, setSelectedChannel] =
    useState<string>(defaultChannel);
  const [uniqueChannel, setUniqueChannel] = useState<string[]>([]);
  const [channelsChartData, setChannelsChartData] = useState<BrushChartData[]>(
    []
  );

  const handleSelectUser = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedChannel(event.target.value);
  };

  useEffect(() => {
    if (data) {
      const parseData: YoutubeChannelsDataType[] = JSON.parse(data);
      const channels = extractUniqueUsers(parseData, "channel_name");
      setUniqueChannel(channels);
      const selectChannelData = calculateYtViewsByDay(
        parseData,
        selectedChannel
      );
      const ytChannelsDataConfig: ChartDataConfig<YoutubeViewsChange> = {
        getDataValue: (stat) => stat.data,
        getTooltipContent: (stat) =>
          `<strong>${stat.channelName}: ${stat.data}</strong>`,
        getDate: (stat) => stat.date,
      };
      const chartData = chartContentFormatted(
        selectChannelData || [],
        ytChannelsDataConfig
      );
      setChannelsChartData(chartData);
    }
  }, [data, selectedChannel]);

  useEffect(() => {
    console.log("channel chart data: ", channelsChartData);
  }, [channelsChartData]);

  if (error) {
    console.error("Error fetching youtube channels data: ", error);
    toast.error(error);
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  const { min, max } = calculateMinMax(channelsChartData, "data");
  return (
    <div className="flex flex-col items-center justify-center w-full space-y-4">
      <h3 className="font-extrabold text-xl md:text-2xl">
        Total Channel Views Per Day
      </h3>
      <select
        className="bg-gray-400 overflow-hidden max-w-20 md:max-w-44 border-none py-1 lg:py-3 text-xs md:text-base lg:p-3 box-border font-semibold text-gray-800"
        value={selectedChannel}
        onChange={handleSelectUser}
      >
        {uniqueChannel.map((channel) => {
          return (
            <option
              className="text-black font-semibold"
              key={channel}
              value={channel}
            >
              {channel}
            </option>
          );
        })}
      </select>
      <BrushChart
        data={channelsChartData}
        min={min}
        max={max}
        isClickable={false}
      />
    </div>
  );
};

export default YoutubeChannelsData;
