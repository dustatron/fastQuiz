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

  &:disabled {
    background: ${colors.gray};
    color: ${colors.black};
    opacity: 0.3;
    cursor: not-allowed;
  }

  ${(props) =>
    props.width &&
    css`
      width: ${props.width};
    `}
  ${(props) =>
    props.active &&
    css`
      font-weight: 900;
      background: linear-gradient(90.81deg, #f56565 0%, #ed64a6 100%);
      filter: drop-shadow(2.5px 2.5px 0px #cc3e82);
    `}

    @media screen and (max-width: 768px) {
    ${(props) => props.mdWidth && `width: ${props.mdWidth}`}
  }
`;

export default Button;
