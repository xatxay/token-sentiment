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
import { ChangeEvent, useState } from "react";

const YoutubeChannelsData = () => {
  const apiUrl = String(process.env.REACT_APP_YOUTUBE_CHANNELS_DATA);
  const { data, error, loading } = useFetch(apiUrl);
  const defaultChannel = "CryptosRUs";
  const [selectedChannel, setSelectedChannel] =
    useState<string>(defaultChannel);
  let uniqueChannel: string[] = [];
  let channelsChartData: BrushChartData[] = [];

  const handleSelectUser = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedChannel(event.target.value);
  };

  if (data) {
    const parseData: YoutubeChannelsDataType[] = JSON.parse(data);
    uniqueChannel = extractUniqueUsers(parseData, "channel_name");
    const selectChannelData = calculateYtViewsByDay(parseData, selectedChannel);
    const ytChannelsDataConfig: ChartDataConfig<YoutubeViewsChange> = {
      getDataValue: (stat) => stat.data,
      getTooltipContent: (stat) =>
        `<strong>${stat.channelName}: ${stat.data}</strong>`,
      getDate: (stat) => stat.date,
    };
    channelsChartData = chartContentFormatted(
      selectChannelData || [],
      ytChannelsDataConfig
    );
  }

  if (error) {
    console.error("Error fetching youtube channels data: ", error);
    toast.error(error);
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  const { min, max } = calculateMinMax(channelsChartData, "data");
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h3>Total Channel Views Per Day</h3>
      <select
        className="bg-gray-400 border-none p-3 box-border font-semibold text-gray-800"
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
