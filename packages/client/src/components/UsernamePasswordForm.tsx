import { Formik } from 'formik';
import React, { FC } from 'react';
import * as yup from 'yup';

const validationSchema = yup.object().shape({ username: yup.string().required(), password: yup.string().required() });

interface IProps {
  title: string;
  onSubmit: (values: { username: string; password: string }) => void;
}

const UsernamePassword: FC<IProps> = ({ title, onSubmit }) => {
  return (
    <div className="container">
      <h3>{title}</h3>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(false);
          onSubmit(values);
        }}
      >
        {({ handleSubmit, handleChange, values, errors, touched, handleBlur, isSubmitting }) => {
          return (
            <form onSubmit={handleSubmit} className="form">
              <label className="label" htmlFor="username">
                Username:
              </label>
              <input
                id="username"
                type="text"
                name="username"
                onChange={handleChange}
                value={values.username}
                onBlur={handleBlur}
                className="input"
              />
              <span className="error">{errors.username && touched.username && errors.username}</span>
              <label className="label" htmlFor="password">
                Password:
              </label>
              <input
                id="password"
                type="password"
                name="password"
                onChange={handleChange}
                value={values.password}
                onBlur={handleBlur}
                className="input"
              />
              <span className="error">{errors.password && touched.password && errors.password}</span>
              <button className="button" type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default UsernamePassword;
