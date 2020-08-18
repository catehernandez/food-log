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
    overflow-y: hidden;
  }

  body {
    color: ${({ theme }) => theme.colors.darkBrown};
    font-family: ${({ theme }) => theme.fontFamily.Quicksand};
    font-weight: ${({ theme }) => theme.fontWeights.light};
  }
  
  input, button{
    color: inherit;
    font-family: inherit;
    font-weight: ${({ theme }) => theme.fontWeights.regular};
  } 
`;

export default GlobalStyle;
