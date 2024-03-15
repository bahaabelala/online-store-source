import React, { useState } from "react";
import classes from "./SignIn.module.css";
import { Link } from "react-router-dom";

import SectionTitle from "../../general/UI/SectionTitle/SectionTitle";
import Form from "../../general/UI/Form/Form";

const SignIn = props => {
  const [signInForm] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Enter your email",
      },
      value: "",
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Enter your password",
      },
      value: "",
    },
  });

  return (
    <section className={classes.SignIn}>
      <SectionTitle>Sign in</SectionTitle>
      <Form
        form={signInForm}
        buttonText="Sign in"
        dataProcessed={signInData => props.onSignIn(signInData, false)}
      >
        <p className={classes.newCustomer}>
          New customer? &nbsp;<Link to="/register/signup">Sign up</Link>
        </p>
      </Form>
    </section>
  );
};

export default SignIn;
