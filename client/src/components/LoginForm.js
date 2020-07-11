import React from 'react';
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import {
  StyledInput,
  StyledLabel,
  StyledErrorMessage,
} from 'components/StyledInput';
import Button from 'components/Button';

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const LoginForm = () => {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object({
        email: Yup.string()
          .required('Required')
          .email('Please enter a valid email'),
      })}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <StyledForm>
          <StyledLabel htmlFor="email">Email</StyledLabel>
          <Field as={StyledInput} name="email" />
          <ErrorMessage component={StyledErrorMessage} name="email" />
          <StyledLabel htmlFor="password">Password</StyledLabel>
          <Field as={StyledInput} name="password" type="password" />
          <Button
            disabled={!touched.email || !touched.password || errors.email}
          >
            Log in
          </Button>
        </StyledForm>
      )}
    </Formik>
  );
};

export default LoginForm;
