import { toast } from "react-toastify";
import {
  chartContentFormatted,
  extractUniqueUsers,
  getTiktokConfigValue,
  handleTikTokMenuSelection,
  useFetch,
} from "../utils/utils";
import { ChangeEvent, useEffect, useState } from "react";
import {
  BrushChartData,
  ChartDataConfig,
  SelectTiktokData,
  TiktokStat,
} from "../utils/interface";
import HighChartData from "../chart/newBrushChart";

const TiktokStatistic = () => {
  const { data, error } = useFetch(
    String(process.env.REACT_APP_TIKTOK_PROFILES_DATA)
  );
  const defaultUser = "davincij15";
  const defaultMenu = "Views (Last 10 Vid)";
  const [selectedUser, setSelectedUser] = useState<string>(defaultUser);
  const [menu, setMenu] = useState<string>(defaultMenu);
  const menuOptions = [
    "New Followers",
    "New Likes",
    "Views (Last 10 Vid)",
    "Comments (Last 10 Vid)",
    "Shares (Last 10 Vid)",
    "Likes (Last 10 Vid)",
    "Sentiment (Last 10 Vid)",
  ];
  const [uniqueUser, setUniqueUser] = useState<string[]>([]);
  const [tiktokChartData, setTiktokChartData] = useState<BrushChartData[]>([]);

  const handleSelectUser = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.target.value);
  };

  const handleSelectMenu = (event: ChangeEvent<HTMLSelectElement>) => {
    setMenu(event.target.value);
  };

  useEffect(() => {
    if (data) {
      const parseData: TiktokStat[] = JSON.parse(data);
      const uniqueUserData = extractUniqueUsers(parseData, "username");
      setUniqueUser(uniqueUserData);
      const dataSelected: SelectTiktokData[] =
        handleTikTokMenuSelection(parseData, selectedUser, menu) || [];
      const tiktokStatConfig: ChartDataConfig<SelectTiktokData> = {
        getDataValue: (stat) => getTiktokConfigValue(stat),
        getTooltipContent: (stat) => {
          const value = getTiktokConfigValue(stat);
          return `<strong>${stat.username}: ${Number(value).toLocaleString(
            "en-US"
          )}</strong>`;
        },
        getDate: (stat) => stat.date,
      };
      const tiktokChartDataContent = chartContentFormatted(
        dataSelected,
        tiktokStatConfig
      );
      setTiktokChartData(tiktokChartDataContent);
    }
  }, [data, menu, selectedUser]);

  const highchartsTiktokData: Highcharts.SeriesLineOptions[] = [
    {
      type: "line",
      name: "Tiktok Data",
      data: tiktokChartData.map((d) => ({
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
    console.error("Error fetching tiktok stat: ", error);
    toast.error(error);
  }
  return (
    <div className="flex flex-col items-center justify-center w-3/4 space-y-4">
      <h3 className="font-extrabold text-xl md:text-2xl">
        Tiktok Statistics Chart
      </h3>
      <div className="flex flex-row items-center justify-center w-full space-x-4 lg:space-x-10">
        <select
          className="bg-gray-400 overflow-hidden max-w-20 md:max-w-44 border-none py-1 lg:py-3 text-xs md:text-base lg:p-3 box-border font-semibold text-gray-800 rounded-md"
          value={selectedUser}
          onChange={handleSelectUser}
        >
          {uniqueUser.map((user) => {
            return (
              <option
                className="text-black font-semibold"
                key={user}
                value={user}
              >
                {user}
              </option>
            );
          })}
        </select>
        <select
          className="bg-gray-400 overflow-hidden max-w-20 md:max-w-44 border-none py-1 lg:py-3 text-xs md:text-base lg:p-3 box-border font-semibold text-gray-800 rounded-md"
          value={menu}
          onChange={handleSelectMenu}
        >
          {menuOptions.map((menu) => {
            return (
              <option className="text-black font-semibold" key={menu}>
                {menu}
              </option>
            );
          })}
        </select>
      </div>
      <HighChartData
        seriesData={highchartsTiktokData}
        title={{ title: "", subtitle: "" }}
      />
    </div>
  );
};

export default TiktokStatistic;
