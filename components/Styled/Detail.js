import styled from "styled-components";
import colors from "../../helpers/colors";

const Detail = styled.div`
  font-size: 13px;
  padding: 5px;
  border-right: ${(props) =>
    props.borderR ? `1px solid ${colors.black}` : ""};
  text-align: center;
  font-weight: ${(props) => (props.lite ? "lighter" : "bold")};
  padding-top: ${(props) => (props.padTop ? props.padTop : "unset")};
  padding-bottom: ${(props) => (props.padBottom ? props.padBottom : "unset")};
`;

export default Detail;
