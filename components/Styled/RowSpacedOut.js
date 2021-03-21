import styled from "styled-components";
import RowCenter from "./RowCenter";

const RowSpacedOut = styled(RowCenter)`
  justify-content: space-between;
  ${(props) => (props.top ? "align-items: flex-start;" : "")};
  ${(props) => (props.bottom ? "align-items: flex-end;" : "")};
  ${(props) => (props.center ? "align-items: center;" : "")};
  min-height: 50px;

  @media screen and (max-width: 768px) {
    ${(props) => props.md && `justify-content: ${props.md}`}
  }

  @media screen and (max-width: 480px) {
    ${(props) =>
      props.sm ? `justify-content: ${props.sm}` : "justify-content: center;"}
    margin: 2rem 0;
  }
`;

export default RowSpacedOut;
