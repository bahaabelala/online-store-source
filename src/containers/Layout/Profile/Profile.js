import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from './store/actions/actionCreators';
import withRouter from '../../../hoc/withRouter/withRouter';
import { Helmet } from 'react-helmet';

import ProfileShow from '../../../components/profile/ProfileShow/ProfileShow';
import ProfileEdit from '../../../components/profile/ProfileEdit/ProfileEdit';
import Loader from '../../../components/general/UI/Loader/Loader';

class Profile extends Component {
    componentDidMount() {
        this.props.onRenderUserInfo(this.props.token);
    }

    editProfile = newProfileData => {
        this.props.onEditProfile(newProfileData, this.props.token);
        this.props.navigate('/profile/show');
    }

    render() {
        if (this.props.loading) return <Loader />;

        return (
            <React.Fragment>
                <Helmet>
                  <title>Online Store | Profile</title>
                </Helmet>

                <Routes>
                    <Route path='show' element={<ProfileShow
                        userInfo={this.props.userInfo}
                    />} />
                    <Route path='edit' element={<ProfileEdit
                        userInfo={this.props.userInfo}
                        editProfile={this.editProfile}
                    />} />
                </Routes>
            </React.Fragment>
        );
    }
};

const mapStateToProps = state => {
    return {
        token: state.register.token,
        userInfo: state.profile.userInfo,
        loading: state.profile.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRenderUserInfo: token => dispatch(actionCreators.fetchUserInfo(token)),
        onEditProfile: (newProfileData, token) => dispatch(actionCreators.sendNewProfileData(newProfileData, token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile));