import styled, { css } from "styled-components";
import colors from "../../helpers/colors";

const Card = styled.div`
  margin: 1em auto;
  padding: ${(props) => (props.pad ? props.pad : " 2rem 2rem")};
  text-align: ${(props) => (props.textLeft ? "left" : "right")};
  color: ${(props) => (props.lite ? colors.black : colors.white)};
  background: ${(props) => (props.lite ? colors.gray : colors.black)};
  border-radius: 6px;
  border: ${(props) => (props.lite ? `1px solid ${colors.black}` : "none")};

  ${(props) =>
    props.height &&
    css`
      min-height: ${props.height};
    `}

  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 1rem 1rem;
    /* margin: 1rem 0; */
  }

  .react-switch {
    vertical-align: middle;
    margin-left: 4px;
  }
`;

export default Card;
