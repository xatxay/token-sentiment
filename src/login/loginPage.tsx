/** @jsxImportSource @emotion/react */
import huma from "./huma.jpg";
import TypewriterEffect from "../globalStyle/typewrite";
import { fadeIn } from "../globalStyle/fadeIn";
import { LoginProps } from "../utils/interface";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const Login = ({
  isAuthenticated,
  setIsAuthenticated,
  setTwitterName,
  setTwitterPfp,
}: LoginProps) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    window.location.href = process.env.REACT_APP_USER_AUTH || "";
  };

  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        const response = await axios.get(String(process.env.REACT_APP_LOG_IN), {
          withCredentials: true,
        });
        setIsAuthenticated(response.data.isAuthorized);
        setTwitterName(response.data.username);
        setTwitterPfp(response.data.profilePicture);
      } catch (error) {
        setTwitterName("HumaCapital");
        setTwitterPfp(
          "https://pbs.twimg.com/profile_images/1539544314430226433/OSOV1122_normal.jpg"
        );
        setIsAuthenticated(true);
        // setIsAuthenticated(false);
      }
    };
    checkUserAuth();
  }, [setIsAuthenticated, setTwitterName, setTwitterPfp]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div
      className="flex flex-col md:flex-row items-center justify-center h-screen w-full space-x-8 space-y-4 md:p-4"
      css={fadeIn}
    >
      <img alt="huma login pic" src={huma} className="w-40 md:w-56 h-auto" />
      <div className="space-y-4 flex items-center justify-center flex-col md:items-start md:justify-start">
        <h2>
          {" "}
          <TypewriterEffect text="Welcome to Token Sentiment" />
        </h2>
        <div className="items-start justify-start flex flex-col space-y-3">
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
          <p className="text-xs text-gray-500 italic">
            If you recently bought a key, it may take up to 1 hour to get
            access. The whitelist is updated once an hour.
          </p>
        </div>
        <button
          className="bg-white box-border cursor-pointer text-black px-10 py-3 lg:px-20 lg:py-4 flex justify-center items-center text-center hover:bg-gray-500"
          onClick={handleLogin}
        >
          {" "}
          {/*change it for twitter authentication*/}
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
