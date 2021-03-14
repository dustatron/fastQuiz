import styled, { css } from "styled-components";
import colors from "../../helpers/colors";
const Button = styled.button`
  margin: ${(props) => (props.margin ? props.margin : "")};
  padding: ${(props) => (props.pad ? props.pad : "0.7em 2em")};
  font-weight: 500;
  font-size: 13px;
  color: ${(props) => (props.white ? colors.black : colors.white)};
  background: ${(props) => (props.white ? colors.white : colors.black)};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  filter: drop-shadow(2.5px 2.5px 0px #bdbdbd);
  &:active {
    filter: drop-shadow(1px 1px 0px #bdbdbd);
    transform: translateY(3px);
    transition: all 0.1s ease;
  }

  ${(props) =>
    props.width &&
    css`
      width: ${props.width};
    `}
`;

export default Button;
