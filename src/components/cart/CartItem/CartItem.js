import React from 'react';
import PropTypes from 'prop-types';
import classes from './CartItem.module.css';

import { Card, ListGroup, Col } from 'react-bootstrap';
import Input from '../../general/UI/Input/Input';
import { Link } from 'react-router-dom';

import controllerImage from '../../../assets/images/Controller.jpg';

const CartItem = props => {
  return (
    <Col xs={12} sm={6} lg={4} xl={3}>
      <Card style={{ width: '100%', height: '100%' }}>
        <Card.Img variant="top" src={controllerImage} alt='Controller' />
        <Card.Body>
          <Card.Title>
            <Link to={`/product/${props.item.id}`} style={{ textDecoration: 'none' }}>{props.item.name}</Link>
          </Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>
            <span className='fw-bold'>Price:</span>&nbsp;&nbsp;
            ${props.item.price.toFixed(2)}
          </ListGroup.Item>
          <ListGroup.Item>
            <span className='fw-bold'>Quantity:</span>&nbsp;&nbsp;&nbsp;
            <Input
              elementType={props.item.quantity.elementType}
              elementConfig={props.item.quantity.elementConfig}
              name={props.item.quantity.value}
              value={props.item.quantity.value}
              changed={e => {
                props.updateProdQuantity(e, props.item);
              }}
            />
          </ListGroup.Item>
          <ListGroup.Item>
            <span className='fw-bold'>Total price:</span>&nbsp;&nbsp;
            ${(parseFloat(props.item.quantity.value) * props.item.price).toFixed(2)}
          </ListGroup.Item>
        </ListGroup>
        <Card.Body
          className={['text-center bg-danger', classes.deleteIconContainer].join(' ')}
          onClick={() => {
            props.removeItem(props.item.id);
          }}
        >
          <Card.Link style={{ textDecoration: 'none' }}>
            <i className="ri-delete-bin-line h3 text-white" title='Remove item'></i>
          </Card.Link>
        </Card.Body>
      </Card>
    </Col>
  );
}

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
  removeItem: PropTypes.func.isRequired
};

export default CartItem;