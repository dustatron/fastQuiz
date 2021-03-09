import styled from "styled-components";

const Title = styled.div`
  margin: ${(props) => (props.left ? "unset" : "center")};
  text-align: ${(props) => (props.justify ? props.justify : "center")};
  font-size: 24px;
  font-weight: 100;
`;

export default Title;
