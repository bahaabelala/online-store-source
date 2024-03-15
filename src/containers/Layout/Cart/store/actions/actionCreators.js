import * as actionTypes from "./actionTypes";
import axios from "../../../../../axios/axios-products";

// > Loading (rendering slider component) action
const load = () => {
  return {
    type: actionTypes.LOAD,
  };
};

// > Rendering cart products
export const renderCartProducts = () => {
  return {
    type: actionTypes.RENDER_CART_PRODUCTS,
  };
};

const storeCurrentProduct = (product, quantity) => {
  return {
    type: actionTypes.STORE_CURRENT_PRODUCT,
    product,
    quantity,
  }
}

export const fetchCurrentProduct = (productID, productQuantity) => {
  return dispatch => {
    
    // ^ Fetching the current product from the server with its id
    (async () => {
      try {
        dispatch(load());

        const response = await axios.get(`/${productID}`),
          currentProduct = response.data.data;

        // ^ Setting the state with the new added product
        dispatch(storeCurrentProduct(currentProduct, productQuantity));

        // ^ Rendering cart products with the new product
        dispatch(renderCartProducts());
      } catch (error) {
        console.log(error);
      }
    })();
    
  };
};

// > clear all cart products ACTION
export const clearCart = () => {
  return {
    type: actionTypes.CLEAR_CART,
  };
};

// > Remove one chosen product ACTION
export const removeProduct = productID => {
  return {
    type: actionTypes.REMOVE_PRODUCT,
    productID,
  };
};

// > Update quantity of a chosen product ACTION
export const updateProductQuantity = (event, targetProduct) => {
  return {
    type: actionTypes.UPDATE_PRODUCT_QUANTITY,
    targetProduct,
    event,
  };
};

// > Changing ordering state to ordering
export const setOrderingState = () => {
  return {
    type: actionTypes.SET_ORDERING_STATE,
  }
}

// > Changing ordering state to NOT ordering
export const unsetOrderingState = () => {
  return {
    type: actionTypes.UNSET_ORDERING_STATE,
  }
}