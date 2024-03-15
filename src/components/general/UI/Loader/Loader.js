import React from "react";
import classes from "./Loader.module.css";
import PropTypes from "prop-types";

const Loader = props => {
  const loaderContStyle =
      props.size === "small"
        ? {
            width: "40px",
            height: "40px",
          }
        : {
            width: "80px",
            height: "80px",
          },
    loaderStyle =
      props.size === "small"
        ? {
            borderWidth: "20px",
          }
        : {
            borderWidth: "40px",
          };

  return (
    <div className={classes.loaderContainer} style={loaderContStyle}>
      <span className={classes.loader} style={loaderStyle}></span>
    </div>
  );
};

Loader.propTypes = {
  size: PropTypes.string,
};

export default Loader;
