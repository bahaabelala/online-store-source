import * as actionTypes from './actionTypes';
import ordersAxios from '../../../../../axios/axios-orders';
import usersAxios from '../../../../../axios/axios-users';
import productsAxios from '../../../../../axios/axios-products';

const load = () => {
    return {
        type: actionTypes.LOAD,
    }
}

// > ################# Orders ##################

const renderOrders = ordersData => {
    return {
        type: actionTypes.RENDER_ORDERS,
        ordersData,
    }
}

const fetchOrders = (token, page) => {
    return dispatch => {
        (async () => {
            dispatch(load());

            // ^ Fetching orders using their API
            const response = await ordersAxios.get(`?pageNumber=${page}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
                ordersData = response.data;

            dispatch(renderOrders(ordersData));
        })();
    }
}

// > ################# Users ##################

const renderUsers = usersData => {
    return {
        type: actionTypes.RENDER_USERS,
        usersData,
    }
}

const fetchUsers = (token, page) => {
    return dispatch => {
        (async () => {
            dispatch(load());

            // ^ Fetching users using their API
            const response = await usersAxios.get(`/?pageNumber=${page}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
                usersData = response.data;

            dispatch(renderUsers(usersData));
        })();
    }
}

const renderUserDetails = userDetails => {
    return {
        type: actionTypes.RENDER_USER_DETAILS,
        userDetails,
    }
}

const fetchUserDetails = (token, id) => {
    return dispatch => {
        (async () => {
            dispatch(load());

            // ^ Fetching user details using users API
            const response = await usersAxios.get(`/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
                userDetails = response.data.data;

            dispatch(renderUserDetails(userDetails));
        })();
    }
}

const emptyUserDetails = () => {
    return {
        type: actionTypes.EMPTY_USER_DETAILS,
    }
}

const editUser = (data, token, id) => {
    return dispatch => {
        (async () => {
            dispatch(load());

            // ^ Sending patch request to modify user details users API
            await usersAxios.patch(`/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            dispatch(emptyUserDetails());
        })();
    }
}

const considerDeletedUser = deletedUser => {
    return {
        type: actionTypes.CONSIDER_DELETED_USER,
        deletedUser,
    }
}

const deleteUser = (token, id) => {
    return dispatch => {
        (async () => {
            dispatch(load());

            // ^ Fetching users using their API
            const response = await usersAxios.delete(`/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
                deletedUser = response.data.data;

            dispatch(considerDeletedUser(deletedUser));
        })();
    }
}

const unsetUserEditedState = () => {
    return {
        type: actionTypes.UNSET_USER_EDITED_STATE,
    }
}

const unsetUserDeletedState = () => {
    return {
        type: actionTypes.UNSET_USER_DELETED_STATE,
    }
}

// > ################# Products ##################

const renderProducts = (sliderProducts, nonSliderProductsData) => {
    return {
        type: actionTypes.RENDER_PRODUCTS,
        sliderProducts,
        nonSliderProductsData,
    }
}

const fetchProducts = page => {
    return dispatch => {
        (async () => {
            dispatch(load());

            // ^ Fetching slider products
            const sliderResponse = await productsAxios.get("/getTopProducts"),
                sliderProducts = sliderResponse.data.data;

            // ^ Fetching products other than slider products
            const nonSliderResponse = await productsAxios.get(`/?keyword=&pageNumber=${page}`),
                nonSliderProductsData = nonSliderResponse.data;

            dispatch(renderProducts(sliderProducts, nonSliderProductsData));
        })();
    }
}

const renderProductDetails = productDetails => {
    return {
        type: actionTypes.RENDER_ADMIN_PRODUCT_DETAILS,
        details: productDetails,
    }
}

const fetchProductDetails = id => {
    return dispatch => {
        (async () => {
            dispatch(load());

            // ^ Fetching product details by its id
            const response = await productsAxios.get(`/${id}`),
                productDetails = response.data.data;

            dispatch(renderProductDetails(productDetails));
        })();
    }
}

const setProductEditedState = newProductDetails => {
    return {
        type: actionTypes.SET_PRODUCT_EDITED_STATE,
        newProductDetails,
    }
}

const unsetProductEditedState = () => {
    return {
        type: actionTypes.UNSET_PRODUCT_EDITED_STATE,
    }
}

const updateProduct = (product, token, id) => {
    return dispatch => {
        (async () => {
            dispatch(load());

            // ^ Sending PATCH request 
            const response = await productsAxios.patch(`/${id}`, product, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
                newProductDetails = response.data.data;

            dispatch(setProductEditedState(newProductDetails));
        })();
    }
}

const setProductAddedState = addedProductDetails => {
    return {
        type: actionTypes.SET_PRODUCT_ADDED_STATE,
        addedProductDetails,
    }
}

const unsetProductAddedState = () => {
    return {
        type: actionTypes.UNSET_PRODUCT_ADDED_STATE,
    }
}

const addProduct = (product, token, userID) => {
    return dispatch => {
        (async () => {
            /* 
            {
                "name":"Sample Name",
                "price":0,
                "image":"/images/sample.png",
                "brand":"Sample Brand",
                "category":"Sample Category",
                "countInStock":0,
                "description":"Sample description"
                !!!!!!
                "user":"5ff1b0d84d610d00046fb016",
                "numReviews":0,
            }
            */

            // ^ Making the request body
            // ^ Adding user (user id) and numReviews in the request body
            const requestBody = {
                ...product,
                user: userID,
                numReviews: 0,
            };

            dispatch(load());

            // ^ Sending POST request 
            const response = await productsAxios.post('', requestBody, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
                addedProductDetails = response.data.data;

            dispatch(setProductAddedState(addedProductDetails));
        })();
    }
}

const considerDeletedProduct = deletedProduct => {
    return {
        type: actionTypes.CONSIDER_DELETED_PRODUCT,
        deletedProduct,
    } 
}

const deleteProduct = (token, productID) => {
    return dispatch => {
        (async () => {
            dispatch(load());

            // Sending DELETE Request
            const response = await productsAxios.delete(`/${productID}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }),
                deletedProduct = response.data.data;

            dispatch(considerDeletedProduct(deletedProduct));
        })();
    }
}

export {
    fetchOrders,
    fetchUsers,
    fetchUserDetails,
    editUser,
    deleteUser,
    unsetUserEditedState,
    unsetUserDeletedState,
    fetchProducts,
    fetchProductDetails,
    updateProduct,
    unsetProductEditedState,
    addProduct,
    deleteProduct,
    unsetProductAddedState,
}