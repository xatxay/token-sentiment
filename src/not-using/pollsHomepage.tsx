import SentimentPolls from "./poll/sentimentPolls";
import { TwitterPage } from "./twitterStyle";
import { LoginProps } from "../utils/interface";
// import HomepageHeader from "../homepage/homepageHeader";

const PollsHomepage = ({ setIsAuthenticated }: LoginProps) => {
  return (
    <>
      {/* <HomepageHeader setIsAuthenticated={setIsAuthenticated} /> */}
      <TwitterPage>
        <SentimentPolls />
      </TwitterPage>
    </>
  );
};

export default PollsHomepage;
