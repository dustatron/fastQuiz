import styled from "styled-components";

const Container = styled.div`
  display: flex;
  margin: auto;
  width: 85%;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  @media screen and (max-width: 768px) {
    width: 95%;
    padding: 0;
  }
`;

export default Container;
