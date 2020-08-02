import styled from 'styled-components';

const StyledInput = styled.input`
  background: none;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.brownBlack};
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  padding: 0.5rem;

  &:focus {
    border-width: 0 0 2px;
    outline: 0;
  }
`;

export default StyledInput;
