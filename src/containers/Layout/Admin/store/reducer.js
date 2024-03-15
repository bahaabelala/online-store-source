import * as actionTypes from './actions/actionTypes';

const initialState = {
    orders: [],
    ordersTotalPages: 1,
    ordersActivePage: 1,
    users: [],
    usersActivePage: 1,
    usersTotalPages: 1,
    userDetails: null,
    isUserEdited: false,
    isUserDeleted: false,
    products: {
        sliderProducts: [],
        bestSellers: [],
        otherProducts: [],
    },
    prodActivePage: 1,
    prodTotalPages: 1,
    productDetails: null,
    isProductEdited: false,
    isProductAdded: false,
    loading: false,
}

const load = (state, action) => {
    return {
        ...state,
        loading: true,
    }
}

const renderOrders = (state, action) => {
    return {
        ...state,
        orders: action.ordersData.data,
        ordersTotalPages: action.ordersData.pages,
        ordersActivePage: action.ordersData.page,
        loading: false,
    }
}

const renderUsers = (state, action) => {
    return {
        ...state,
        users: action.usersData.data,
        usersActivePage: action.usersData.page,
        usersTotalPages: action.usersData.pages,
        loading: false,
    }
}

const renderUserDetails = (state, action) => {
    return {
        ...state,
        userDetails: action.userDetails,
        loading: false,
    }
}

const considerDeletedUser = (state, action) => {
    const deletedUserID = action.deletedUser._id;
    const users = [...state.users];

    // ^ Deleting the user from the state users
    const remainingUsers = users.filter(user => {
        return user._id !== deletedUserID;
    })

    return {
        ...state,
        users: remainingUsers,
        isUserDeleted: true,
        loading: false,
    }
}

const emptyUserDetails = (state, action) => {
    return {
        ...state,
        userDetails: null,
        isUserEdited: true,
        loading: false,
    }
}

const unsetUserEditedState = (state, action) => {
    return {
        ...state,
        isUserEdited: false,
    }
}

const unsetUserDeletedState = (state, action) => {
    return {
        ...state,
        isUserDeleted: false,
    }
}

const renderProducts = (state, action) => {
    return {
        ...state,
        products: {
            ...state.products,
            sliderProducts: action.sliderProducts,
            bestSellers: action.sliderProducts,
            otherProducts: action.nonSliderProductsData.data,
        },
        prodTotalPages: action.nonSliderProductsData.pages,
        prodActivePage: action.nonSliderProductsData.page,
        loading: false,
    }
}

const renderAdminProductDetails = (state, action) => {
    console.log(action.details);

    return {
        ...state,
        productDetails: action.details,
        loading: false,
    }
}

const setProductEditedState = (state, action) => {
    return {
        ...state,
        isProductEdited: true,
        productDetails: action.newProductDetails,
        loading: false,
    }
}

const unsetProductEditedState = (state, action) => {
    return {
        ...state,
        isProductEdited: false,
    }
}

const considerDeletedProduct = (state, action) => {
    const deletedProductID = action.deletedProduct.id;
    const products = {
        sliderProducts: [ ...state.products.sliderProducts ],
        bestSellers: [ ...state.products.bestSellers ],
        newArrivals: [ ...state.products.newArrivals ],
        otherProducts: [ ...state.products.otherProducts ],
    }

    const remainingSliderProducts = products.sliderProducts.filter(prod => {
        return prod.id !== deletedProductID;
    }),
    remainingBestSellers = products.bestSellers.filter(prod => {
        return prod.id !== deletedProductID;
    }),
    remainingNewArrivals = products.newArrivals.filter(prod => {
        return prod.id !== deletedProductID;
    }),
    remainingOtherProducts = products.otherProducts.filter(prod => {
        return prod.id !== deletedProductID;
    });

    return {
        ...state,
        products: {
            ...state.products,
            sliderProducts: remainingSliderProducts,
            bestSellers: remainingBestSellers,
            newArrivals: remainingNewArrivals,
            otherProducts: remainingOtherProducts,
        },
        loading: false,
    }
}

const setProductAddedState = (state, action) => {
    return {
        ...state,
        isProductAdded: true,
        productDetails: action.addedProductDetails,
        loading: false,
    }
}

const unsetProductAddedState = (state, action) => {
    return {
        ...state,
        isProductAdded: false,
    }
}

// > ###### reducer ######
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.RENDER_ORDERS: return renderOrders(state, action);

        case actionTypes.RENDER_USERS: return renderUsers(state, action);
        case actionTypes.RENDER_USER_DETAILS: return renderUserDetails(state, action);
        case actionTypes.CONSIDER_DELETED_USER: return considerDeletedUser(state, action);
        case actionTypes.EMPTY_USER_DETAILS: return emptyUserDetails(state, action);
        case actionTypes.UNSET_USER_EDITED_STATE: return unsetUserEditedState(state, action);
        case actionTypes.UNSET_USER_DELETED_STATE: return unsetUserDeletedState(state, action);

        case actionTypes.RENDER_PRODUCTS: return renderProducts(state, action);
        case actionTypes.RENDER_ADMIN_PRODUCT_DETAILS: return renderAdminProductDetails(state, action);
        case actionTypes.SET_PRODUCT_EDITED_STATE: return setProductEditedState(state, action);
        case actionTypes.UNSET_PRODUCT_EDITED_STATE: return unsetProductEditedState(state, action);
        case actionTypes.CONSIDER_DELETED_PRODUCT: return considerDeletedProduct(state, action);
        case actionTypes.SET_PRODUCT_ADDED_STATE: return setProductAddedState(state, action);
        case actionTypes.UNSET_PRODUCT_ADDED_STATE: return unsetProductAddedState(state, action);

        case actionTypes.LOAD: return load(state, action);

        default: return state;
    }
}

export default reducer;