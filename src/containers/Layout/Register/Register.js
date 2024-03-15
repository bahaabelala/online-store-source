import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { connect } from 'react-redux';
import * as actionCreators from './store/actions/actionCreators';
import { Helmet } from 'react-helmet';

import Aux from "../../../hoc/Auxiliary/Auxiliary";
import SignIn from "../../../components/register/SignIn/SignIn";
import SignUp from "../../../components/register/SignUp/SignUp";

class Register extends Component {

  componentDidMount() {
    if (!this.props.isOrdering && this.props.authRedirectPath !== '/') {
      this.props.onChangeAuthRedirectPath('/');
    }
  }

  registerHandler = (registerData, isSignUp) => {
    this.props.onRegister(registerData, isSignUp);
  }

  render() {
    // ^ Once authenticated the user is redirected to the authentication redirect path
    if (this.props.isAuthenticated) return <Navigate to={this.props.authRedirectPath} />

    return (
      <Aux>
        <Helmet>
          <title>Online Store | Register</title>
        </Helmet>

        <Routes>
          <Route path="signin" element={<SignIn onSignIn={this.registerHandler} />} />
          <Route path="signup" element={<SignUp onSignUp={this.registerHandler} />} />
        </Routes>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    authRedirectPath: state.register.authRedirectPath,
    isAuthenticated: state.register.token !== null,
    isOrdering: state.cart.ordering,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRegister: (data, isSignUp) => dispatch(actionCreators.register(data, isSignUp)),
    onChangeAuthRedirectPath: path =>
      dispatch(actionCreators.changeAuthRedirectPath(path)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
