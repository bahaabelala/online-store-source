import axios from "axios";
import * as apis from '../APIs';

const instance = axios.create({
  baseURL: apis.productsUrl,
});

export default instance;
