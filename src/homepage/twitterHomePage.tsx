import { CoinByDayTwt } from "../twitter/coinsByDayTWT";
import { useState } from "react";
import SentimentByUser from "../twitter/sentimentByUser";
import SentimentByCoin from "../twitter/sentimentByCoin";
// import TwitterFollowes from "../twitter/twitterFollowers";
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
  // const [isCoinByDateModalOpen, setIsCoinByDateModalOpen] =
  //   useState<boolean>(false);
  const [isSentimentByCoinModalOpen, setIsSentimentByCoinModalOpen] =
    useState<boolean>(false);
  // const [selectedCoin, setSelectedCoin] = useState<string | null>(null);

  // const openCoinByDateModal = useCallback(
  //   (coin: string) => {
  //     if (isCoinByDateModalOpen) return;
  //     setIsCoinByDateModalOpen(true);
  //     setSelectedCoin(coin);
  //   },
  //   [isCoinByDateModalOpen]
  // );

  // const handleRowClicked = (coin: string) => {
  //   selectedCoin === coin ? setSelectedCoin(null) : setSelectedCoin(coin);
  //   console.log("clicking: ", selectedCoin, coin);
  // };

  const openSentimentByCoinModal = () => {
    if (isSentimentByCoinModalOpen) return;
    setIsSentimentByCoinModalOpen(true);
  };

  // const closeCoinByDateModal = () => {
  //   setIsCoinByDateModalOpen(false);
  //   setSelectedCoin(null);
  // };

  const closeSentimentByCoinModal = () => {
    setIsSentimentByCoinModalOpen(false);
  };

  return (
    <>
      <HomepageHeader twitterName={twitterName} twitterPfp={twitterPfp} />
      <div className="BackgroundPage font-sans">
        <div className="flex flex-row h-full w-full justify-between items-start md:py-10 py-4">
          <CoinByDayTwt
            coin={selectedCoin}
            handleRowClicked={handleRowClicked}
            selectedCoin={selectedCoin}
          />
        </div>
        <div className="flex flex-col items-center h-full w-full justify-center space-y-4 md:py-10 py-4">
          <div className="border-t-2 border-t-black w-3/4" />
          <SentimentByCoin
            openModal={openSentimentByCoinModal}
            closeModal={closeSentimentByCoinModal}
            isOpen={isSentimentByCoinModalOpen}
          />
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
