import styled from "@emotion/styled/macro";
import { menuColor } from "../color/color";

const DropDownMenu = styled.select`
  width: 250px;
  height: 40px;
  background-color: ${menuColor};
  border: none;
  margin-bottom: 25px;
  padding: 10px;
  boxing-size: border-box;
  font-weight: 550;
  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background: ${menuColor};
  }

  ::-webkit-scrollbar-thumb {
    background-color: black;
    border-radius: 20px;
  }
  &:hover {
    filter: brightness(115%);
  }
  select option:hover {
    background-color: red;
  }
`;

const DropDownOptions = styled.option`
  color: black;
  font-weight: 550;
`;

const DropDownContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 50px;
  width: 100%;
`;

export { DropDownMenu, DropDownOptions, DropDownContainer };
