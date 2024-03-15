import React, { Component } from "react";
import classes from "./Checkout.module.css";
import { Route, Routes, Link } from "react-router-dom";
import withRouter from "../../../hoc/withRouter/withRouter";
import { connect } from "react-redux";
import * as actionCreators from "./store/actions/actionCreators";
import { unsetOrderingState } from "../Cart/store/actions/actionCreators";
import { Helmet } from 'react-helmet';

import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Shipping from "../../../components/checkout/Shipping/Shipping";
import Payment from "../../../components/checkout/Payment/Payment";
import OrderSummary from "../../../components/checkout/OrderSummary/OrderSummary";

class Checkout extends Component {
  componentDidMount() {
    this.props.onUnsetOrderingState();
  }

  render() {
    // ^ Defining progress items classes
    const progressItemsClasses = {
      shipping: [classes.progressItem],
      payment: [classes.progressItem],
      ordersummary: [classes.progressItem],
    };

    // ^ Control navigation items by changing their states between 'active', 'disabled', or none of them
    const urlPath = this.props.location.pathname.split("/"),
      urlPathEndpoint = urlPath[urlPath.length - 1];
    let activePassed = false;

    for (const progressItem in progressItemsClasses) {
      if (progressItem === urlPathEndpoint) {
        progressItemsClasses[progressItem] = [
          classes.progressItem,
          classes.active,
        ];
        activePassed = true;
      } else if (activePassed) {
        progressItemsClasses[progressItem] = [
          classes.progressItem,
          classes.disabled,
        ];
      } else {
        progressItemsClasses[progressItem] = [classes.progressItem];
      }
    }

    return (
      <Aux>
        <Helmet>
          <title>Online Store | Checkout</title>
        </Helmet>
        
        <div className={classes.checkoutProgressHead}>
          <span className={progressItemsClasses.shipping.join(" ")}>
            <Link to="/checkout/shipping">Shipping</Link>
          </span>
          <span className={progressItemsClasses.payment.join(" ")}>
            <Link to="/checkout/payment">Payment Method</Link>
          </span>
          <span className={progressItemsClasses.ordersummary.join(" ")}>
            <Link to="/checkout/ordersummary">Order Summary</Link>
          </span>
        </div>

        <Routes>
          <Route path="shipping" element={
            <Shipping storeData={data => this.props.onSetShippingData(data)} />
          } />
          <Route path="payment" element={
            <Payment
              storeData={data => this.props.onSetPaymentData(data)}
              cartItemsPrice={this.props.cartItemsPrice} />
          } />
          <Route path="ordersummary" element={
            <OrderSummary
              shippingData={this.props.shipping}
              paymentData={this.props.payment}
              cartProducts={this.props.cartItems}
              totalCartItemsPrice={this.props.cartItemsPrice}
              orderPlaced={
                (orderData) => {
                  this.props.onPlaceOrder(orderData, this.props.token)
                }
              }
              isOrdered={this.props.isOrdered}
              unsetOrderedState={this.props.onUnsetOrderedState}
              loading={this.props.loading} />
          } />
        </Routes>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartItems: state.cart.products,
    cartItemsPrice: state.cart.totalPrice,
    shipping: state.checkout.shipping,
    payment: state.checkout.payment,
    isOrdered: state.checkout.isOrdered,
    loading: state.checkout.loading,
    token: state.register.token,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUnsetOrderingState: () => dispatch(unsetOrderingState()),
    onSetShippingData: data => dispatch(actionCreators.setShippingData(data)),
    onSetPaymentData: data => dispatch(actionCreators.setPaymentData(data)),
    onPlaceOrder: (data, token) => dispatch(actionCreators.placeOrder(data, token)),
    onUnsetOrderedState: () => dispatch(actionCreators.unsetOrderedState()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Checkout));
