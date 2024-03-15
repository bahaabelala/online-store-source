import React, { Component } from "react";
import classes from "./Users.module.css";
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/actionCreators';
import withRouter from '../../../../hoc/withRouter/withRouter';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';

import User from "../../../../components/admin/users/User/User";
import SectionTitle from "../../../../components/general/UI/SectionTitle/SectionTitle";
import Loader from '../../../../components/general/UI/Loader/Loader';
import Pagination from '../../../../components/general/UI/Pagination/Pagination';

class Users extends Component {
  componentDidMount() {
    this.props.onRenderUsers(this.props.token, this.props.params.page);
    this.props.onUnsetUserEditedState();
    this.props.onUnsetUserDeletedState();
  }

  deleteUser = (userID, userName) => {
    const deleteConfirmation = window.confirm(`Are you sure, you want to delete "${userName}"?!`);

    if (deleteConfirmation) {
      this.props.onDeleteUser(this.props.token, userID);
    }
  }

  render() {
    // ^ Classifying Users (between ADMINs and NORMAL_USERs)
    const admins = [], normalUsers = [];
    this.props.users.forEach(user => {
      if (user.role === 'admin') {
        admins.push(user);
      } else {
        normalUsers.push(user);
      }
    });

    // ^ If it is still loading, render the Loader Comp.
    if (this.props.loading) return <Loader />;

    // ^ After deleting-user action
    if (this.props.isUserDeleted) alert('Deleted successfully!');

    console.log(admins);

    if (this.props.users.length !== 0) {
      return (
        <Aux>
          <section className={classes.Users}>
            <div className={classes.adminsSide}>
              <SectionTitle>Admins</SectionTitle>
              {admins.map(user => this.props.userID !== user._id ?
                <User
                  key={user._id}
                  user={user}
                  userDeleted={this.deleteUser} />
                : null
              )}
            </div>
            <div className={classes.usersSide}>
              <SectionTitle>Users</SectionTitle>
              {normalUsers.map(user =>
                <User key={user._id} user={user} userDeleted={this.deleteUser} />
              )}
            </div>
          </section>
          <Pagination
            totalPages={this.props.totalPages}
            activePage={this.props.activePage}
            changePage={page => { this.props.navigate(`/admin/users_list/${page}`) }} />
        </Aux>
      );
    }

    return null;

  }
}

const mapStateToProps = state => {
  return {
    token: state.register.token,
    loading: state.admin.loading,
    users: state.admin.users,
    isUserDeleted: state.admin.isUserDeleted,
    userID: state.register.userID,
    totalPages: state.admin.usersTotalPages,
    activePage: state.admin.usersActivePage,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRenderUsers: (token, pageNum) =>
      dispatch(actionCreators.fetchUsers(token, pageNum)),
    onDeleteUser: (token, userID) =>
      dispatch(actionCreators.deleteUser(token, userID)),
    onUnsetUserEditedState: () =>
      dispatch(actionCreators.unsetUserEditedState()),
    onUnsetUserDeletedState: () =>
      dispatch(actionCreators.unsetUserDeletedState()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Users));
