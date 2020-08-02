import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import * as sessionActions from 'session/sessionRedux';

import InputErrorMessage from 'shared/InputErrorMessage';
import LoginButton from './LoginButton';
import StyledInput from 'shared/StyledInput';

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  margin: 0 0 1rem;
  width: 80%;

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    width: 70%;
  }
`;

const mapStateToProps = (state) => ({
  errors: state.session.errors,
});

const LoginForm = (props) => {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object({
        email: Yup.string()
          .required('Required')
          .email('Please enter a valid email'),
        password: Yup.string().required('Required'),
      })}
      onSubmit={(values) => {
        props.login(values);
      }}
    >
      {({ errors, values }) => (
        <StyledForm>
          <Field
            as={StyledInput}
            name="email"
            placeholder="Email"
            type="email"
          />
          <ErrorMessage component={InputErrorMessage} name="email" />
          <Field
            as={StyledInput}
            name="password"
            placeholder="Password"
            type="password"
          />
          <ErrorMessage component={InputErrorMessage} name="password" />
          {props.errors === 401 ? (
            <InputErrorMessage>Invalid username or password</InputErrorMessage>
          ) : (
            ''
          )}
          <LoginButton
            type="submit"
            disabled={!values.email || !values.password || errors.email}
          >
            Log in
          </LoginButton>
        </StyledForm>
      )}
    </Formik>
  );
};

export default connect(mapStateToProps, sessionActions)(LoginForm);
