import styled from 'styled-components';

const Button = styled.button`
  background-color: #efefef;
  border: 1px solid ${({ theme }) => theme.colors.brownBlack};
  border-radius: 4px;
  cursor: pointer;
  display: inline-block;
  font: 1rem ${({ theme }) => theme.fontFamily.Quicksand};
  letter-spacing: 0.3px;
  padding: 0.5rem 1.5rem;
  text-align: center;
  text-decoration: none;
  text-transform: capitalize;
  width: max-content;
`;

export default Button;
