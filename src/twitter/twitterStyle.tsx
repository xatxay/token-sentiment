import styled from "@emotion/styled/macro";
import { menuColor } from "../color/color";

const TopicHeader = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  text-decoration: underline;
  position: absolute;
  margin-top: 35px;
`;

const TopicContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const TwitterPage = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
`;

const LeftContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const RightContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackgroundTable = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 650px;
  height: 500px;
  border-radius: 15px;
`;

const TwitterTableName = styled.a`
  color: ${menuColor};
  text-decoration: none;
  cursor: pointer;
  &:hover {
    color: white;
  }
`;

const SentimentByCoinInput = styled.input`
  width: 300px;
  height: 50px;
  padding: 20px;
  align-items: center;
  background-color: ${menuColor};
  box-sizing: border-box;
  border: none;
  font-weight: 600;
  font-size: 15px;
  margin: 20px;
  &:hover {
    filter: brightness(110%);
  }
`;

export {
  TopicHeader,
  TopicContainer,
  LeftContainer,
  RightContainer,
  BackgroundTable,
  TwitterPage,
  TwitterTableName,
  SentimentByCoinInput,
};

/*
[{"tweet_url": "https://twitter.com/TheFlowHorse/status1711795839675297847","username": "TheFlowHorse","coin_sentiment": {"Crypto": 0},"date": 1696896000000}
{"tweet_url": "https://twitter.com/TheFlowHorse/status/1711796217145905180","username": "TheFlowHorse","coin_sentiment": {"Crypto": 0},"date": 1696896000000}
{"tweet_url": "https://twitter.com/BlankBrainTrade/status/1712431008392544574","username": "BlankBrainTrade","coin_sentiment": {"Crypto": 1},"date": 1696896000000}
{"tweet_url": "https://twitter.com/hedgedhog7/status/1712383596135100417","username": "hedgedhog7","coin_sentiment": {"Crypto": -1},"date": 1697068800000}]
*/
