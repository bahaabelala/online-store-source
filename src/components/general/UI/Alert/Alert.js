import React from "react";
import classes from "./Alert.module.css";

const Alert = props => {
  return <div className={classes.Alert}>{props.children}</div>;
};

export default Alert;
