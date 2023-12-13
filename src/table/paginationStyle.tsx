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
`;

const PaginationText = styled.span`
  color: black;
`;

export { PaginationContainer, PaginationButton, PaginationText };
