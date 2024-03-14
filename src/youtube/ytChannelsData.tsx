import { toast } from "react-toastify";
import {
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
import { ChangeEvent, useEffect, useState } from "react";
import HighChartData from "../chart/newBrushChart";

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

  const highChartSeriesYtChannelsDataFormat: Highcharts.SeriesLineOptions[] = [
    {
      type: "line",
      name: "Views",
      data: channelsChartData.map((d) => ({
        x: d.date,
        y: typeof d.data === "string" ? parseInt(d.data) : d.data,
        tooltipContent: d.tooltipContent,
      })),
      tooltip: {
        pointFormatter: function (this: any) {
          return this.tooltipContent;
        },
      },
    },
  ];

  if (error) {
    console.error("Error fetching youtube channels data: ", error);
    toast.error(error);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center w-3/4 space-y-4">
      <h3 className="font-extrabold text-xl md:text-lg">
        Total Channel Views Per Day
      </h3>
      <select
        className="bg-gray-400 overflow-hidden max-w-20 md:max-w-44 border-none py-1 lg:py-3 text-xs md:text-base lg:p-3 box-border font-semibold text-gray-800 rounded-md"
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
      <HighChartData
        seriesData={highChartSeriesYtChannelsDataFormat}
        title={{ title: "", subtitle: "" }}
      />
    </div>
  );
};

export default YoutubeChannelsData;
