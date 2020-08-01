// @flow

import * as React from "react";
import { Formik } from "formik";
import { LoginPage as TablerLoginPage } from "tabler-react";
import { useDispatch } from "react-redux";

import { attemptLogin, startLogin, startLoginProcess } from "../store/store";

type Props = {||};

const LoginPage = () => {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validate={values => {
        // same as above, but feel free to move this into a class method now.
        let errors = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        return errors;
      }}
      onSubmit={(
        values,
        { setSubmitting, setErrors /* setValues and other goodies */ }
      ) => {
        // Start Auth
        dispatch(attemptLogin(values.email, values.password));
      }}
      render={({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <TablerLoginPage
          onSubmit={handleSubmit}
          onChange={handleChange}
          onBlur={handleBlur}
          values={values}
          errors={errors}
          touched={touched}
        />
      )}
    />
  );
};

export default LoginPage;
