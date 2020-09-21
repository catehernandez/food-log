import styled from 'styled-components';

const StyledInput = styled.input`
  background: none;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkBrown};
  border-radius: 0px; /* Ensure the corners of the bottom border aren't rounded */
  font-size: 1rem;
  line-height: inherit;
  padding: 0.25rem 0.5rem 0.5rem;

  &:focus {
    border-width: 0 0 2px;
    outline: 0;
  }

  &::placeholder {
    color: inherit;
  }
`;

export default StyledInput;
