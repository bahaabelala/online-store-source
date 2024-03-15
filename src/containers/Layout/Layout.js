import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Aux from "../../hoc/Auxiliary/Auxiliary";
// import asyncComponent from '../../hoc/asyncComponent/asyncComponent';

// ^ REDUX
import { connect } from "react-redux";

import Header from "../../components/general/Header/Header";
const Cart = React.lazy(() => import('./Cart/Cart'));
const Home = React.lazy(() => import('./Home/Home'));
const Register = React.lazy(() => import('./Register/Register'));
const ProductDetails = React.lazy(() => import('./ProductDetails/ProductDetails'));
const SearchProducts = React.lazy(() => import('./SearchProducts/SearchProducts'));
const Checkout = React.lazy(() => import('./Checkout/Checkout'));
const Logout = React.lazy(() => import('./Register/Logout/Logout'));
const Profile = React.lazy(() => import('./Profile/Profile'));
const MyOrders = React.lazy(() => import('./Profile/MyOrders/MyOrders'));

// --- ADMIN ---
const Admin = React.lazy(() => import('./Admin/Admin'));
const AdminProducts = React.lazy(() => import('./Admin/AdminProducts/AdminProducts'));
const AdminProductDetails = React.lazy(() => import('./Admin/AdminProductDetails/AdminProductDetails'));
const Users = React.lazy(() => import('./Admin/Users/Users'));
const Orders = React.lazy(() => import('./Admin/Orders/Orders'));
const OrderDetails = React.lazy(() => import('./OrderDetails/OrderDetails'));
const EditUser = React.lazy(() => import('./Admin/Users/EditUser/EditUser'));

const withSuspense = component => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      {component}
    </React.Suspense>
  );
}

class Layout extends Component {
  render() {
    // ^ ########### GUARDING ROUTES ##############
    let guardedRoutes = null;

    if (this.props.isRegistered) {
      // ^ ROUTES FOR ADMINS ONLY
      if (this.props.userRole === "admin") {
        guardedRoutes = (
          <React.Fragment>
            <Route path="/checkout/*" element={withSuspense(<Checkout />)} />
            <Route path="/myOrders" element={withSuspense(<MyOrders />)} />
            <Route path="/myOrders/:id" element={withSuspense(<OrderDetails />)} />

            {/* Authentication */}
            <Route path="/signout" element={withSuspense(<Logout />)} />
            <Route path='/profile/*' element={withSuspense(<Profile />)} />

            {/* Admin */}
            <Route path="/admin" element={withSuspense(<Admin />)} />
            <Route path="/admin/products_list/:page" element={withSuspense(<AdminProducts />)} />
            <Route
              path="/admin/products_list/product/:id/edit"
              element={withSuspense(<AdminProductDetails action="edit" />)}
            />
            <Route
              path="/admin/products_list/product/add"
              element={withSuspense(<AdminProductDetails action="add" />)}
            />
            <Route path="/admin/users_list/:page" element={withSuspense(<Users />)} />
            <Route path="/admin/users_list/user/:id" element={withSuspense(<EditUser />)} />
            <Route path="/admin/orders_list/:page" element={withSuspense(<Orders />)} />
            <Route path="/admin/orders_list/order/:id" element={withSuspense(<OrderDetails />)} />

            {/* REDIRECT FOR DISALLOWED OR UNDEFINED ROUTES */}
            <Route path="*" element={<Navigate to='/' />} />
          </React.Fragment>
        );
      } else {
        guardedRoutes = (
          <React.Fragment>
            <Route path="/checkout/*" element={withSuspense(<Checkout />)} />
            <Route path="/myOrders" element={withSuspense(<MyOrders />)} />
            <Route path="/myOrders/:id" element={withSuspense(<OrderDetails />)} />

            {/* Authentication */}
            <Route path="/signout" element={withSuspense(<Logout />)} />
            <Route path='/profile/*' element={withSuspense(<Profile />)} />

            {/* REDIRECT FOR DISALLOWED OR UNDEFINED ROUTES */}
            <Route path="*" element={<Navigate to='/' />} />
          </React.Fragment>
        );
      }
    } else if (!this.props.isRegistered) {
      guardedRoutes = (
        <React.Fragment>
          {/* Authentication */}
          <Route path="/register/*" element={withSuspense(<Register />)} />

          {/* REDIRECT FOR DISALLOWED OR UNDEFINED ROUTES */}
          <Route path="*" element={<Navigate to='/' />} />
        </React.Fragment>
      );
    }
    // ^ ##########################################

    return (
      <Aux>
        <Header
          scrolled={this.props.headerScrolled}
          isRegistered={this.props.isRegistered}
          userRole={this.props.userRole}
        />

        <div style={{ height: '85px' }}></div>

        <React.Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={withSuspense(<Home />)} />
            <Route path="/cart/:id" element={withSuspense(<Cart />)} />
            <Route path="/cart" element={withSuspense(<Cart />)} />
            <Route path="/product/:id" element={withSuspense(<ProductDetails />)} />
            <Route path="/search/:keyword" element={withSuspense(<SearchProducts />)} />

            {/* ######  GUARDED ROUTES  ##### */}
            {guardedRoutes}
            {/* ############################# */}
          </Routes>
        </React.Suspense>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isRegistered: state.register.token != null,
    userRole: state.register.userRole,
  };
};

export default connect(mapStateToProps)(Layout);
