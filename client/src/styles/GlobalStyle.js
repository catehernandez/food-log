import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    font-size: 16px; 
    height: 100%;
    margin: 0;
    overflow-x: hidden;
  }
  body{
    font-family: ${({ theme }) => theme.fontFamily.Quicksand};
  }
`;

export default GlobalStyle;
