import React, { Component } from "react";
import classes from "./OrderDetails.module.css";
import { connect } from 'react-redux';
import * as actionCreators from './store/actions/actionCreators';
import withRouter from '../../../hoc/withRouter/withRouter';
import { Helmet } from 'react-helmet';

import OrderItem from '../../../components/admin/orders/OrderItem/OrderItem';
import Loader from '../../../components/general/UI/Loader/Loader';
import Button from '../../../components/general/UI/Button/Button';
import Alert from '../../../components/general/UI/Alert/Alert';
import { Link } from 'react-router-dom';

class OrderDetails extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.orderDetails !== this.props.orderDetails
            || nextProps.loading !== this.props.loading
        );
    }

    componentDidMount() {
        this.props.onRenderOrderDetails(this.props.params.id, this.props.token)
    }

    buttonClicked = (callingComponent, isDelivered) => {
        // ^ Checking IF this order is opened from in between the admin orders
        // ^ OR from in between the current user's orders  
        if (callingComponent === 'myOrders' || isDelivered) {
            this.props.navigate(-1);
        } else {
            this.props.onMakeDelivered(this.props.params.id, this.props.token);
        }
    }

    render() {
        if (this.props.loading) return <Loader />;

        if (this.props.orderDetails) {
            const orderDetails = this.props.orderDetails;

            // ^ If the order's user was deleted by an admin
            if (!orderDetails.user) {
                return (
                    <Alert>
                        This order's user was deleted!&nbsp;
                        <Link to='/admin/orders_list/1'>Go back to orders</Link>
                    </Alert>
                );
            }

            const urlArr = this.props.location.pathname.split('/'),
                callingComponent = urlArr[urlArr.length - 2];

            return (
                <section className={classes.OrderDetails}>
                    <Helmet>
                        <title>Online Store | Order Details</title>
                    </Helmet>

                    <div>
                        <div className={classes.orderInfo}>
                            <span>
                                <strong>Name:</strong> {orderDetails.user.name}
                            </span>
                            <span>
                                <strong>Email:</strong> {orderDetails.user.email}
                            </span>
                        </div>
                        <div className={classes.orderInfo}>
                            <span>
                                <strong>Address:</strong> {orderDetails.shippingAddress}
                            </span>
                            <span>
                                <strong>Payment method:</strong> {orderDetails.paymentMethod}
                            </span>
                        </div>
                        <div className={classes.orderItemsContainer}>
                            <h2>Order items:</h2>
                            <div className={classes.orderItems}>
                                {
                                    orderDetails.orderItems.map(item => {
                                        if (!item.product) return null;

                                        return <OrderItem
                                            key={item._id} item={item.product} itemQuantity={item.quantity} />;
                                    })
                                }
                            </div>
                        </div>
                        <div className={[classes.orderInfo, classes.prices].join(' ')}>
                            <span>
                                <strong>Items price:</strong> {orderDetails.itemsPrice}
                            </span>
                            <span>
                                <strong>Payment price:</strong> {orderDetails.shippingPrice}
                            </span>
                            <span>
                                <strong>Tax price:</strong> {orderDetails.taxPrice}
                            </span>
                            <span>
                                <strong>Total price: {orderDetails.totalPrice}</strong>
                            </span>
                        </div>
                        <div className={classes.additional}>
                            <Button
                                fontWeight="700"
                                fontSize="1.1rem"
                                clicked={() => { this.buttonClicked(callingComponent, orderDetails.isDelivered) }}>
                                {
                                    callingComponent === 'myOrders'
                                        ? 'Go back'
                                        : orderDetails.isDelivered
                                            ? 'Go back'
                                            : 'Make delivered'
                                }
                            </Button>
                        </div>
                    </div>
                </section >
            )
        }

        return null;

    }
}

const mapStateToProps = state => {
    return {
        token: state.register.token,
        orderDetails: state.orderDetails.orderDetails,
        loading: state.orderDetails.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRenderOrderDetails: (id, token) => dispatch(actionCreators.fetchOrderDetails(id, token)),
        onMakeDelivered: (id, token) => dispatch(actionCreators.makeDelivered(id, token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OrderDetails));
