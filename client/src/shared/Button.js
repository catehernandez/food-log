import styled, { css } from 'styled-components';

const Button = styled.button`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.lightestBeige};
  border: 1px solid ${({ theme }) => theme.colors.darkBrown};
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

  ${(props) =>
    props.disabled &&
    css`
      border-color: ${(props) => props.theme.colors.darkBrown30};
      color: ${(props) => props.theme.colors.darkBrown60};
      cursor: auto;
    `}
`;

export default Button;
