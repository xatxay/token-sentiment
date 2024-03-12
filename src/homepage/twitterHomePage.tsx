import { CoinByDayTwt } from "../twitter/coinsByDayTWT";
import { useCallback, useState } from "react";
import SentimentByUser from "../twitter/sentimentByUser";
import SentimentByCoin from "../twitter/sentimentByCoin";
import TwitterFollowes from "../twitter/twitterFollowers";
import HomepageHeader from "./homepageHeader";
import { HomePageProps } from "../utils/interface";

const TwitterHomePage = ({ twitterName, twitterPfp }: HomePageProps) => {
  const [isCoinByDateModalOpen, setIsCoinByDateModalOpen] =
    useState<boolean>(false);
  const [isSentimentByCoinModalOpen, setIsSentimentByCoinModalOpen] =
    useState<boolean>(false);
  const [selectedCoin, setSelectedCoin] = useState<string | null>(null);

  const openCoinByDateModal = useCallback(
    (coin: string) => {
      if (isCoinByDateModalOpen) return;
      setIsCoinByDateModalOpen(true);
      setSelectedCoin(coin);
    },
    [isCoinByDateModalOpen]
  );

  const openSentimentByCoinModal = () => {
    if (isSentimentByCoinModalOpen) return;
    setIsSentimentByCoinModalOpen(true);
  };

  const closeCoinByDateModal = () => {
    setIsCoinByDateModalOpen(false);
    setSelectedCoin(null);
  };

  const closeSentimentByCoinModal = () => {
    setIsSentimentByCoinModalOpen(false);
  };

  return (
    <>
      <HomepageHeader twitterName={twitterName} twitterPfp={twitterPfp} />
      <div className="flex flex-row h-full w-full justify-between items-start md:py-10 py-4">
        <CoinByDayTwt
          openModal={openCoinByDateModal}
          isOpen={isCoinByDateModalOpen}
          coin={selectedCoin}
          closeModal={closeCoinByDateModal}
        />
      </div>
      <div className="flex flex-row items-center h-full w-full justify-center space-y-4 md:py-10 py-4">
        <SentimentByCoin
          openModal={openSentimentByCoinModal}
          closeModal={closeSentimentByCoinModal}
          isOpen={isSentimentByCoinModalOpen}
        />
      </div>
      <div className="flex flex-row items-center h-full w-full justify-center space-y-4 md:py-10 py-4">
        <SentimentByUser />
      </div>
      <div className="flex flex-row items-center h-full w-full justify-center space-y-4 md:py-10 py-4">
        <TwitterFollowes />
      </div>
    </>
  );
};

export default TwitterHomePage;
