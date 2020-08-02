import styled from 'styled-components';

const Button = styled.button`
  align-items: center;
  background-color: #efefef;
  border: 1px solid ${({ theme }) => theme.colors.brownBlack};
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  font: 1rem ${({ theme }) => theme.fontFamily.Quicksand};
  justify-content: center;
  letter-spacing: 0.3px;
  padding: 0.5rem 1.5rem;
  text-align: center;
  text-decoration: none;
`;

export default Button;
