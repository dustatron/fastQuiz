import styled from "styled-components";
import colors from "../../helpers/colors";

const Tab = styled.div`
  display: grid;
  place-items: center;
  color: ${colors.white};
  background: ${(props) => (props.active ? colors.black : colors.darkGray)};
  width: 75px;
  height: 50px;
  border-radius: 6px 0 0 6px;
  padding-left: 5px;
  margin: 2px 0;
  border: 1px solid ${colors.black};
  cursor: pointer;
`;

export default Tab;
