import { useEffect, useState } from "react";
import CoinByDayYT from "../youtube/coinsByDayYT";
import { fetchQuery, formatDate } from "../utils/utils";
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
  // const [selectedCoinYt, setSeletedCoinYt] = useState<string>("");
  // const [isOpenYtModal, setIsOpenYtModal] = useState<boolean>(false);
  const [ytSelectedDate, setYtSelectedData] = useState<Date>(
    new Date(new Date().setDate(new Date().getDate() - 1))
  );
  const [videoFetchData, setVideoFetchData] = useState<string>("");
  const videoApiUrl = String(process.env.REACT_APP_YOUTUBE_COIN_BY_DAY_VIDEO);
  const date = formatDate(ytSelectedDate);

  // const openCoinByDateModalYt = (coin: string) => {
  //   if (isOpenYtModal) return;
  //   setIsOpenYtModal(true);
  //   setSeletedCoinYt(coin);
  // };

  // const closeCoinByDateModalYt = () => {
  //   if (!isOpenYtModal) return;
  //   setIsOpenYtModal(false);
  //   setSeletedCoinYt("");
  // };

  useEffect(() => {
    const videoParams = {
      date: date.toString(),
      coin: selectedCoin,
    };
    if (selectedCoin) {
      const fetchData = async () => {
        try {
          console.log("fetch: ", videoParams, " asdas: ", selectedCoin);
          const videoData = await fetchQuery(videoApiUrl || "", videoParams);
          setVideoFetchData(videoData);
        } catch (err) {
          console.error("Error fetching video modal data: ", err);
        }
      };
      fetchData();
    }
  }, [date, selectedCoin, videoApiUrl]);

  useEffect(() => {
    console.log("fetching video data: ", videoFetchData);
  }, [videoFetchData]);

  return (
    <>
      <HomepageHeader twitterName={twitterName} twitterPfp={twitterPfp} />
      <div className="BackgroundPage">
        <div className="flex flex-row items-center h-full w-full justify-center space-y-4 md:py-10 py-4">
          <CoinByDayYT
            // openCoinByDateModalYt={openCoinByDateModalYt}
            // closeCoinByDateModalYt={closeCoinByDateModalYt}
            // isOpenYtModal={isOpenYtModal}
            // selectedCoinYt={selectedCoinYt}
            ytSelectedDate={ytSelectedDate}
            setYtSelectedData={setYtSelectedData}
            videoFetchData={videoFetchData}
            handleRowClicked={handleRowClicked}
            selectedCoin={selectedCoin}
          />
        </div>
        <div className="flex flex-row items-center h-full w-full justify-center space-y-4 md:py-10 py-4">
          <YoutubeStats />
        </div>
        {/* <div className="flex flex-row items-center h-full w-full justify-center space-y-4 md:py-10 py-4">
          <YoutubeChannelsData />
        </div> */}
      </div>
      <Footer />
    </>
  );
};

export default YoutubeHomePage;
