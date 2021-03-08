import styled from "styled-components";

const Title = styled.div`
  margin: auto;
  text-align: ${(props) => (props.justify ? props.justify : "center")};
  font-size: 24px;
  font-weight: 100;
`;

export default Title;
