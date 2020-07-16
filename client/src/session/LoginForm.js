import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import * as sessionActions from 'session/sessionRedux';

import {
  StyledInput,
  StyledLabel,
  StyledErrorMessage,
} from 'shared/StyledInput';
import Button from 'shared/Button';

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

class LoginForm extends React.Component {
  render() {
    return (
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string()
            .required('Required')
            .email('Please enter a valid email'),
        })}
        onSubmit={(values) => {
          this.props.login(values);
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
              type="submit"
              disabled={!touched.email || !touched.password || errors.email}
            >
              Log in
            </Button>
          </StyledForm>
        )}
      </Formik>
    );
  }
}

export default connect(null, sessionActions)(LoginForm);
