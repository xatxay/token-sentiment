import RedditChart from "../reddit/redditChart";
import TopCoinInCommentReddit from "../reddit/redditTopCoin";
import { TwitterPage } from "../twitter/twitterStyle";
import { LoginProps } from "../utils/interface";
import HomepageHeader from "./homepageHeader";

const RedditHomePage = ({ setIsAuthenticated }: LoginProps) => {
  return (
    <>
      <HomepageHeader setIsAuthenticated={setIsAuthenticated} />
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
