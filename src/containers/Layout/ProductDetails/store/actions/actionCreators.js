import * as actionTypes from "./actionTypes";
import axios from "../../../../../axios/axios-products";

// > Loading (rendering slider component) action
const load = () => {
  return {
    type: actionTypes.LOAD,
  };
};

const renderProductDetails = product => {
  return {
    type: actionTypes.RENDER_PRODUCT_DETAILS,
    product: product,
  };
};

// > Fetching product to render its details
export const fetchProduct = productID => {
  return dispatch => {
    (async () => {
      try {
        dispatch(load());
        // ---------
        const response = await axios.get(`/${productID}`),
          product = response.data.data;
        // ---------
        dispatch(renderProductDetails(product));
      } catch (error) {
        console.log(error);
      }
    })();
  };
};

export const setQuantity = event => {
  return {
    type: actionTypes.SET_QUANTITY,
    event: event,
  };
};
