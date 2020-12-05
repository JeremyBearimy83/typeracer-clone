import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap');
html {
    scroll-behavior: smooth;
  }
  
  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-family: 'Nunito', sans-serif;
  }
  
  body {
    background-color: #FFF ;
    color: #29304A;
    overflow-x: hidden;
  }
  
  a:link,
  a:visited {
    color: inherit;
    text-decoration: none;
  }
  
  ul {
    list-style: none;
  }
  
  textarea {
    resize: none;
  }
  
  input,
  textarea {
    border: none;
  }
  
  input:focus,
  textarea:focus {
    outline: none;
  }
  
  button {
    border: none;
    cursor: pointer;
  }
  
  button:focus {
    outline: none;
  }
`;

export default GlobalStyle;
