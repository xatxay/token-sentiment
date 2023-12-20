import styled from "@emotion/styled/macro";
import { menuColor } from "../color/color";

const LoginPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginButton = styled.button`
  width: 250px;
  height: 70px;
  background-color: white;
  border: none;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${menuColor};
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform 0.5s ease;
    z-index: 0;
  }

  &:hover::after {
    transform: scaleX(1);
  }

  span {
    font-size: 25px;
    position: relative;
    z-index: 1;
  }
`;

const LoginContainer = styled.div`
  width: 1000px;
  height: 300px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 50px;
`;

const BasedContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LeftContainer = styled(BasedContainer)`
  border-right: 1px solid gray;
  height: 100%;
`;

const RightContainer = styled(BasedContainer)``;

const ProfilePicture = styled.img`
  flex-basis: auto;
  width: 225px;
  height: auto;
`;

const Line = styled.div`
  border: 1px solid gray;
  height: 100%;
  align-self: center;
`;

const Description = styled.div`
  width: 350px;
  height: 200px;
`;

const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
`;

export {
  LoginPage,
  LoginButton,
  LoginContainer,
  ProfilePicture,
  Description,
  Line,
  LeftContainer,
  RightContainer,
  LoginPageContainer,
};
