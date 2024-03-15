import { CoinByDayTwt } from "../twitter/coinsByDayTWT";
import SentimentByUser from "../twitter/sentimentByUser";
import SentimentByCoin from "../twitter/sentimentByCoin";
import HomepageHeader from "./homepageHeader";
import { TwitterHomepageProps } from "../utils/interface";
import { Footer } from "./footer";
import "../App.css";

const TwitterHomePage = ({
  twitterName,
  twitterPfp,
  handleRowClicked,
  selectedCoin,
}: TwitterHomepageProps) => {
  return (
    <>
      <HomepageHeader twitterName={twitterName} twitterPfp={twitterPfp} />
      <div className="BackgroundPage">
        <div className="flex flex-row h-full w-full justify-between items-start md:py-10 py-4">
          <CoinByDayTwt
            coin={selectedCoin}
            handleRowClicked={handleRowClicked}
            selectedCoin={selectedCoin}
          />
        </div>
        <div className="flex flex-col items-center h-full w-full justify-center space-y-4 md:py-10 py-4">
          <div className="border-t-2 border-t-black w-3/4" />
          <SentimentByCoin />
          <div className="border-b-2 border-b-black w-3/4" />
        </div>
        <div className="flex flex-row items-center h-full w-full justify-center space-y-4 md:py-10 py-4">
          <SentimentByUser />
        </div>
        {/* <div className="flex flex-row items-center h-full w-full justify-center space-y-4 md:py-10 py-4">
        <TwitterFollowes />
      </div> */}
      </div>
      <Footer />
    </>
  );
};

export default TwitterHomePage;
