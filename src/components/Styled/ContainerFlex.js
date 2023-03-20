import styled from "styled-components";
import Container from "./Container";

const ContainerFlex = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    width: 95%;
    padding: 0;
  }
`;

export default ContainerFlex;
