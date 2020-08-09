import styled from 'styled-components';

const Button = styled.button`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.lightestBeige};
  border: 1px solid ${({ theme }) => theme.colors.brownBlack};
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  font-size: 1rem;
  justify-content: center;
  letter-spacing: 0.3px;
  padding: 0.5rem 1.5rem;
  text-align: center;
  text-decoration: none;
  text-transform: capitalize;
  width: max-content;
`;

export default Button;
