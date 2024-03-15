import { useState } from "react";
import CoinByDayYT from "../youtube/coinsByDayYT";
import { formatDate } from "../utils/utils";
import YoutubeStats from "../youtube/youtubeStat";
import YoutubeChannelsData from "../youtube/ytChannelsData";
import HomepageHeader from "./homepageHeader";
import { YoutubeHomepageProps } from "../utils/interface";
import { Footer } from "./footer";
import "../App.css";

const YoutubeHomePage = ({
  twitterName,
  twitterPfp,
  handleRowClicked,
  selectedCoin,
}: YoutubeHomepageProps) => {
  const [ytSelectedDate, setYtSelectedData] = useState<Date>(
    new Date(new Date().setDate(new Date().getDate() - 1))
  );
  const date = formatDate(ytSelectedDate);

  return (
    <>
      <HomepageHeader twitterName={twitterName} twitterPfp={twitterPfp} />
      <div className="BackgroundPage">
        <div className="flex flex-row items-start w-full justify-center space-y-4 md:py-10 py-4">
          <CoinByDayYT
            ytSelectedDate={ytSelectedDate}
            setYtSelectedData={setYtSelectedData}
            handleRowClicked={handleRowClicked}
            selectedCoin={selectedCoin}
            date={date}
          />
        </div>
        <div className="flex items-center h-full w-full justify-center space-y-4 md:py-10 py-4 flex-col">
          <div className="border-t-2 border-t-black w-3/4" />
          <YoutubeStats />
          <div className="w-3/4 border-b-2 border-b-black" />
        </div>
        <div className="flex flex-row items-center h-full w-full justify-center space-y-4 md:py-10 py-4">
          <YoutubeChannelsData />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default YoutubeHomePage;
