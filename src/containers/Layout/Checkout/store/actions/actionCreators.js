import * as actionTypes from './actionTypes';
import ordersAxios from '../../../../../axios/axios-orders';

const load = () => {
    return {
        type: actionTypes.LOAD,
    }
}

const setShippingData = data => {
    return {
        type: actionTypes.SET_SHIPPING_DATA,
        data,
    }
}

const setPaymentData = data => {
    return {
        type: actionTypes.SET_PAYMENT_DATA,
        data,
    }
}

const setOrderDetails = orderDetails => {
    return {
        type: actionTypes.SET_ORDER_DETAILS,
        orderDetails,
    }
}

const placeOrder = (data, token) => {
    return dispatch => {
        (async () => {
            try {
                // ^ Loading...
                dispatch(load());

                // ^ Sending the order
                const response = await ordersAxios.post('', data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                dispatch(setOrderDetails(response.data));
            } catch (error) {
                console.log(error);
            }
        })();
    }
}

const unsetOrderedState = () => {
    return {
        type: actionTypes.UNSET_ORDERED_STATE,
    }
}

export {
    setShippingData,
    setPaymentData,
    placeOrder,
    unsetOrderedState,
}

/*
createdAt: "2022-07-14T22:02:48.941Z"
isDelivered: false
isPaid: false
itemsPrice: 765
orderItems: [{_id: "62d0928841a54e0004f4065d", product: "5ff1acce4d610d00046fb014", quantity: 1}]
paymentMethod: "PayPal"
shippingAddress: {address: "Qalyubia - Egypt", city: "toukh", postalCode: "13735", country: "Egypt"}
shippingPrice: 10
taxPrice: 114.75
totalPrice: 889.75
updatedAt: "2022-07-14T22:02:48.941Z"
user: "62c2e1fb8b9ab50004b1d3c5"
__v: 0
_id: "62d0928841a54e0004f4065c"
*/