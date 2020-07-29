import styled from 'styled-components';

export const DateContainer = styled.div`
  background-color: #c4c4c4;
  border-radius: 12px 12px 0px 0px;
  padding: 1rem;
  text-align: center;
`;

export const LogBox = styled.div`
  background-color: #efefef;
  border-radius: 12px;
  width: 340px;

  @media (min-width: ${(props) => props.theme.breakpoints.small}) {
    width: 400px;
  }
`;
