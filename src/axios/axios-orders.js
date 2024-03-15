import axios from 'axios';
import * as apis from '../APIs';

const instance = axios.create({
    baseURL: apis.ordersUrl,
});

export default instance; 