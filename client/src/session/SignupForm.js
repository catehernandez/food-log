import React from 'react';
import { connect } from 'react-redux';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import Button from 'shared/Button';
import InputErrorMessage from 'shared/InputErrorMessage';
import StyledFormikForm from './styles/StyledFormikForm';
import StyledInput from 'shared/StyledInput';
import TextInputLabel from 'shared/TextInputLabel';
import * as sessionActions from 'session/sessionRedux';

const SignupForm = (props) => {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object({
        email: Yup.string()
          .required('Required')
          .email('Please enter a valid email'),
        password: Yup.string()
          .required('Required')
          .min(8, 'Password must be at least 8 characters')
          .max(35, 'Password must be less than 35 characters'),
      })}
      onSubmit={(values) => {
        props.signup(values);
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

          <Button
            type="submit"
            disabled={!values.email || !values.password || errors.email}
          >
            Sign up
          </Button>
        </StyledFormikForm>
      )}
    </Formik>
  );
};

export default connect(null, sessionActions)(SignupForm);
