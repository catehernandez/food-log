import React from 'react';
import { useFormik } from 'formik';

import { Form, Input, Label } from 'components/Form';
import Button from 'components/Button';

const LoginForm = () => {
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Label htmlFor="email">Email</Label>
      <Input
        name="email"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      <Label htmlFor="password">Password</Label>
      <Input
        name="password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      <Button>Log in</Button>
    </Form>
  );
};

export default LoginForm;
