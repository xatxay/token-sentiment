import BrushChart from "../chart/brushChart";
import { DropDownMenu, DropDownOptions } from "../table/dropdownStyle";
import { TwitterFollower } from "../utils/interface";
import { extractUniqueUsers, useFetch } from "../utils/utils";
import { TopicContainer } from "./twitterStyle";

const TwitterFollowes = () => {
  const { data, error, loading } = useFetch(
    String(process.env.REACT_APP_TWITTER_FOLLOWERS)
  );
  let parseData: TwitterFollower[] = [];
  let uniqueUser: string[] = [];
  if (data) {
    parseData = JSON.parse(data);
    console.log("followers data: ", parseData);
  }
  if (parseData && parseData.length > 0) {
    uniqueUser = extractUniqueUsers(parseData);
  }
  return (
    <>
      <TopicContainer>
        <h3>Twitter Followers</h3>
        <DropDownMenu>
          {uniqueUser.map((user) => {
            return <DropDownOptions key={user}>{user}</DropDownOptions>;
          })}
        </DropDownMenu>
      </TopicContainer>
      {/* <BrushChart/> */}
    </>
  );
};

export default TwitterFollowes;
