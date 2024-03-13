import { useNavigate, useLocation } from "react-router-dom";
import logo from "./logo.png";
import { HomePageProps } from "../utils/interface";

const HomepageHeader = ({ twitterName, twitterPfp }: HomePageProps) => {
  const menuItems = ["YouTube", "Twitter", "Tiktok", "Reddit"];
  const navigate = useNavigate();
  const location = useLocation();

  // const handleLogout = () => {
  // setIsAuthenticated(false);
  //   navigate("/login");
  // };

  return (
    <div className="w-full flex flex-row box-border items-center justify-around bg-black">
      <div className="flex space-x-2 items-center justify-center">
        <img
          className="w-6 md:w-10 lg:w-12 h-auto"
          src={logo}
          alt="token sentiment logo"
        />
        <h2 className="text-xs md:text-xl">Token Sentiment</h2>
      </div>
      <ul className="list-none flex items-center justify-center box-border">
        {menuItems.map((item) => {
          const path = `/${item.toLowerCase()}`;
          const isActive = location.pathname === path;
          return (
            <li key={item} className="no-underline lg:p-5 p-1">
              <span
                className={`md:text-xl text-sm relative overflow-hidden cursor-pointer hover:text-gray-600 ${
                  isActive ? "text-white" : "text-gray-400"
                }`}
                onClick={() => navigate(path)}
              >
                {item}
              </span>
            </li>
          );
        })}
      </ul>
      <div className="flex space-x-2 items-center justify-center">
        <h2 className="hidden md:inline-block text-xs md:text-xl">
          {twitterName}
        </h2>
        <img
          alt="user pfp"
          src={twitterPfp}
          className="w-6 md:w-10 lg:w-12 h-auto"
        />
      </div>
    </div>
  );
};

export default HomepageHeader;
