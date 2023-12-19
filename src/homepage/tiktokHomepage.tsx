import TiktokStatistic from "../tiktok/tiktokStatistic";
import TiktokVideo from "../tiktok/tiktokVideo";
import { TwitterPage } from "../twitter/twitterStyle";

const TiktokHomepage = () => {
  return (
    <>
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
