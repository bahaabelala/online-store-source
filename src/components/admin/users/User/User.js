import React from "react";
import classes from "./User.module.css";
import { useNavigate } from 'react-router-dom';

import userImg from "../../../../assets/images/user.png";

const User = props => {
  const navigate = useNavigate();

  return (
    <div className={classes.User} onClick={props.clicked}>
      <div className={classes.imageContainer}>
        <img
          src={userImg}
          alt={props.user.name}
          className={classes.userImage}
        />
      </div>
      <div className={classes.detailsContainer}>
        <h1 className={classes.username}>{props.user.name}</h1>
        <p className={classes.email}>{props.user.email}</p>
        <p className={classes.userID}>{props.user._id}</p>
      </div>
      <div className={classes.optionsContainer}>
        <i
          className={["ri-delete-bin-line", classes.deleteIcon].join(' ')}
          title='Remove user'
          onClick={() => {
            props.userDeleted(props.user._id, props.user.name);
          }}
        ></i>
        <i
          className={["ri-edit-box-line", classes.editIcon].join(' ')}
          title='Edit user'
          onClick={() => {
            navigate(`/admin/users_list/user/${props.user._id}`);
          }}
        ></i>
      </div>
    </div>
  );
};

export default User;
