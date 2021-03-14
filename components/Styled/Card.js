import styled, { css } from "styled-components";
import colors from "../../helpers/colors";

const Card = styled.div`
  margin: 1em auto;
  padding: 2rem 2rem;
  text-align: right;
  color: ${(props) => (props.lite ? colors.black : colors.white)};
  background: ${(props) => (props.lite ? colors.gray : colors.black)};
  border-radius: 6px;
  border: ${(props) => (props.lite ? `1px solid ${colors.black}` : "none")};

  ${(props) =>
    props.height &&
    css`
      min-height: ${props.height};
    `}
`;

export default Card;
