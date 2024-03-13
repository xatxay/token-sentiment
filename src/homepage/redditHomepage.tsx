import RedditChart from "../reddit/redditChart";
import TopCoinInCommentReddit from "../reddit/redditTopCoin";
import { HomePageProps } from "../utils/interface";
import { Footer } from "./footer";
import HomepageHeader from "./homepageHeader";
import "../App.css";

const RedditHomePage = ({ twitterName, twitterPfp }: HomePageProps) => {
  return (
    <>
      <HomepageHeader twitterName={twitterName} twitterPfp={twitterPfp} />
      <div className="BackgroundPage">
        <div className="flex flex-row items-center h-full w-full space-y-4 md:py-10 py-4">
          <RedditChart />
        </div>
        <div className="flex flex-row items-center h-full w-full space-y-4 md:py-10 py-4">
          <TopCoinInCommentReddit />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RedditHomePage;
