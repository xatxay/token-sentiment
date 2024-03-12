import TiktokStatistic from "../tiktok/tiktokStatistic";
import TiktokVideo from "../tiktok/tiktokVideo";
import { LoginProps } from "../utils/interface";
import HomepageHeader from "./homepageHeader";

const TiktokHomepage = ({ setIsAuthenticated }: LoginProps) => {
  return (
    <>
      <HomepageHeader setIsAuthenticated={setIsAuthenticated} />
      <div className="flex flex-row items-center h-full w-full justify-center space-y-4 md:py-10 py-4">
        <TiktokVideo />
      </div>
      <div className="flex flex-row items-center h-full w-full justify-center space-y-4 md:py-10 py-4">
        <TiktokStatistic />
      </div>
    </>
  );
};

export default TiktokHomepage;
