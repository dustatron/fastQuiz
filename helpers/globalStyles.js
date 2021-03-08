// globalStyles.js
import { createGlobalStyle } from "styled-components";
import colors from "./colors";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;600;700;900&display=swap');
  body {
    margin: 0;
    padding: 0;
    background: ${colors.white};
    font-family: 'Roboto', sans-serif;
  }

  a:link, a:visited, a:hover, a:active {
    color: ${colors.white};
    text-decoration: none;
  } 
`;

export default GlobalStyle;
