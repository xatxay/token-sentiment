import { ChangeEvent, useState } from "react";
import BrushChart from "../not-using/brushChart";
import {
  BrushChartData,
  ChartDataConfig,
  FollowersChanges,
  TwitterFollower,
} from "../utils/interface";
import {
  calculateMinMax,
  chartContentFormatted,
  extractUniqueUsers,
  twitterFollowersBrushData,
  useFetch,
} from "../utils/utils";
import { toast } from "react-toastify";

const TwitterFollowes = () => {
  const [username, setUsername] = useState<string>("Pentosh1");
  const { data, error, loading } = useFetch(
    String(process.env.REACT_APP_TWITTER_FOLLOWERS)
  );

  let parseData: TwitterFollower[] = [];
  let uniqueUser: string[] = [];
  let userFollowersChange: BrushChartData[] = [];
  let followersChanges: FollowersChanges[] = [];

  if (data) {
    parseData = JSON.parse(data);
  }

  if (error) {
    toast.error(error);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (parseData && parseData.length > 0) {
    uniqueUser = extractUniqueUsers(parseData, "username");
    followersChanges = twitterFollowersBrushData(parseData, username);

    const twitterConfig: ChartDataConfig<FollowersChanges> = {
      getDataValue: (data) => data.data,
      getTooltipContent: (data) =>
        `<strong>${data.username}: ${data.data}</strong>`,
      getDate: (data) => data.date,
    };
    userFollowersChange = chartContentFormatted(
      followersChanges,
      twitterConfig
    );
  }
  const handleSelectUser = (event: ChangeEvent<HTMLSelectElement>) => {
    setUsername(event.target.value);
  };
  const { min, max } = calculateMinMax(followersChanges, "data");
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full space-y-4">
        <h3 className="font-extrabold text-xl md:text-2xl">
          Twitter Followers
        </h3>
        <select
          className="bg-gray-400 overflow-hidden max-w-20 md:max-w-44 border-none py-1 lg:py-3 text-xs md:text-base lg:p-3 box-border font-semibold text-gray-800"
          value={username}
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
        <BrushChart
          data={userFollowersChange}
          min={min}
          max={max}
          isClickable={false}
        />
      </div>
    </>
  );
};

export default TwitterFollowes;
