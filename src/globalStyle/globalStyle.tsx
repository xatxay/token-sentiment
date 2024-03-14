import { css } from "@emotion/react";
import { backgroundColor, menuColor } from "../color/color";

const GlobalStyle = css`
  body {
    font-family: sans-serif;
    letter-spacing: 0.5px;
    background-color: black;
    color: white;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${backgroundColor};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${menuColor};
    border-radius: 6px;
    &:hover {
      background-color: gray;
    }
  }
`;

export default GlobalStyle;
