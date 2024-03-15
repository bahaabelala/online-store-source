import React from 'react';
import classes from './ProfileShow.module.css';
import { useNavigate, Link } from 'react-router-dom';

import Button from '../../general/UI/Button/Button';
import SectionTitle from '../../general/UI/SectionTitle/SectionTitle';
import Alert from '../../general/UI/Alert/Alert';

const ProfileShow = props => {
    const navigate = useNavigate();

    return (
        <section className={classes.ProfileShow}>
            <Alert>
                <Link to='/myOrders'>Go to your orders ▶</Link>
            </Alert>
            <SectionTitle>Profile</SectionTitle>
            <div className={classes.infoContainer}>
                <h1 className={classes.username}>{props.userInfo.name}</h1>
                <h4 className={classes.email}>{props.userInfo.email}</h4>
                <Button
                    fontSize='1.1rem'
                    fontWeight='500'
                    padding='10px 15px'
                    clicked={() => navigate('/profile/edit')} >
                    Edit Profile
                </Button>
            </div>
        </section>
    );
}

export default ProfileShow;