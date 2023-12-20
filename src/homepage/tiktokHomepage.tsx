import TiktokStatistic from "../tiktok/tiktokStatistic";
import TiktokVideo from "../tiktok/tiktokVideo";
import { TwitterPage } from "../twitter/twitterStyle";
import { LoginProps } from "../utils/interface";
import HomepageHeader from "./homepageHeader";

const TiktokHomepage = ({ setIsAuthenticated }: LoginProps) => {
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
};

export default TiktokHomepage;
