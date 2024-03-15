import React, { Component } from "react";
import classes from "./Orders.module.css";
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/actionCreators';
import withRouter from '../../../../hoc/withRouter/withRouter';

import Aux from "../../../../hoc/Auxiliary/Auxiliary";
import SectionTitle from "../../../../components/general/UI/SectionTitle/SectionTitle";
import Order from '../../../../components/admin/orders/Order/Order';
import Loader from "../../../../components/general/UI/Loader/Loader";
import Pagination from "../../../../components/general/UI/Pagination/Pagination";
import { Row } from 'react-bootstrap';

class Orders extends Component {
  componentDidMount() {
    this.props.onRenderOrders(this.props.token, this.props.params.page);
  }

  renderOrderDetails = orderID => {
    this.props.navigate(`/admin/orders_list/order/${orderID}`);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.loading !== this.props.loading ||
      nextProps.orders !== this.props.orders ||
      nextProps.totalPages !== this.props.totalPages ||
      nextProps.activePage !== this.props.activePage ||
      nextProps.params.page !== this.props.params.page;
  }

  render() {
    console.log(this.props.params.page)

    if (this.props.loading) return <Loader />;

    if (this.props.orders.length !== []) {
      return (
        <Aux>
          <SectionTitle>Orders</SectionTitle>
          <section className={classes.Orders}>
            <Row xs={1} sm={2} md={3} lg={4}>
              {this.props.orders.map(order => {
                return <Order
                  key={order._id}
                  id={order._id}
                  creationTime={order.createdAt}
                  clicked={this.renderOrderDetails.bind(this, order._id)} />;
              })}
            </Row>
          </section>
          <Pagination 
            totalPages={this.props.totalPages}
            activePage={this.props.activePage}
            changePage={page => {
              this.props.navigate(`/admin/orders_list/${page}`);
              this.props.onRenderOrders(this.props.token, page);
            }} />
          <SectionTitle></SectionTitle>
        </Aux>
      );
    }

    return null;

  }
}

const mapStateToProps = state => {
  return {
    loading: state.admin.loading,
    token: state.register.token,
    orders: state.admin.orders,
    totalPages: state.admin.ordersTotalPages,
    activePage: state.admin.ordersActivePage,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRenderOrders: (token, pageNum) =>
      dispatch(actionCreators.fetchOrders(token, pageNum)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Orders));
