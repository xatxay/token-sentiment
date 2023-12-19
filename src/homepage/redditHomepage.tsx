import RedditChart from "../reddit/redditChart";
import TopCoinInCommentReddit from "../reddit/redditTopCoin";
import {TwitterPage } from "../twitter/twitterStyle";

const RedditHomePage = () => {
  return (
    <>
      <TwitterPage>
        <RedditChart />
      </TwitterPage>
      <TwitterPage>
        <TopCoinInCommentReddit />
      </TwitterPage>
    </>
  );
};

export default RedditHomePage;
