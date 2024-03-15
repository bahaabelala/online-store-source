import * as actionTypes from "./actions/actionTypes";

const initialState = {
  product: {},
  loading: false,
  quantity: {
    elementType: "select",
    elementConfig: {
      options: [],
    },
    value: "1",
  },
};

// > Rendering product details
const renderProductDetails = (state, action) => {
  const quantityInput = { ...state.quantity },
    quantityInputConfig = { ...quantityInput.elementConfig },
    quantityInputOptions = [...quantityInputConfig.options];

  // ^ Clearing the options of the quantity input
  quantityInputOptions.splice(0, quantityInputOptions.length);

  // ^ Setting the options of the quantity select Input
  // ^ ...According to the countInStock of the product
  for (let i = 1; i <= action.product.countInStock; i++) {
    quantityInputOptions.push({
      value: i,
      displayValue: i,
    });
  }

  quantityInputConfig.options = quantityInputOptions;
  quantityInput.elementConfig = quantityInputConfig;

  // ^ Returning the new state
  return {
    product: action.product,
    loading: false,
    quantity: quantityInput,
  };
};

// > Setting the quantity of the product while changing the value of the select input
const setQuantity = (state, action) => {
  return {
    ...state,
    quantity: {
      ...state.quantity,
      value: action.event.target.value,
    },
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
    case actionTypes.RENDER_PRODUCT_DETAILS:
      return renderProductDetails(state, action);

    case actionTypes.SET_QUANTITY:
      return setQuantity(state, action);

    case actionTypes.LOAD:
      return showSpinner(state, action);

    default:
      return state;
  }
};

export default reducer;
