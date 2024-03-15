import * as actionTypes from "./actions/actionTypes";

const initialState = {
  products: [],
  currentProduct: null,
  totalPrice: 0,
  ordering: false,
  loading: false,
};

// > Rendering the spinner
const showSpinner = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

// > Rendering final cart products
const renderCartProducts = (state, action) => {
  let totalPrice = 0;

  // ^ Getting the cart products saved in the local storage
  const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];

  // ^ If there is a new product fetched, it is stored in cart products
  if (state.currentProduct) cartProducts.push({ ...state.currentProduct });

  // ^ Calculating the TOTAL PRICE
  cartProducts.forEach(product => {
    totalPrice += product.price * parseInt(product.quantity.value, 10);
  });

  // ^ Storing the new cart products in the local storage
  localStorage.setItem("cartProducts", JSON.stringify(cartProducts));

  return {
    ...state,
    products: cartProducts,
    currentProduct: null,
    totalPrice: Math.round(totalPrice * 100) / 100,
    loading: false,
  }
}

// > Storing the current product
const storeCurrentProduct = (state, action) => {
  const product = { ...action.product };

  /* 
    Avoiding repitition of cart products
  */
  // ^ Getting cart products from the local storage
  const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
  if (cartProducts.findIndex(prod => prod.id === product.id) !== -1) return state;

  // ^ Setting the quantity of the product
  const quantityInput = {
    elementType: "select",
    elementConfig: {
      options: [],
    },
    value: action.quantity,
  };

  // ^ Making the options of the quantity select Input
  for (let i = 1; i <= product.countInStock; i++) {
    quantityInput.elementConfig.options.push({
      value: i,
      displayValue: i,
    });
  }
  product.quantity = quantityInput;

  return {
    ...state,
    currentProduct: product,
    ordering: false,
  };
};

// > Clear all cart Products
const clearCart = (state, action) => {
  // ^ Making sure that the decision of clearing is correct
  const verification = window.confirm(
    "Are you sure you want to clear your shopping list?"
  );

  if (verification) {
    localStorage.setItem("cartProducts", JSON.stringify([]));

    // ^ Clearing the state
    return {
      ...state,
      products: [],
      totalPrice: 0,
    };
  }

  return state;
};

// > Remove one chosen product from the list
const removeProduct = (state, action) => {
  let totalPrice = 0;

  // ^ Making sure that the decision of removing the product is correct
  const verification = window.confirm("Are you sure?");

  if (verification) {
    // ^ Copying the products from the local storage
    const cartProducts = JSON.parse(localStorage.getItem("cartProducts")),
      // ^ Finding the index of the wanted product
      productIndex = cartProducts.findIndex(
        product => product.id === action.productID
      );

    // ^ Deleting the product from the cart products by using its index
    cartProducts.splice(productIndex, 1);

    // ^ Calculating the TOTAL PRICE
    cartProducts.forEach(product => {
      totalPrice += product.price * parseInt(product.quantity.value, 10);
    });

    // ^ Updating the local storage
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));

    // ^ Returning the new state
    return {
      ...state,
      products: cartProducts,
      totalPrice: Math.round(totalPrice * 100) / 100,
    };
  }

  return state;
};

// > Updating quantity of a product from the list
const updateProductQuantity = (state, action) => {
  let totalPrice = 0;

  const updatedProduct = { ...action.targetProduct };

  const quantityInput = { ...updatedProduct.quantity };

  quantityInput.value = action.event.target.value;
  updatedProduct.quantity = quantityInput;

  // ^ Updating the local storage
  const cartProducts = JSON.parse(localStorage.getItem("cartProducts"));

  const updatedProductIndex = cartProducts.findIndex(
    prod => prod.id === updatedProduct.id
  );

  cartProducts.splice(updatedProductIndex, 1, updatedProduct);

  // ^ Calculating the TOTAL PRICE
  cartProducts.forEach(product => {
    totalPrice += product.price * parseInt(product.quantity.value, 10);
  });

  localStorage.setItem("cartProducts", JSON.stringify(cartProducts));

  // ^ Updating the state with the new quantity input value
  return {
    ...state,
    products: cartProducts,
    totalPrice: Math.round(totalPrice * 100) / 100,
  };
};

// > Changing ordering state to ordering
const setOrderingState = (state, action) => {
  return {
    ...state,
    ordering: true,
  }
}

// > Changing ordering state to NOT ordering
const unsetOrderingState = (state, action) => {
  return {
    ...state,
    ordering: false,
  }
}

// > ==== REDUCER ====

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_CURRENT_PRODUCT:
      return storeCurrentProduct(state, action);

    case actionTypes.RENDER_CART_PRODUCTS:
      return renderCartProducts(state, action);

    case actionTypes.CLEAR_CART:
      return clearCart(state, action);

    case actionTypes.REMOVE_PRODUCT:
      return removeProduct(state, action);

    case actionTypes.UPDATE_PRODUCT_QUANTITY:
      return updateProductQuantity(state, action);

    case actionTypes.SET_ORDERING_STATE:
      return setOrderingState(state, action);

    case actionTypes.UNSET_ORDERING_STATE:
      return unsetOrderingState(state, action);

    case actionTypes.LOAD:
      return showSpinner(state, action);

    default:
      return state;
  }
};

export default reducer;
