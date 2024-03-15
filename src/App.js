import React, { Component } from "react";
import classes from "./App.module.css";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "./containers/Layout/Register/store/actions/actionCreators";

import Layout from "./containers/Layout/Layout";

class App extends Component {
  state = {
    headerScrolled: false,
  };

  componentDidMount() {
    this.props.onCheckAuthState();
  }

  //TODO(for Header Comp.): Changing the header when scrolling
  headerScrolledHandler = e => {
    let headerScrolled = false;
    if (e.target.scrollTop > 100) {
      headerScrolled = true;
    } else if (e.target.scrollTop < 50) {
      headerScrolled = false;
    } else {
      return;
    }

    this.setState({ headerScrolled: headerScrolled });
  };

  render() {
    return (
      <Router basename='/online-store'>
        <div className={classes.App} onScroll={this.headerScrolledHandler}>
          <Layout headerScrolled={this.state.headerScrolled} />
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCheckAuthState: () => dispatch(actionCreators.checkAuthState()),
  };
};

export default connect(null, mapDispatchToProps)(App);
