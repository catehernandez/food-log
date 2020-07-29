import React from 'react';
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import {
  StyledInput,
  StyledLabel,
  StyledErrorMessage,
} from 'shared/StyledInput';
import Button from 'shared/Button';

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 45%;
`;

const SignupForm = () => {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object({
        email: Yup.string().required('Required').email('Please enter an email'),
        password: Yup.string()
          .required('Required')
          .min(8, 'Password must be at least 8 characters')
          .max(35, 'Password must be less than 35 characters'),
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
          <ErrorMessage component={StyledErrorMessage} name="password" />
          <Button
            disabled={
              !touched.email ||
              !touched.password ||
              errors.email ||
              errors.password
            }
          >
            Sign up
          </Button>
        </StyledForm>
      )}
    </Formik>
  );
};

export default SignupForm;
