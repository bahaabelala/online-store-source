import * as actionTypes from './actions/actionTypes';

const initialState = {
    orderDetails: null,
    loading: false,
}

const load = (state, action) => {
    return {
        ...state,
        loading: true,
    }
}

const renderOrderDetails = (state, action) => {
    const actionOrderDetails = action.orderDetails;

    // ^ Parsing order shipping address
    const shippingAddressArr = [];
    let shippingAddressStr = '';
    for (const key in actionOrderDetails.shippingAddress) {
        shippingAddressArr.push(actionOrderDetails.shippingAddress[key]);
    }
    shippingAddressStr = shippingAddressArr.join(', ');

    const orderDetails = {
        user: actionOrderDetails.user,
        shippingAddress: shippingAddressStr,
        paymentMethod: actionOrderDetails.paymentMethod,
        taxPrice: `$${actionOrderDetails.taxPrice}`,
        shippingPrice: `$${actionOrderDetails.shippingPrice}`,
        totalPrice: `$${actionOrderDetails.totalPrice}`,
        itemsPrice: `$${actionOrderDetails.itemsPrice}`,
        orderItems: actionOrderDetails.orderItems,
        isPaid: actionOrderDetails.isPaid,
        isDelivered: actionOrderDetails.isDelivered,
    }

    return {
        ...state,
        orderDetails,
        loading: false,
    }
}

// > ###### REDUCER ######
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.RENDER_ORDER_DETAILS: return renderOrderDetails(state, action);
        case actionTypes.LOAD: return load(state, action);
        default: return state;
    }
}

export default reducer;