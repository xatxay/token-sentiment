import RedditChart from "../reddit/redditChart";
import TopCoinInCommentReddit from "../reddit/redditTopCoin";
import { LoginProps } from "../utils/interface";
import HomepageHeader from "./homepageHeader";

const RedditHomePage = ({ setIsAuthenticated }: LoginProps) => {
  return (
    <>
      <HomepageHeader setIsAuthenticated={setIsAuthenticated} />
      <div className="flex flex-row items-center h-full w-full">
        <RedditChart />
      </div>
      <div className="flex flex-row items-center h-full w-full">
        <TopCoinInCommentReddit />
      </div>
    </>
  );
};

export default RedditHomePage;

/*
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
  */
