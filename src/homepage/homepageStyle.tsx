import styled from "@emotion/styled/macro";
import { menuColor } from "../color/color";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: 80px;
  position: absolute;
  box-sizing: border-box;
  width: 100%;
`;

const HeaderText = styled.span`
  display: flex;
  align-items: center;
  font-size: 20px;
  text-transform: uppercase;
`;

const HeaderMenu = styled.ul`
  width: 100%;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

const MenuList = styled.li`
  text-decoration: none;
  padding: 20px;
  margin: 0;
`;

const MenuItems = styled.a`
  font-size: 20px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  color: ${menuColor};

  ::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -0.5px;
    height: 2px;
    width: 100%;
    background-color: ${menuColor};
    transform: scaleX(0);
    transform-origin: bottom left;
    transition: 0.5s ease;
    z-index: 1;
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;

const LogoImage = styled.img`
  width: 35px;
  height: 35px;
  cursor: pointer;
  padding-left: 30px;
  padding-right: 10px;
`;

const LogoutButton = styled.span`
  color: white;
  padding-right: 30px;
  font-size: 20px;
  text-decoration: underline;
  cursor: pointer;
  z-index: 1;
  &:hover {
    color: gray;
  }
`;

export {
  HeaderContainer,
  HeaderText,
  HeaderMenu,
  LogoImage,
  MenuItems,
  LogoutButton,
  MenuList,
};
