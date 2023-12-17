import { useEffect, useState } from "react";
import { TypewriterProps } from "../utils/interface";

const TypewriterEffect = ({
  text,
  speed = 200,
  loopDelay = 1000,
}: TypewriterProps) => {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let index = 0;
    const type = () => {
      if (index < text.length) {
        setTypedText((prev) => prev + text.charAt(index));
        index++;
      } else {
        setTimeout(() => {
          setTypedText("");
          index = 0;
        }, loopDelay);
      }
    };
    const timer = setInterval(type, speed);
    return () => clearInterval(timer);
  }, [text, speed, loopDelay]);
  return <div>{typedText}</div>;
};

export default TypewriterEffect;
