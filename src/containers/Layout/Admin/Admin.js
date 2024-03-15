import React, { Component } from "react";
import classes from "./Admin.module.css";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';

import SectionTitle from "../../../components/general/UI/SectionTitle/SectionTitle";
import Aux from "../../../hoc/Auxiliary/Auxiliary";

class Admin extends Component {
  render() {
    return (
      <Aux>
        <Helmet>
          <title>Online Store | Admin</title>
        </Helmet>
        <SectionTitle>ADMIN DASHBOARD</SectionTitle>
        <section className={classes.Admin}>
          <Link to="/admin/products_list/1">
            <span>Products</span>
            <i className="ri-arrow-right-s-line"></i>
          </Link>
          <Link to="/admin/users_list/1">
            <span>Users</span>
            <i className="ri-arrow-right-s-line"></i>
          </Link>
          <Link to="/admin/orders_list/1">
            <span>Orders</span>
            <i className="ri-arrow-right-s-line"></i>
          </Link>
        </section>
        <SectionTitle></SectionTitle>
      </Aux>
    );
  }
}

export default Admin;
