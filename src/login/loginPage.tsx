/** @jsxImportSource @emotion/react */
import {
  Description,
  LoginButton,
  LoginContainer,
  LoginPage,
  ProfilePicture,
  LeftContainer,
  RightContainer,
  LoginPageContainer,
} from "./loginStyle";
import huma from "./huma.jpg";
import TypewriterEffect from "../globalStyle/typewrite";
import { fadeIn } from "../globalStyle/fadeIn";
import { LoginProps } from "../utils/interface";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }: LoginProps) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsAuthenticated(true); //change it for twitter authentication
    navigate("/");
  };

  return (
    <LoginPageContainer css={fadeIn}>
      <LoginPage>
        <LoginContainer>
          <LeftContainer>
            <ProfilePicture src={huma} />
          </LeftContainer>
          <RightContainer>
            <Description>
              <h2>
                {" "}
                <TypewriterEffect text="Welcome to Token Sentiment" />
              </h2>
              <p>
                This website is only available to keyholders of{" "}
                <a
                  href="https://twitter.com/HumaCapital"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "white" }}
                >
                  HumaCapital
                </a>
                .
              </p>
              <p>
                Keys can be bought on{" "}
                <a
                  href="https://www.friend.tech/0x330ba5c3635a169a4a7a1c94d142366203937032"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "white", cursor: "pointer" }}
                >
                  friend.tech
                </a>
                .
              </p>
              <p
                style={{
                  fontSize: "12px",
                  color: "gray",
                  fontStyle: "italic",
                }}
              >
                If you recently bought a key, it may take up to 1 hour to get
                access. The whitelist is updated once an hour.
              </p>
            </Description>
          </RightContainer>
        </LoginContainer>
      </LoginPage>
      <LoginButton onClick={handleLogin}>
        {" "}
        {/*change it for twitter authentication*/}
        <span>Login</span>
      </LoginButton>
    </LoginPageContainer>
  );
};

export default Login;
