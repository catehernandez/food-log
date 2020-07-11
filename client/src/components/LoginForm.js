import React from 'react';
import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { StyledInput, StyledLabel } from 'components/StyledForm';
import Button from 'components/Button';

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 30vw;
`;

const LoginForm = () => {
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
          {errors.email && touched.email ? <div>{errors.email}</div> : null}
          <StyledLabel htmlFor="password">Password</StyledLabel>
          <Field as={StyledInput} name="password" type="password" />
          {errors.password && touched.password ? (
            <div>{errors.password}</div>
          ) : null}
          <Button>Log in</Button>
        </StyledForm>
      )}
    </Formik>
  );
};

export default LoginForm;
