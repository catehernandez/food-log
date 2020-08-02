import React from 'react';
import { connect } from 'react-redux';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import * as sessionActions from 'session/sessionRedux';

import InputErrorMessage from 'shared/InputErrorMessage';
import LoginButton from './styles/LoginButton';
import StyledFormikForm from './styles/StyledFormikForm';
import StyledInput from 'shared/StyledInput';
import TextInputLabel from 'shared/TextInputLabel';

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
      {({ errors, touched, values }) => (
        <StyledFormikForm>
          <TextInputLabel htmlFor="email" invisible={!values.email}>
            Email
          </TextInputLabel>
          <Field
            as={StyledInput}
            name="email"
            placeholder="Email"
            type="email"
          />
          <InputErrorMessage>
            {touched.email && errors.email ? errors.email : <pre></pre>}
          </InputErrorMessage>
          <TextInputLabel htmlFor="password" invisible={!values.password}>
            Password
          </TextInputLabel>
          <Field
            as={StyledInput}
            name="password"
            placeholder="Password"
            type="password"
          />
          <InputErrorMessage>
            {touched.password && errors.password ? (
              errors.password
            ) : (
              <pre></pre>
            )}
          </InputErrorMessage>
          <LoginButton
            type="submit"
            disabled={!values.email || !values.password || errors.email}
          >
            Log in
          </LoginButton>
        </StyledFormikForm>
      )}
    </Formik>
  );
};

export default connect(null, sessionActions)(LoginForm);
