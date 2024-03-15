import React, { useState } from 'react';
import classes from './ProfileEdit.module.css';

import SectionTitle from '../../general/UI/SectionTitle/SectionTitle';
import Form from '../../general/UI/Form/Form';

const ProfileEdit = props => {
    const [profileEditForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'New username',
            },
            value: props.userInfo.name,
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'New email',
            },
            value: props.userInfo.email,
        },
    });

    const processData = profileData => {
        props.editProfile(profileData);
    }

    return (
        <section className={classes.ProfileEdit}>
            <SectionTitle>Profile Editing</SectionTitle>
            <div className={classes.infoContainer}>
                <Form form={profileEditForm} buttonText='Update' dataProcessed={data => processData(data)} />
            </div>
        </section>
    );
}

export default ProfileEdit;