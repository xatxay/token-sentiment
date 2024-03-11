import { toast } from "react-toastify";
import {
  calculateMinMax,
  chartContentFormatted,
  extractUniqueUsers,
  getTiktokConfigValue,
  handleTikTokMenuSelection,
  useFetch,
} from "../utils/utils";
import { ChangeEvent, useState } from "react";
import {
  BrushChartData,
  ChartDataConfig,
  SelectTiktokData,
  TiktokStat,
} from "../utils/interface";
import BrushChart from "../chart/brushChart";

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
  let uniqueUser: string[] = [];
  let tiktokChartData: BrushChartData[] = [];

  const handleSelectUser = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.target.value);
  };

  const handleSelectMenu = (event: ChangeEvent<HTMLSelectElement>) => {
    setMenu(event.target.value);
  };

  if (data) {
    const parseData: TiktokStat[] = JSON.parse(data);
    uniqueUser = extractUniqueUsers(parseData, "username");
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
    tiktokChartData = chartContentFormatted(dataSelected, tiktokStatConfig);
  }

  if (error) {
    console.error("Error fetching tiktok stat: ", error);
    toast.error(error);
  }
  const { min, max } = calculateMinMax(tiktokChartData, "data");
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h3 className="font-extrabold text-xl md:text-2xl my-4">
        Tiktok Statistics Chart
      </h3>
      <div className="flex flex-row items-center justify-center w-full space-x-10">
        <select
          className="bg-gray-400 border-none p-3 box-border font-semibold text-gray-800"
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
          className="bg-gray-400 border-none p-3 box-border font-semibold text-gray-800"
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
      <BrushChart
        data={tiktokChartData}
        min={min}
        max={max}
        isClickable={false}
      />
    </div>
  );
};

export default TiktokStatistic;

/*
  return (
    <TopicContainer>
      <h3>Tiktok Statistics Chart</h3>
      <DropDownContainer>
        <DropDownMenu value={selectedUser} onChange={handleSelectUser}>
          {uniqueUser.map((user) => {
            return (
              <DropDownOptions key={user} value={user}>
                {user}
              </DropDownOptions>
            );
          })}
        </DropDownMenu>
        <DropDownMenu value={menu} onChange={handleSelectMenu}>
          {menuOptions.map((menu) => {
            return <DropDownOptions key={menu}>{menu}</DropDownOptions>;
          })}
        </DropDownMenu>
      </DropDownContainer>
      <BrushChart
        data={tiktokChartData}
        min={min}
        max={max}
        isClickable={false}
      />
    </TopicContainer>
  );
  */
