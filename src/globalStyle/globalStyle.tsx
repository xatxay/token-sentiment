import { css } from "@emotion/react";
import { backgroundColor } from "../color/color";

const GlobalStyle = css`
  body {
    font-family: "Clarkson", Helvetica, sans-serif;
    letter-spacing: 0.5px;
    background-color: ${backgroundColor};
    color: white;
  }
`;

export default GlobalStyle;
