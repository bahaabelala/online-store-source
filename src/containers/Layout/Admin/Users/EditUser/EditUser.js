import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/actionCreators';
import withRouter from '../../../../../hoc/withRouter/withRouter';
import { Navigate } from 'react-router-dom';

import Aux from '../../../../../hoc/Auxiliary/Auxiliary';
import Loader from '../../../../../components/general/UI/Loader/Loader';
import SectionTitle from '../../../../../components/general/UI/SectionTitle/SectionTitle';
import EditUserForm from '../../../../../components/admin/users/EditUserForm/EditUserForm';

class EditUser extends Component {
    componentDidMount() {
        this.props.onRenderUserDetails(this.props.token, this.props.params.id);
    }

    // > Editing user process
    editUser = userData => {
        this.props.onEditUser(userData, this.props.token, this.props.params.id);
    }

    render() {
        if (this.props.loading) return <Loader />;

        // ^ Action after editing user
        if (this.props.isUserEdited) {
            alert('Edited successfully!');
            return <Navigate to={-1} />
        }

        if (this.props.userDetails) {
            return (
                <Aux>
                    <SectionTitle>Edit User</SectionTitle>
                    <EditUserForm
                        userDetails={this.props.userDetails}
                        userEdited={this.editUser} />
                </Aux>
            );
        }

        return null;

    }
};

const mapStateToProps = state => {
    return {
        token: state.register.token,
        userDetails: state.admin.userDetails,
        loading: state.admin.loading,
        isUserEdited: state.admin.isUserEdited,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRenderUserDetails: (token, userID) =>
            dispatch(actionCreators.fetchUserDetails(token, userID)),
        onEditUser: (userData, token, userID) =>
            dispatch(actionCreators.editUser(userData, token, userID)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditUser));