import React, { useState } from "react";
import classes from "./SignUp.module.css";
import { Link } from "react-router-dom";

import SectionTitle from "../../general/UI/SectionTitle/SectionTitle";
import Form from "../../general/UI/Form/Form";

const SignUp = props => {
  const [signUpForm] = useState({
    username: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Enter your name",
      },
      value: "",
    },
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
    passwordConfirm: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Confirm your password",
      },
      value: "",
    },
  });

  return (
    <section className={classes.SignUp}>
      <SectionTitle>Sign up</SectionTitle>
      <Form
        form={signUpForm}
        buttonText="Sign up"
        dataProcessed={signUpData => props.onSignUp(signUpData, true)}
      >
        <p className={classes.existedCustomer}>
          Already a customer? &nbsp;<Link to="/register/signin">Sign in</Link>
        </p>
      </Form>
    </section>
  );
};

export default SignUp;
