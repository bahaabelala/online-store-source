import axios from "axios";
import * as apis from '../APIs';

const instance = axios.create({
  baseURL: apis.usersUrl,
});
// https://amh-store.herokuapp.com/api/v1/users/updateMe
export default instance;
