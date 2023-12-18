import {CoinByDayTwt} from "../twitter/coinsByDayTWT";
import { useCallback, useState } from "react";
import SentimentByUser from "../twitter/sentimentByUser";
import { TopicHeader, TwitterPage } from "../twitter/twitterStyle";
import SentimentByCoin from "../twitter/sentimentByCoin";
import TwitterFollowes from "../twitter/twitterFollowers";

const TwitterHomePage = () => {
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
      console.log("opening modal", isCoinByDateModalOpen, selectedCoin, coin);
    },
    [isCoinByDateModalOpen, selectedCoin]
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
      <TopicHeader>
        <h3>Twitter Sentiment</h3>
      </TopicHeader>
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
};

export default TwitterHomePage;
