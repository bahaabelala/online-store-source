import * as actionTypes from './actions/actionTypes';

const initialState = {
    shipping: null,
    payment: null,
    orderDetails: null,
    isOrdered: false,
    loading: false,
}

// > LOADING...
const load = (state, action) => {
    return {
        ...state,
        loading: true,
    }
}

// > RECORDING SHIPPING DATA
const setShippingData = (state, action) => {
    // ^ Recording shipping data in the local storage
    localStorage.setItem("shipping", JSON.stringify(action.data));

    return {
        ...state,
        shipping: action.data,
        loading: false,
    }
}

// > RECORDING PAYMENT DATA
const setPaymentData = (state, action) => {
    // ^ Recording payment data in the local storage
    localStorage.setItem("payment", JSON.stringify(action.data));

    return {
        ...state,
        payment: action.data,
    }
}

// > Storing the response of placing the order
const setOrderDetails = (state, action) => {
    return {
        ...state,
        orderDetails: action.orderDetails,
        isOrdered: true,
        loading: false,
    }
}

// > Unset (isOrdered) state after finishing the placement of the order and informing user
// > (Paving for user's new incoming orders)
const unsetOrderedState = (state, action) => {
    // ^ Clearing the local storage...
    localStorage.removeItem('payment');
    localStorage.removeItem('shipping');
    localStorage.removeItem('cartProducts');
    localStorage.removeItem('__paypal_storage__');

    return {
        ...state,
        shipping: null,
        payment: null,
        isOrdered: false,
    }
}

// > ==== REDUCER ====
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_SHIPPING_DATA:
            return setShippingData(state, action);

        case actionTypes.SET_PAYMENT_DATA:
            return setPaymentData(state, action);

        case actionTypes.SET_ORDER_DETAILS:
            return setOrderDetails(state, action);

        case actionTypes.UNSET_ORDERED_STATE:
            return unsetOrderedState(state, action);

        case actionTypes.LOAD:
            return load(state, action);

        default:
            return state;
    }
}

export default reducer;