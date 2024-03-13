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
      <div className="BackgroundPage font-sans">
        <div className="flex flex-row items-center h-full w-full space-y-4 md:py-10 py-4">
          <TopCoinInCommentReddit />
        </div>
        <div className="flex flex-col items-center h-full w-full space-y-4 md:py-10 py-4">
          <RedditChart />
          <div className="border-b-2 border-b-black w-3/4" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RedditHomePage;
