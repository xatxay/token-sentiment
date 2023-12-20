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
    let timer: NodeJS.Timeout;
    if (index < text.length) {
      timer = setTimeout(() => {
        setTypedText(typedText + text.charAt(index));
        setIndex(index + 1);
      }, speed);
    } else if (index === text.length) {
      timer = setTimeout(() => {
        setTypedText("");
        setIndex(0);
      }, loopDelay);
    }
    return () => clearTimeout(timer);
  }, [index, loopDelay, speed, text, typedText]);
  return <>{typedText || "\u00A0"}</>;
};

export default TypewriterEffect;
