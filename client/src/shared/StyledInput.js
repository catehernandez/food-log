import styled from 'styled-components';

const StyledInput = styled.input`
  background: none;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.brownBlack};
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  margin: 1rem 0 0.5rem;
  padding: 0.5rem;

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.brownBlack};
    border-radius: 4px;
    outline: 0;
  }
`;

export default StyledInput;
