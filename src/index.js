import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

// REDUCERS
import homeReducer from "./containers/Layout/Home/store/reducer";
import productDetailsReducer from "./containers/Layout/ProductDetails/store/reducer";
import searchProductsReducer from "./containers/Layout/SearchProducts/store/reducer";
import cartReducer from "./containers/Layout/Cart/store/reducer";
import registerReducer from "./containers/Layout/Register/store/reducer";
import checkoutReducer from "./containers/Layout/Checkout/store/reducer";
import profileReducer from './containers/Layout/Profile/store/reducer';
import adminReducer from './containers/Layout/Admin/store/reducer';
import orderDetailsReducer from './containers/Layout/OrderDetails/store/reducer';

// BOOTSTRAP CSS & JS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


const rootReducer = combineReducers({
  home: homeReducer,
  productDetails: productDetailsReducer,
  search: searchProductsReducer,
  cart: cartReducer,
  register: registerReducer,
  checkout: checkoutReducer,
  profile: profileReducer,
  admin: adminReducer,
  orderDetails: orderDetailsReducer,
});

// FOR REDUX DIVTOOLS
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
