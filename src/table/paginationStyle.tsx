import styled from "@emotion/styled/macro";
import { menuColor } from "../color/color";

const PaginationContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
  gap: 20px;
  width: 100%;
`;

const PaginationButton = styled.button`
  background-color: ${menuColor};
  width: 50px;
  height: 30px;
  border: none;
  align-items: center;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: gray;
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform 0.5s ease;
    z-index: 0;
  }

  &:hover::after {
    transform: scaleX(1);
  }

  span {
    position: relative;
    z-index: 1;
  }
`;

const PaginationText = styled.span`
  color: black;
`;

export { PaginationContainer, PaginationButton, PaginationText };
