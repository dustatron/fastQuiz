import styled from "styled-components";
import RowCenter from "./RowCenter";

const RowSpacedOut = styled(RowCenter)`
  justify-content: space-between;
  ${(props) => (props.top ? "align-items: flex-start;" : "")};
  ${(props) => (props.bottom ? "align-items: flex-end;" : "")};
  ${(props) => (props.center ? "align-items: center;" : "")};
  min-height: 50px;
`;

function getSpacing(props) {
  switch (props) {
    case props.spacedOut:
      return "space-between";

    default:
      return "center";
  }
}

export default RowSpacedOut;
