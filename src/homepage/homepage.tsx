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

const Homepage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedCoin, setSelectedCoin] = useState<string | null>(null);

  const openModal = useCallback(
    (coin?: string) => {
      console.log("opening modal", isOpen, selectedCoin, coin);
      if (isOpen) return;
      setIsOpen(true);
      if (coin) setSelectedCoin(coin);
    },
    [isOpen, selectedCoin]
  );

  const closeModal = () => {
    setIsOpen(false);
    setSelectedCoin(null);
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
          openModal={openModal}
          isOpen={isOpen}
          coin={selectedCoin}
          closeModal={closeModal}
        />
        <SentimentByUser />
      </TwitterPage>
      <TwitterPage>
        <SentimentByCoin
          openModal={openModal}
          closeModal={closeModal}
          isOpen={isOpen}
        />
      </TwitterPage>
    </>
  );
};

export default Homepage;
