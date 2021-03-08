import styled from "styled-components";

const Item = styled.div`
  margin: 0 5px;
  font-weight: ${(props) => (props.active ? 700 : 100)};
`;

export default Item;
