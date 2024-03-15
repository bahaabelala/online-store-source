import * as actionTypes from "./actions/actionTypes";

const initialState = {
  loading: false,
  loadingOtherProd: false,
  sliderProducts: [],
  sliderActiveProductID: "",
  bestSellers: [],
  otherProducts: [],
  totalPages: 1,
  activePage: 1,
};

// > Initializing the home with its products
const initializeHome = (state, action) => {
  return {
    ...state,
    otherProducts: action.allProdData.data,
    totalPages: action.allProdData.pages,
    activePage: action.allProdData.page,
    loadingOtherProd: false,
  };
};

// > Rendering Best Sellers
const renderBestSellers = (state, action) => {
  return {
    ...state,
    sliderProducts: action.topProducts,
    sliderActiveProductID: action.topProducts[0].id,
    bestSellers: action.topProducts,
    loading: false,
  }
}

// > Sliding to another product in the slider
const slide = (state, action) => {

  if (action.slideItemID) {
    return {
      ...state,
      sliderActiveProductID: action.slideItemID,
    };

  } else {
    const currentProdIndex = state.sliderProducts.findIndex(prod => {
      return prod.id === state.sliderActiveProductID;
    });
    const newProductID = currentProdIndex < state.sliderProducts.length - 1
                          ? state.sliderProducts[currentProdIndex + 1].id
                          : state.sliderProducts[0].id;


    return {
      ...state,
      sliderActiveProductID: newProductID,
    };
  }

  return state;
};

// > Rendering the spinner ( for Slider and BestProducts comp. )
const showSpinner = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

// > Rendering the spinner ( for OtherProducts comp. )
const loadOtherProducts = (state, action) => {
  return {
    ...state,
    loadingOtherProd: true,
  }
}

// > ==== REDUCER ====

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INITIALIZE_HOME:
      return initializeHome(state, action);

    case actionTypes.RENDER_BEST_SELLERS:
      return renderBestSellers(state, action);

    case actionTypes.SLIDE:
      return slide(state, action);

    case actionTypes.LOAD:
      return showSpinner(state, action);

    case actionTypes.LOAD_OTHER_PRODUCTS:
      return loadOtherProducts(state, action);

    default:
      return state;
  }
};

export default reducer;
