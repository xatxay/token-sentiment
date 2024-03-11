/** @jsxImportSource @emotion/react */
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
  /*
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
*/
  return (
    <div
      className="flex flex-col items-center justify-center h-screen w-full"
      css={fadeIn}
    >
      <div className="flex items-center justify-center">
        <div className="flex flex-row items-center justify-center gap-5 mb-12">
          <div className="h-full">
            <img
              alt="huma login pic"
              src={huma}
              className="w-56 h-auto basis-auto"
            />
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div>
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
              <p className="text-xs text-gray-600 italic">
                If you recently bought a key, it may take up to 1 hour to get
                access. The whitelist is updated once an hour.
              </p>
            </div>
          </div>
        </div>
      </div>
      <button
        className="bg-white overflow-hidden box-border cursor-pointer text-black px-20 py-5 flex justify-center items-center text-center hover:bg-gray-500"
        onClick={handleLogin}
      >
        {" "}
        {/*change it for twitter authentication*/}
        Login
      </button>
    </div>
  );
};
/*
  width: 250px;
  height: 70px;
  background-color: white;
  border: none;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  */

export default Login;

/*
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
        {/*change it for twitter authentication*/
//       <span>Login</span>
//     </LoginButton>
//   </LoginPageContainer>
// );
// */
