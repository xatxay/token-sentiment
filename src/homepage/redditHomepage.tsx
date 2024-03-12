import RedditChart from "../reddit/redditChart";
import TopCoinInCommentReddit from "../reddit/redditTopCoin";
import { HomePageProps } from "../utils/interface";
import HomepageHeader from "./homepageHeader";

const RedditHomePage = ({ twitterName, twitterPfp }: HomePageProps) => {
  return (
    <>
      <HomepageHeader twitterName={twitterName} twitterPfp={twitterPfp} />
      <div className="flex flex-row items-center h-full w-full space-y-4 md:py-10 py-4">
        <RedditChart />
      </div>
      <div className="flex flex-row items-center h-full w-full space-y-4 md:py-10 py-4">
        <TopCoinInCommentReddit />
      </div>
    </>
  );
};

export default RedditHomePage;
