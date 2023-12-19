import SentimentPolls from "../poll/sentimentPolls";
import { TwitterPage } from "../twitter/twitterStyle";

const PollsHomepage = () => {
  return (
    <>
      <TwitterPage>
        <SentimentPolls />
      </TwitterPage>
    </>
  );
};

export default PollsHomepage;
