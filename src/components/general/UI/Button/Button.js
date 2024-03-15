import React from "react";
import classes from "./Button.module.css";

const Button = props => {
  const outStyles = {
    fontWeight: props.fontWeight,
    padding: props.padding,
    fontSize: props.fontSize,
    backgroundColor: props.backgroundColor,
  };

  return (
    <button
      type="submit"
      className={classes.Button}
      style={outStyles}
      onClick={props.clicked}
    >
      {props.children}
    </button>
  );
};

export default Button;
