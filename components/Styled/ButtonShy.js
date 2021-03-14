import styled, { css } from "styled-components";
import colors from "../../helpers/colors";

const ButtonShy = styled.button`
  border: none;
  background: none;
  font-size: ${(props) => (props.size ? props.size : "16px")};
  cursor: pointer;
  margin: ${(props) => (props.margin ? props.margin : "unset")};

  ${(props) =>
    props.active &&
    css`
      font-weight: 700;
    `}

  ${(props) =>
    props.white &&
    css`
      color: ${colors.white};
    `}
`;

export default ButtonShy;
