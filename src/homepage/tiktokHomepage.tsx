import TiktokStatistic from "../tiktok/tiktokStatistic";
import TiktokVideo from "../tiktok/tiktokVideo";
import { LoginProps } from "../utils/interface";
import HomepageHeader from "./homepageHeader";

const TiktokHomepage = ({ setIsAuthenticated }: LoginProps) => {
  return (
    <>
      <HomepageHeader setIsAuthenticated={setIsAuthenticated} />
      <div className="flex flex-row items-center h-full w-full justify-center">
        <TiktokVideo />
      </div>
      <div className="flex flex-row items-center h-full w-full justify-center">
        <TiktokStatistic />
      </div>
    </>
  );
};

export default TiktokHomepage;
/*
 return (
    <>
      <HomepageHeader setIsAuthenticated={setIsAuthenticated} />
      <TwitterPage>
        <TiktokVideo />
      </TwitterPage>
      <TwitterPage>
        <TiktokStatistic />
      </TwitterPage>
    </>
  );
  */
