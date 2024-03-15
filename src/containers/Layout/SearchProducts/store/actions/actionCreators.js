import * as actionTypes from "./actionTypes";
import axios from "../../../../../axios/axios-products";

// > Storing search products in the store
const renderSearchProducts = (keyword, products) => {
  return {
    type: actionTypes.RENDER_SEARCH_PRODUCTS,
    searchKeyword: keyword,
    searchProducts: products,
  };
};

// > Loading (rendering slider component) action
const load = () => {
  return {
    type: actionTypes.LOAD,
  };
};

export const fetchSearchProducts = searchKeyword => {
  return dispatch => {
    (async () => {
      try {
        dispatch(load());

        // ^ Fetching the search products according to the keyword
        const response = await axios.get(
            `/?keyword=${searchKeyword}&pageNumber=1`
          ),
          products = response.data.data;

        dispatch(renderSearchProducts(searchKeyword, products));
      } catch (error) {
        alert("An error happened while searching for the products.");
      }
    })();
  };
};
