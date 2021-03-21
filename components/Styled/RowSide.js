import styled from "styled-components";
import RowCenter from "./RowCenter";

const RowSide = styled(RowCenter)`
  justify-content: ${(props) => (props.end ? "flex-end" : "flex-start")};
  width: auto;

  @media screen and (max-width: 768px) {
    width: 95%;
    padding: 0;

    ${(props) =>
      props.sm
        ? `justify-content: ${props.sm}`
        : `justify-content: space-between;`}
  }
`;

export default RowSide;
