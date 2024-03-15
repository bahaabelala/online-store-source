import * as actionTypes from './actionTypes';
import usersAxios from '../../../../../axios/axios-users';
import ordersAxios from '../../../../../axios/axios-orders';

const load = () => {
    return {
        type: actionTypes.LOAD,
    }
}

const renderUserInfo = userInfo => {
    return {
        type: actionTypes.RENDER_USER_INFO,
        userInfo,
    }
}

const renderMyOrders = myOrders => {
    return {
        type: actionTypes.RENDER_MY_ORDERS,
        myOrders,
    }
}

const fetchUserInfo = token => {
    return dispatch => {
        (async () => {
            dispatch(load());

            const response = await usersAxios.get('/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
                userInfo = response.data.user;

            dispatch(renderUserInfo(userInfo));
        })();
    }
}

const sendNewProfileData = (newProfileData, token) => {
    return dispatch => {
        (async () => {
            dispatch(load());

            const response = await usersAxios.put('/updateMe', newProfileData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
                userInfo = response.data.data;

            dispatch(renderUserInfo(userInfo));
        })();
    }
}

const fetchMyOrders = token => {
    return dispatch => {
        (async () => {
            dispatch(load());

            const response = await ordersAxios.get('/myOrders', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
                myOrders = response.data.data;

            dispatch(renderMyOrders(myOrders));
        })();
    }
}

export {
    fetchUserInfo,
    sendNewProfileData,
    fetchMyOrders,
}