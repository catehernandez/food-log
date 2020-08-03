import { Form } from 'formik';
import Button from 'shared/Button';
import styled from 'styled-components';

const StyledFormikForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 80%;

  ${Button} {
    margin: 1rem auto 0.5rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    width: 70%;
  }
`;

export default StyledFormikForm;
