import styled from "styled-components";

const Right = styled.div`
  grid-area: right;
  @media screen and (max-width: 768px) {
    grid-area: unset;
    width: 100%;
    padding: 0;
  }
`;

export default Right;
