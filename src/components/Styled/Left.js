import styled from "styled-components";

const Left = styled.div`
  grid-area: left;
  display: flex;
  justify-content: flex-end;
  align-content: flex-start;
  flex-wrap: wrap;
  padding-top: 50px;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-end;
    margin-top: 20px;
    padding: 0;
    width: 100%;
  }
`;

export default Left;
