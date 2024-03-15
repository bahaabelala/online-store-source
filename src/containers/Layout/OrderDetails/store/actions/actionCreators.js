import * as actionTypes from './actionTypes';
import ordersAxios from '../../../../../axios/axios-orders';

const load = () => {
    return {
        type: actionTypes.LOAD,
    }
}

const renderOrderDetails = orderDetails => {
    return {
        type: actionTypes.RENDER_ORDER_DETAILS,
        orderDetails,
    }
}

const fetchOrderDetails = (id, token) => {
    return dispatch => {
        (async () => {
            dispatch(load());

            // ^ Fetching the order with its ID
            const response = await ordersAxios.get(`/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
                orderDetails = response.data.data;

            // ^ Store the order details
            dispatch(renderOrderDetails(orderDetails))
        })();
    }
}

const makeDelivered = (id, token) => {
    return dispatch => {
        (async () => {
            dispatch(load());

            // ^ Making the order delivered
            await ordersAxios.get(`/${id}/deliver`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // ^ Fetching the order with its ID after making it delivered
            const response = await ordersAxios.get(`/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
                orderDetails = response.data.data;

            // ^ Store the order details
            dispatch(renderOrderDetails(orderDetails))
        })();
    }
}

export {
    fetchOrderDetails,
    makeDelivered,
}