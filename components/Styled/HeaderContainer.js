import styled from "styled-components";

const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: 0.1fr 6fr;
  /* grid-template-rows: 0.3fr 1.7fr 1fr; */
  gap: 0px 0px;
  grid-template-areas:
    "top top "
    "left right";
`;

export default HeaderContainer;
