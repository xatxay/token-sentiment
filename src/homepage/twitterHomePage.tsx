import { CoinByDayTwt } from "../twitter/coinsByDayTWT";
import { useCallback, useState } from "react";
import SentimentByUser from "../twitter/sentimentByUser";
import SentimentByCoin from "../twitter/sentimentByCoin";
import TwitterFollowes from "../twitter/twitterFollowers";
import HomepageHeader from "./homepageHeader";
import { LoginProps } from "../utils/interface";

const TwitterHomePage = ({ setIsAuthenticated }: LoginProps) => {
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
      <HomepageHeader setIsAuthenticated={setIsAuthenticated} />
      <div className="flex flex-row items-center h-full w-full justify-center">
        <CoinByDayTwt
          openModal={openCoinByDateModal}
          isOpen={isCoinByDateModalOpen}
          coin={selectedCoin}
          closeModal={closeCoinByDateModal}
        />
      </div>
      <div className="flex flex-row items-center h-full w-full justify-center">
        <SentimentByCoin
          openModal={openSentimentByCoinModal}
          closeModal={closeSentimentByCoinModal}
          isOpen={isSentimentByCoinModalOpen}
        />
      </div>
      <div className="flex flex-row items-center h-full w-full justify-center">
        <SentimentByUser />
      </div>
      <div className="flex flex-row items-center h-full w-full justify-center">
        <TwitterFollowes />
      </div>
    </>
  );
};

export default TwitterHomePage;

/*
  return (
    <>
      <HomepageHeader setIsAuthenticated={setIsAuthenticated} />
      <TwitterPage>
        <CoinByDayTwt
          openModal={openCoinByDateModal}
          isOpen={isCoinByDateModalOpen}
          coin={selectedCoin}
          closeModal={closeCoinByDateModal}
        />
      </TwitterPage>
      <TwitterPage>
        <SentimentByCoin
          openModal={openSentimentByCoinModal}
          closeModal={closeSentimentByCoinModal}
          isOpen={isSentimentByCoinModalOpen}
        />
      </TwitterPage>
      <TwitterPage>
        <SentimentByUser />
      </TwitterPage>
      <TwitterPage>
        <TwitterFollowes />
      </TwitterPage>
    </>
  );
  */
