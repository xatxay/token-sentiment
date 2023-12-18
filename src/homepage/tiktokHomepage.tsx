import TiktokStatistic from "../tiktok/tiktokStatistic";
import TiktokVideo from "../tiktok/tiktokVideo";
import { TopicHeader, TwitterPage } from "../twitter/twitterStyle";

const TiktokHomepage = () => {
  return (
    <>
      <TopicHeader>
        <h3>Tiktok Sentiment</h3>
      </TopicHeader>
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
