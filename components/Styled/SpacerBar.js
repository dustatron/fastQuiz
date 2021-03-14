import styled from "styled-components";
import colors from "../../helpers/colors";
const Section = styled.div`
  margin: ${(props) => (props.margin ? props.margin : "2rem auto")};
  width: ${(props) => (props.width ? props.width : "100%")};
  padding: 2px;
  height: 2px;
  background: ${colors.black};
`;

export default Section;
