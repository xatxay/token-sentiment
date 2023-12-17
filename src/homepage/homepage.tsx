import { Global } from "@emotion/react";
import GlobalStyle from "../globalStyle/globalStyle";
import {
  HeaderContainer,
  HeaderMenu,
  HeaderText,
  LogoImage,
  LogoutButton,
  MenuItems,
  MenuList,
} from "./homepageStyle";
import logo from "./logo.png";
import CoinsByDay from "../twitter/coinsByDay";
// import { StartDate } from "../utils/interface";
import { useCallback, useState } from "react";
import SentimentByUser from "../twitter/sentimentByUser";
import { TopicHeader, TwitterPage } from "../twitter/twitterStyle";
import SentimentByCoin from "../twitter/sentimentByCoin";
import TwitterFollowes from "../twitter/twitterFollowers";

const Homepage = () => {
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
  const menuItems = ["Twitter", "Youtube", "Tiktok", "Reddit", "Polls"];
  return (
    <>
      <Global styles={GlobalStyle} />
      <HeaderContainer>
        <HeaderText>
          <LogoImage src={logo} />
          Token Sentiment
        </HeaderText>
        <HeaderMenu>
          {menuItems.map((item) => {
            return (
              <MenuList key={item}>
                <MenuItems>{item}</MenuItems>
              </MenuList>
            );
          })}
        </HeaderMenu>
        <LogoutButton>Logout</LogoutButton>
      </HeaderContainer>
      <TopicHeader>
        <h3>Twitter Sentiment</h3>
      </TopicHeader>
      <TwitterPage>
        <CoinsByDay
          // startDate={startDate}
          // setStartDate={setStartDate}
          openModal={openCoinByDateModal}
          isOpen={isCoinByDateModalOpen}
          coin={selectedCoin}
          closeModal={closeCoinByDateModal}
        />
      </TwitterPage>
      <TwitterPage>
        <SentimentByUser />
      </TwitterPage>
      <TwitterPage>
        <SentimentByCoin
          openModal={openSentimentByCoinModal}
          closeModal={closeSentimentByCoinModal}
          isOpen={isSentimentByCoinModalOpen}
        />
      </TwitterPage>
      <TwitterPage>
        <TwitterFollowes />
      </TwitterPage>
    </>
  );
};

export default Homepage;
