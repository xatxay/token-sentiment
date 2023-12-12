import styled from "@emotion/styled/macro";
import { menuColor } from "../color/color";

const TopicHeader = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  text-decoration: underline;
  position: absolute;
`;

const TopicContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
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
  justify-content: flex-start;
  flex-direction: column;
  width: 650px;
  height: 500px;
  border-radius: 15px;
`;

const TwitterTableName = styled.a`
  color: ${menuColor};
  text-decoration: none;
  &:hover {
    color: white;
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
};
