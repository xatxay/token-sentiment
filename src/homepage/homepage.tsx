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

const Homepage = () => {
  const menuItems = ["Youtube", "Twitter", "Tiktok", "Reddit", "Polls"];
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
    </>
  );
};

export default Homepage;
