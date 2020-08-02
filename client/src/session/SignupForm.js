import React from 'react';
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import Button from 'shared/Button';
import InputErrorMessage from 'shared/InputErrorMessage';
import StyledInput from 'shared/StyledInput';

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
          <Field as={StyledInput} name="email" />
          <ErrorMessage component={InputErrorMessage} name="email" />
          <Field as={StyledInput} name="password" type="password" />
          <ErrorMessage component={InputErrorMessage} name="password" />
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
