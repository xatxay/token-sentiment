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
import Twitter from "../twitter/twitter";
import { StartDate } from "../utils/interface";
import { useCallback, useState } from "react";

const Homepage = ({ startDate, setStartDate }: StartDate) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedCoin, setSelectedCoin] = useState<string | null>(null);

  const openModal = useCallback(
    (coin: string) => {
      console.log("opening modal", isOpen, selectedCoin, coin);
      if (isOpen) return;
      setIsOpen(true);
      setSelectedCoin(coin);
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
      <Twitter
        startDate={startDate}
        setStartDate={setStartDate}
        openModal={openModal}
        isOpen={isOpen}
        coin={selectedCoin}
        closeModal={closeModal}
      />
    </>
  );
};

export default Homepage;
