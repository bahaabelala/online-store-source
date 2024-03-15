import React from 'react';
import classes from './OrderItem.module.css';
import PropTypes from 'prop-types';

// !
import controllerImage from '../../../../assets/images/Controller.jpg';

const OrderItem = props => {
    return (
        <div className={classes.OrderItem}>
            <div className={classes.imageContainer}>
                <img
                    src={controllerImage}
                    alt={props.item.name} />
            </div>
            <div className={classes.nameContainer}>
                <h5 className={classes.name}>
                    {props.item.name}
                </h5>
                <h4 className={classes.price}>
                    ${props.item.price}
                </h4>
                <h3 className={classes.quantity}>
                    {props.itemQuantity}
                </h3>
            </div>
        </div>
    )
}

OrderItem.propTypes = {
    item: PropTypes.object.isRequired,
    itemQuantity: PropTypes.number.isRequired,
}

export default OrderItem;
