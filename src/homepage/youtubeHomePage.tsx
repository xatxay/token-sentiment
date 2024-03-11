import { useEffect, useState } from "react";
import CoinByDayYT from "../youtube/coinsByDayYT";
import { fetchQuery, formatDate } from "../utils/utils";
import YoutubeStats from "../youtube/youtubeStat";
import YoutubeChannelsData from "../youtube/ytChannelsData";
import HomepageHeader from "./homepageHeader";
import { LoginProps } from "../utils/interface";

const YoutubeHomePage = ({ setIsAuthenticated }: LoginProps) => {
  const [selectedCoinYt, setSeletedCoinYt] = useState<string>("");
  const [isOpenYtModal, setIsOpenYtModal] = useState<boolean>(false);
  const [ytSelectedDate, setYtSelectedData] = useState<Date>(
    new Date(new Date().setDate(new Date().getDate() - 1))
  );
  const [videoFetchData, setVideoFetchData] = useState<string>("");
  const videoApiUrl = String(process.env.REACT_APP_YOUTUBE_COIN_BY_DAY_VIDEO);
  const date = formatDate(ytSelectedDate);

  const openCoinByDateModalYt = (coin: string) => {
    if (isOpenYtModal) return;
    setIsOpenYtModal(true);
    setSeletedCoinYt(coin);
  };

  const closeCoinByDateModalYt = () => {
    if (!isOpenYtModal) return;
    setIsOpenYtModal(false);
    setSeletedCoinYt("");
  };

  useEffect(() => {
    if (isOpenYtModal && selectedCoinYt) {
      const videoParams = {
        date: date.toString(),
        coin: selectedCoinYt,
      };
      const fetchData = async () => {
        try {
          const videoData = await fetchQuery(videoApiUrl || "", videoParams);
          setVideoFetchData(videoData);
        } catch (err) {
          console.error("Error fetching video modal data: ", err);
        }
      };
      fetchData();
    }
  }, [date, isOpenYtModal, selectedCoinYt, videoApiUrl]);

  return (
    <>
      <HomepageHeader setIsAuthenticated={setIsAuthenticated} />
      <div className="flex flex-row items-center h-full w-full justify-center md:my-10 my-4 md:py-10 py-4">
        <CoinByDayYT
          openCoinByDateModalYt={openCoinByDateModalYt}
          closeCoinByDateModalYt={closeCoinByDateModalYt}
          isOpenYtModal={isOpenYtModal}
          selectedCoinYt={selectedCoinYt}
          ytSelectedDate={ytSelectedDate}
          setYtSelectedData={setYtSelectedData}
          videoFetchData={videoFetchData}
        />
      </div>
      <div className="flex flex-row items-center h-full w-full justify-center md:my-10 my-4 md:py-10 py-4">
        <YoutubeStats />
      </div>
      <div className="flex flex-row items-center h-full w-full justify-center md:my-10 my-4 md:py-10 py-4">
        <YoutubeChannelsData />
      </div>
    </>
  );
};

export default YoutubeHomePage;

/*
  return (
    <>
      <HomepageHeader setIsAuthenticated={setIsAuthenticated} />
      <TwitterPage>
        <YoutubeStats />
      </TwitterPage>
      <TwitterPage>
        <CoinByDayYT
          openCoinByDateModalYt={openCoinByDateModalYt}
          closeCoinByDateModalYt={closeCoinByDateModalYt}
          isOpenYtModal={isOpenYtModal}
          selectedCoinYt={selectedCoinYt}
          ytSelectedDate={ytSelectedDate}
          setYtSelectedData={setYtSelectedData}
          videoFetchData={videoFetchData}
        />
      </TwitterPage>
      <TwitterPage>
        <YoutubeChannelsData />
      </TwitterPage>
    </>
  );
  */
