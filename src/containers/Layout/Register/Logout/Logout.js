import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions/actionCreators";

class Logout extends Component {
  componentDidMount() {
    this.props.onLogout();
  }

  render() {
    return <Navigate to="/" />;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actionCreators.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
