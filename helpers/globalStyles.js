// globalStyles.js
import { createGlobalStyle } from "styled-components";
import colors from "./colors";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: ${colors.white};
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }

  /* unvisited link */
a:link, a:visited, a:hover, a:active {
  color: ${colors.white};
  text-decoration: none;
} 
`;

export default GlobalStyle;
