import styled from "styled-components";
import RowCenter from "./RowCenter";

const RowSide = styled(RowCenter)`
  justify-content: ${(props) => {
    if (props.end) { return "flex-end" }
    if (props.between) { return "space-between" }
    return "flex-start"
  }};
  width: auto;
  padding: 15px;

  @media screen and (max-width: 768px) {
    width: 95%;
    padding: 10px;

    ${(props) =>
    props.sm
      ? `justify-content: ${props.sm}`
      : `justify-content: space-between;`}
  }
`;

export default RowSide;
