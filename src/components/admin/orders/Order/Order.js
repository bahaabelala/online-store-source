import React from "react";
import classes from "./Order.module.css";
import PropTypes from 'prop-types';

import { Col } from 'react-bootstrap';

const Order = props => {

  /*
    "2022-03-16T10:37:43.003Z"
    --->  "2022-03-16"
    --->  ["2022", "03", "16"]
    --->  ["16", "03", "2022"]
    --->  "16/03/2022"
  */
  const createdAt = props.creationTime
    .slice(0, 10)
    .split('-')
    .reverse()
    .join('/');

  return (
    <Col xs={12} sm={6} md={4} lg={3}>
      <div className={classes.Order} onClick={props.clicked}>
        <small className={classes.id}>{props.id}</small>
        <h2 className={classes.date}>{createdAt}</h2>
      </div>
    </Col>
  );
};

Order.propTypes = {
  id: PropTypes.string.isRequired,
  creationTime: PropTypes.string.isRequired,
}

export default Order;
