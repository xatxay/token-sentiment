import styled from "@emotion/styled/macro";

const PollContainer = styled.div`
  width: 225px;
  background-color: white;
  border-radius: 4px;
  overflow: hidden;
`;

const PollSegment = styled.div<{ width: number; color: string }>`
  background-color: ${(props) => props.color};
  height: 20px;
  float: left;
  color: black;
  font-size: 11px;
  align-items: center;
  justify-content: center;
  display: flex;
  font-weight: bold;
  width: ${(props) => `${props.width}%`};
`;

const PollDescription = styled.div<{ color: string }>`
  width: 15px;
  height: 15px;
  background-color: ${(props) => props.color};
`;

const PollDescriptionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
`;

export {
  PollContainer,
  PollSegment,
  PollDescription,
  PollDescriptionContainer,
};
