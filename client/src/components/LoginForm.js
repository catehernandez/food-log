import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Form, Input, Label } from 'components/Form';
import Button from 'components/Button';

const LoginForm = () => {
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().required('Required'),
    }),
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
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      {formik.touched.email && formik.errors.email ? (
        <div>{formik.errors.email}</div>
      ) : null}
      <Button>Log in</Button>
    </Form>
  );
};

export default LoginForm;
