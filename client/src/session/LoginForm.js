import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import * as sessionActions from 'session/sessionRedux';

import { StyledInput, StyledErrorMessage } from 'shared/StyledInput';
import Button from 'shared/Button';

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  margin: 1.5rem;
  width: 80%;

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    width: 70%;
  }
`;

const mapStateToProps = (state) => ({
  errors: state.session.errors,
});

class LoginForm extends React.Component {
  render() {
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
          this.props.login(values);
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
            <ErrorMessage component={StyledErrorMessage} name="email" />
            <Field
              as={StyledInput}
              name="password"
              placeholder="Password"
              type="password"
            />
            <ErrorMessage component={StyledErrorMessage} name="password" />
            {this.props.errors === 401 ? (
              <StyledErrorMessage>
                Invalid username or password
              </StyledErrorMessage>
            ) : (
              ''
            )}
            <Button
              type="submit"
              disabled={!values.email || !values.password || errors.email}
            >
              Log in
            </Button>
          </StyledForm>
        )}
      </Formik>
    );
  }
}

export default connect(mapStateToProps, sessionActions)(LoginForm);
