import styled from "styled-components";
import RowCenter from "./RowCenter";

const RowSide = styled(RowCenter)`
  justify-content: ${(props) => (props.end ? "flex-end" : "flex-start")};
  width: auto;
`;

function getSpacing(props) {
  switch (props) {
    case props.spacedOut:
      return "space-between";

    default:
      return "center";
  }
}

export default RowSide;
