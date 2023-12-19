import { css } from "@emotion/react";

export const fadeIn = css`
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  animation: fadeIn 2s ease-out;
`;
