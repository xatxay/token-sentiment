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
import { TopicContainer } from "../twitter/twitterStyle";
import { DropDownMenu, DropDownOptions } from "../table/dropdownStyle";
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
    // console.log("selected channel: ", selectedChannel);
  };

  if (data) {
    const parseData: YoutubeChannelsDataType[] = JSON.parse(data);
    // console.log("yt channels data: ", parseData);
    uniqueChannel = extractUniqueUsers(parseData, "channel_name");
    // console.log("unique channels: ", uniqueChannel);
    const selectChannelData = calculateYtViewsByDay(parseData, selectedChannel);
    // console.log("selected channel data: ", selectChannelData);
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
    // console.log("chart yt data format: ", channelsChartData);
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
    <TopicContainer>
      <h3>Total Channel Views Per Day</h3>
      <DropDownMenu value={selectedChannel} onChange={handleSelectUser}>
        {uniqueChannel.map((channel) => {
          return (
            <DropDownOptions key={channel} value={channel}>
              {channel}
            </DropDownOptions>
          );
        })}
      </DropDownMenu>
      <BrushChart
        data={channelsChartData}
        min={min}
        max={max}
        isClickable={false}
      />
    </TopicContainer>
  );
};

export default YoutubeChannelsData;
