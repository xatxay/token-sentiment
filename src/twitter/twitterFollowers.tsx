import { ChangeEvent, useState } from "react";
import BrushChart from "../chart/brushChart";
import { DropDownMenu, DropDownOptions } from "../table/dropdownStyle";
import {
  BrushChartData,
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
import { TopicContainer } from "./twitterStyle";
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
    // console.log("followers data: ", parseData);
  }

  if (error) {
    toast.error(error);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (parseData && parseData.length > 0) {
    uniqueUser = extractUniqueUsers(parseData);
    followersChanges = twitterFollowersBrushData(parseData, username);
    console.log("follower changes: ", followersChanges);
    userFollowersChange = chartContentFormatted(followersChanges);
  }

  const handleSelectUser = (event: ChangeEvent<HTMLSelectElement>) => {
    setUsername(event.target.value);
  };
  const { min, max } = calculateMinMax(followersChanges);
  console.log("qweqwewq: ", min, max);
  console.log("select username: ", username);

  return (
    <>
      <TopicContainer>
        <h3>Twitter Followers</h3>
        <DropDownMenu value={username} onChange={handleSelectUser}>
          {uniqueUser.map((user) => {
            return (
              <DropDownOptions key={user} value={user}>
                {user}
              </DropDownOptions>
            );
          })}
        </DropDownMenu>
        <BrushChart data={userFollowersChange} min={min} max={max} />
      </TopicContainer>
    </>
  );
};

export default TwitterFollowes;
