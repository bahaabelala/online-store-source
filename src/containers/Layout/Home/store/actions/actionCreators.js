import * as actionTypes from "./actionTypes";
import axios from "../../../../../axios/axios-products";

// > Loading action (for Slider and BestProducts comp.)
const load = () => {
  return {
    type: actionTypes.LOAD,
  };
};

// > Loading action (for OtherProducts comp.)
const loadOtherProducts = () => {
  return {
    type: actionTypes.LOAD_OTHER_PRODUCTS,
  };
};

const initializeHome = allProdData => {
  return {
    type: actionTypes.INITIALIZE_HOME,
    allProdData,
  };
};

// > Fetching Home products to render them
export const fetchProducts = page => {
  return dispatch => {
    (async () => {
      try {
        dispatch(loadOtherProducts());
        // ---------
        const response = await axios.get(`/?keyword=&pageNumber=${page}`),
          allProductsData = response.data;
        // ---------
        dispatch(initializeHome(allProductsData));
      } catch (error) {
        console.log(error);
      }
    })();
  };
};

const renderBestSellers = topProducts => {
  return {
    type: actionTypes.RENDER_BEST_SELLERS,
    topProducts,
  }
}

export const fetchTopProducts = () => {
  return dispatch => {
    (async () => {
      try {
        dispatch(load());
        // ---------
        const response = await axios.get(`/getTopProducts`),
          topProducts = response.data.data;
        // ---------
        dispatch(renderBestSellers(topProducts));
      } catch (error) {
        console.log(error);
      }
    })();
  };
}

export const slide = id => {
  return {
    type: actionTypes.SLIDE,
    slideItemID: id,
  };
};