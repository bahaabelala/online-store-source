import React, { Component } from 'react';
import classes from './MyOrders.module.css'
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/actionCreators';
import withRouter from '../../../../hoc/withRouter/withRouter';

import Aux from '../../../../hoc/Auxiliary/Auxiliary';
import Loader from '../../../../components/general/UI/Loader/Loader';
import SectionTitle from '../../../../components/general/UI/SectionTitle/SectionTitle';
import Order from '../../../../components/admin/orders/Order/Order';
import { Row } from 'react-bootstrap';

class MyOrders extends Component {
    componentDidMount() {
        this.props.onRenderMyOrders(this.props.token);
    }

    goToOrderDetails = orderID => {
        this.props.navigate(`/myOrders/${orderID}`)
    }

    render() {
        if (this.props.loading) return <Loader />;

        return (
            <Aux>
                <SectionTitle>Your Orders</SectionTitle>
                <div className={classes.ordersContainer}>
                    <Row xs={1} sm={2} md={3} lg={4}>
                        {this.props.orders.map(order => {
                            return <Order
                                key={order._id}
                                id={order._id}
                                creationTime={order.createdAt}
                                clicked={this.goToOrderDetails.bind(this, order._id)} />
                        })}
                    </Row>
                </div>
                <SectionTitle></SectionTitle>
            </Aux>
        );
    }
};

const mapStateToProps = state => {
    return {
        orders: state.profile.orders,
        token: state.register.token,
        loading: state.profile.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRenderMyOrders: token => dispatch(actionCreators.fetchMyOrders(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MyOrders));