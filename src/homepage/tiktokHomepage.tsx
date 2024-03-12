import TiktokStatistic from "../tiktok/tiktokStatistic";
import TiktokVideo from "../tiktok/tiktokVideo";
import { HomePageProps } from "../utils/interface";
import HomepageHeader from "./homepageHeader";

const TiktokHomepage = ({ twitterName, twitterPfp }: HomePageProps) => {
  return (
    <>
      <HomepageHeader twitterName={twitterName} twitterPfp={twitterPfp} />
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
