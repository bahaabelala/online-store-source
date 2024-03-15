import * as actionTypes from "./actions/actionTypes";

const initialState = {
  searchProducts: [],
  searchKeyword: "",
  loading: false,
};

// > Storing search products to render
const renderSearchProducts = (state, action) => {
  return {
    ...state,
    searchProducts: action.searchProducts,
    searchKeyword: action.searchKeyword,
    loading: false,
  };
};

// > Rendering the spinner
const showSpinner = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

// > ==== REDUCER ====

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RENDER_SEARCH_PRODUCTS:
      return renderSearchProducts(state, action);

    case actionTypes.LOAD:
      return showSpinner(state, action);

    default:
      return state;
  }
};

export default reducer;
