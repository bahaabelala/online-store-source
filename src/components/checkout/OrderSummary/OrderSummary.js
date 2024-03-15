import React, { useState, useEffect } from "react";
import classes from "./OrderSummary.module.css";
import { useNavigate } from "react-router-dom";

import Button from "../../general/UI/Button/Button";
import OrderItem from '../../admin/orders/OrderItem/OrderItem';
import Loader from '../../general/UI/Loader/Loader';

const OrderSummary = props => {
  const [orderSummary, setOrderSummary] = useState({
    shippingAddress: null,
    paymentMethod: "",
    orderItems: [],
    shippingPrice: 10,
    taxPrice: 53.99,
    itemsPrice: 0,
    totalPrice: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    // ^ Getting the payment method from (props)
    const paymentMethod = props.paymentData.paymentMethod;

    /*
      // ======== final product needed in the request body ========== 
      countInStock: 3
      image: "https://cf1.s3.souqcdn.com/item/2020/09/30/13/18/57/88/6/item_XL_131857886_52c5737bfc306.jpg"
      name: "Dell G3 15-3500 Gaming laptop"
      price: 1250
      product: "5ff1ad4f4d610d00046fb015"
      quantity: "1"
    */

    /*
      // ======== product from the cart ========== 
      brand: "Sony"
      category: "Electronics"
      countInStock: 11
      createdAt: "2021-01-02T17:19:12.111Z"
      description: "The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music"
      id: "5ff0ab103c529c2ba41341fd"
      image: "/images/playstation.jpg"
      name: "Sony Playstation 4 Pro White Version"
      numReviews: 1
      price: 399.99
      quantity: {elementType: "select",…}
      rating: 3
      updatedAt: "2021-01-02T18:26:30.353Z"
      user: "5fe47beb2dd77a4a94702a68"
      __v: 0
      _id: "5ff0ab103c529c2ba41341fd"
    */

    // ^ Parsing Order Items from cart products
    const orderItems = props.cartProducts.map(product => {
      return {
        countInStock: product.countInStock,
        image: product.image,
        name: product.name,
        price: product.price,
        product: product.id,
        quantity: product.quantity.value,
      }
    })

    // ^ Filling the state with the order summary data
    setOrderSummary(orderSummary => {
      return {
        ...orderSummary,
        shippingAddress: props.shippingData,
        paymentMethod: paymentMethod,
        orderItems,
        itemsPrice: props.totalCartItemsPrice,
        totalPrice:
          props.totalCartItemsPrice +
          orderSummary.shippingPrice +
          orderSummary.taxPrice,
      }
    });


    // ^ Redirect the user to the home page after placing his order successfully
    if (props.isOrdered) {
      alert('Your order is placed successfully!');
      props.unsetOrderedState();
      navigate('/');
    }
  }, [
    props.shippingData,
    props.paymentData,
    props.cartProducts,
    props.isOrdered,
  ]);

  // address: "Qalyubia - Egypt"
  // city: "toukh"
  // country: "Egypt"
  // postalCode: "13735"

  return (
    <section className={classes.OrderSummary}>
      <div className={classes.address}>
        <strong>Address:</strong>
        {props.shippingData.address},
        &nbsp;{props.shippingData.city},
        &nbsp;{props.shippingData.country},
        &nbsp;{props.shippingData.postalCode}
      </div>
      <div className={classes.paymentMethod}>
        <strong>Payment method:</strong> {orderSummary.paymentMethod}
      </div>
      <div className={classes.orderItemsContainer}>
        <h2>Order items:</h2>
        <div className={classes.orderItems}>
          {orderSummary.orderItems.map(
            item =>
              <OrderItem
                key={item.product}
                item={item}
                itemQuantity={parseInt(item.quantity, 10)} />)
          }
        </div>
      </div>
      <div className={classes.pricesSummary}>
        <strong>Items price:</strong> ${orderSummary.itemsPrice} <br />
        <strong>Shipping price:</strong> $10 <br />
        <strong>Tax price:</strong> $53.99 <br />
      </div>
      <div className={classes.totalPrice}>
        <strong>Total price: ${orderSummary.totalPrice}</strong>
      </div>
      <div className={classes.orderButtonContainer}>
        <Button fontWeight="700" fontSize="1.1rem" clicked={() => props.orderPlaced(orderSummary)}>
          PLACE ORDER
        </Button>
        <div className={classes.loaderContainer}>
          {props.loading ? <Loader size='small' /> : null}
        </div>
      </div>
    </section>
  );
};

export default OrderSummary;
