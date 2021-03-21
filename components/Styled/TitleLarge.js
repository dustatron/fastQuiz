import styled from "styled-components";
import Title from "./Title";
import colors from "../../helpers/colors";

const TitleLarge = styled(Title)`
  font-size: 64px;
  padding-top: ${(props) => (props.padTop ? props.padTop : "unset")};
  padding-bottom: ${(props) => (props.padBottom ? props.padBottom : "unset")};
  color: ${(props) => (props.dark ? colors.black : colors.white)};

  @media screen and (max-width: 768px) {
    font-size: 40px;
    width: 100%;
  }
`;

export default TitleLarge;
