import TiktokStatistic from "../tiktok/tiktokStatistic";
import TiktokVideo from "../tiktok/tiktokVideo";
import { HomePageProps } from "../utils/interface";
import { Footer } from "./footer";
import HomepageHeader from "./homepageHeader";
import "../App.css";

const TiktokHomepage = ({ twitterName, twitterPfp }: HomePageProps) => {
  return (
    <>
      <HomepageHeader twitterName={twitterName} twitterPfp={twitterPfp} />
      <div className="BackgroundPage font-sans">
        <div className="flex flex-col items-center w-full justify-center space-y-4 md:py-10 py-4">
          <TiktokVideo />
        </div>
        <div className="flex flex-col items-center h-full w-full justify-center space-y-4 md:py-10 py-4">
          <div className="border-t-2 border-t-black w-3/4" />
          <TiktokStatistic />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TiktokHomepage;
