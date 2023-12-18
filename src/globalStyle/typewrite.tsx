import { useEffect, useState } from "react";
import { TypewriterProps } from "../utils/interface";

const TypewriterEffect = ({
  text,
  speed = 200,
  loopDelay = 1000,
}: TypewriterProps) => {
  const [typedText, setTypedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      setTimeout(() => {
        setTypedText(typedText + text.charAt(index));
        setIndex(index + 1);
      }, speed);
    } else if (index === text.length) {
      setTimeout(() => {
        setTypedText("");
        setIndex(0);
      }, loopDelay);
    }
  }, [index, loopDelay, speed, text, typedText]);
  return <>{typedText}</>;
};

export default TypewriterEffect;
