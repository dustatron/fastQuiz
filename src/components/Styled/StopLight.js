import styled from "styled-components";

const StopLight = styled.div`
  color: ${(props) => (props.green ? "green" : 'red')};
  border-radius: 30px;
  background-color ${(props) => (props.green ? "green" : 'red')};
`;

export default StopLight;
