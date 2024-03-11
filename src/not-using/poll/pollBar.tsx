import { PollBarProps } from "../../utils/interface";
import { PollContainer, PollSegment } from "./pollStyle";

const PollBar = ({ values, colors }: PollBarProps) => {
  return (
    <PollContainer>
      {values.map((value, index) => (
        <PollSegment key={index} width={value} color={colors[index]}>
          {value}
        </PollSegment>
      ))}
    </PollContainer>
  );
};

export default PollBar;
