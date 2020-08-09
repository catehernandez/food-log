import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    background-color: ${({ theme }) => theme.colors.lightestBeige};
    font-size: 16px; 
    height: 100%;
    margin: 0;
    overflow-x: hidden;
  }
  body, input, button {
    color: ${({ theme }) => theme.colors.brownBlack};
    font-family: ${({ theme }) => theme.fontFamily.Quicksand};
  }
`;

export default GlobalStyle;
