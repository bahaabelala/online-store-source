import * as actionTypes from './actions/actionTypes';

const initialState = {
    userInfo: null,
    orders: [],
    loading: false,
}

const load = (state, action) => {
    return {
        ...state,
        loading: true,
    }
}

const renderUserInfo = (state, action) => {
    return {
        ...state,
        userInfo: action.userInfo,
        loading: false,
    }
}

const renderMyOrders = (state, action) => {
    return {
        ...state,
        orders: action.myOrders,
        loading: false,
    }
}

// > ####### REDUCER #######
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.RENDER_USER_INFO: return renderUserInfo(state, action);
        case actionTypes.RENDER_MY_ORDERS: return renderMyOrders(state, action);
        case actionTypes.LOAD: return load(state, action);
        default: return state;
    }
}

export default reducer;