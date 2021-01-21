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
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
      overflow-y: hidden;
    }
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
    -webkit-tap-highlight-color:#ccc;
  } 
`;

export default GlobalStyle;
