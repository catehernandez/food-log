import { Form } from 'formik';
import styled from 'styled-components';

const StyledFormikForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 80%;

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    width: 70%;
  }
`;

export default StyledFormikForm;
