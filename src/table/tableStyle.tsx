import styled from "@emotion/styled/macro";
import { menuColor } from "../color/color";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.td<{ head?: boolean }>`
  border: 1px solid ${menuColor};
  padding: 10px;
  text-align: center;
  font-weight: ${(props) => (props.head ? "bold" : "none")};
  color: ${(props) => (props.head ? "white" : menuColor)};
`;

export { Table, TableHead };
