import React from "react";
import { Link } from "react-router-dom";
import classes from "./Product.module.css";
import PropTypes from "prop-types";

import { Card, Col, Row } from 'react-bootstrap';

import controller from "../../../../assets/images/Controller.jpg";

const Product = props => {
  return props.class === 'BestProduct' ? (
      <Col xs={12} lg={6}>
        <Card className={classes.Product} style={{ height: '100%' }}>
          <Row className='g-0'>
            <Col sm={4}>
              <Link to={`/product/${props.productID}`}>
                <Card.Img variant="top" src={controller} alt={props.title} className='img-fluid rounded-start' />
              </Link>
            </Col>            
            <Col sm={8}>
              <Card.Body>
                <Card.Title className={['text-primary', classes.ProductTitle].join(' ')}>
                  <Link
                    to={`/product/${props.productID}`}
                    style={{ textDecoration: 'none' }}
                    >
                    {props.title}
                  </Link>
                </Card.Title>
                <Card.Text>{`${props.details.slice(0, 120)}...`}</Card.Text>
                <Card.Text>${props.price}</Card.Text>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </Col>
    ) : (
      <Col xs={12} sm={6} md={4} lg={3}>
        <Card className={['text-center', classes.Product].join(' ')} style={{ height: '100%' }}>
          <Link to={`/product/${props.productID}`}>
            <Card.Img variant="top" src={controller} alt={props.title} />
          </Link>
          <Card.Body>
            <Card.Title className={['text-primary', classes.ProductTitle].join(' ')}>
              <Link
                to={`/product/${props.productID}`}
                style={{ textDecoration: 'none' }}
                >
                {props.title}
              </Link>
            </Card.Title>
            <Card.Text>${props.price}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">
              Availability: <span className='text-primary fw-semibold'>{props.countInStock}</span> In Stock
            </small>
          </Card.Footer>
        </Card>
      </Col>
    );
};

Product.propTypes = {
  productID: PropTypes.string.isRequired,
  // class: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  countInStock: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};

export default Product;



  // return (
  //   <div className={classes[props.class]}>
  //     <div className={classes.productImage}>
  //       <Link to={`/product/${props.productID}`}>
  //         <img src={controller} alt={props.title} />
  //       </Link>
  //     </div>
  //     <div className={classes.productInfo}>
  //       <Link to={`/product/${props.productID}`}>
  //         <h3 className={classes.title}>{props.title} </h3>
  //       </Link>
  //       <p className={classes.details}>{props.details}</p>
  //       <p className={classes.price}>${props.price}</p>
  //       <p className={classes.availability}>
  //         Availability: <strong>{props.countInStock}</strong> In Stock
  //       </p>
  //     </div>
  //   </div>
  // );