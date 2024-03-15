import React, { useEffect } from 'react';
import classes from './PayPal.module.css';
import { useNavigate } from 'react-router-dom';

const PayPal = props => {
    const navigate = useNavigate();

    useEffect(() => {
        window.paypal.Buttons({
            createOrder: (data, actions) => {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: props.totalPrice // ^ Cart items total price
                        }
                    }]
                });
            },
            onApprove: (data, actions) => {
                return actions.order.capture().then((orderData) => {
                    if (orderData.status === "COMPLETED") {
                        alert('Successfully Paid!');

                        // ^ Navigate to payment component to continue ordering...
                        navigate("/checkout/ordersummary");
                    }
                });
            }
        }).render('#paypal-button-container');
    }, [])

    return (
        <div className={classes.PayPal}>
            <div id='paypal-button-container'></div>
        </div>
    )
}

export default PayPal;

/*
create_time: "2022-07-13T22:25:52Z"
id: "3CV307384E453244F"
intent: "CAPTURE"
links: [{…}]
payer: {email_address: 'sb-pl2hd18780463@personal.example.com', payer_id: 'URFX6CN9P9JNN', address: {…}, name: {…}}
purchase_units: [{…}]
status: "COMPLETED"
update_time: "2022-07-13T22:26:45Z"
*/