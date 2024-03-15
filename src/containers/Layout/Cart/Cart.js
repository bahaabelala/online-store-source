import React, { Component } from "react";
import classes from "./Cart.module.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "./store/actions/actionCreators";
import { changeAuthRedirectPath } from "../Register/store/actions/actionCreators";
import { Helmet } from 'react-helmet';

import SectionTitle from "../../../components/general/UI/SectionTitle/SectionTitle";
import Button from "../../../components/general/UI/Button/Button";
import withRouter from "../../../hoc/withRouter/withRouter";
import Loader from "../../../components/general/UI/Loader/Loader";
import Alert from "../../../components/general/UI/Alert/Alert";
import CartItem from '../../../components/cart/CartItem/CartItem';
import { Row } from 'react-bootstrap';

class Cart extends Component {
  componentDidMount() {
    // ^ Checking if there is an id given in the url parameters
    if (this.props.params.id) {
      const productID = this.props.params.id.split(".")[0],
        productQuantity = this.props.params.id.split(".")[1];

      // ^ Fetching the new product if its ID is given
      this.props.onFetchCurrentProduct(productID, productQuantity);
    } else {
      // ^ Rendering the cart products
      this.props.onRenderCartProducts();
    }
  }

  // > Continue to shop the cart products
  continueShoppingHandler = () => {
    // ^ Redirecting to checkout IF AUTHENTICATED
    if (this.props.isAuthenticated) {
      this.props.navigate("/checkout/shipping");

      // ^ Redirecting to sign-in page IF NOT AUTHENTICATED
    } else {
      this.props.onSetOrderingState();
      this.props.onChangeAuthRedirectPath('/checkout/shipping');
      this.props.navigate('/register/signin');
    }
  };

  render() {
    let cartItemsJSX = null,
        decisionButtons = null;

    // ^ Rendering the JSX conditionally
    if (this.props.loading) {
      cartItemsJSX = <Loader />;
    } else if (this.props.products.length) {
      cartItemsJSX = this.props.products.map(product => (
        <CartItem
          key={product.id}
          item={product}
          removeItem={this.props.onRemoveProduct}
          updateProdQuantity={this.props.onUpdateProdQuantity}
          />
      ));

      decisionButtons = (
        <div className={classes.decisionButtons}>
          <Button fontWeight="400" clicked={this.continueShoppingHandler}>
            CONTINUE SHOPPING
          </Button>

          <Button
            fontWeight="400"
            backgroundColor="var(--red)"
            clicked={this.props.onClearCart}
          >
            CLEAR SHOPPING LIST
          </Button>
        </div>
      );
    }

    return (
      <section className={classes.Cart}>
        <Helmet>
          <title>Online Store | Cart</title>
        </Helmet>
        <SectionTitle>Your cart items</SectionTitle>
        {
          !this.props.products.length && !this.props.loading
          ? (
              <Alert>
                Your cart is empty!&nbsp;
                <Link to="/">Let's fill it</Link>
              </Alert>
            )
          : null
        }
        <Row xs={1} sm={2} lg={3} xl={4} className='g-3'>
          {cartItemsJSX}
        </Row>
        {decisionButtons}
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.cart.products,
    loading: state.cart.loading,
    isAuthenticated: state.register.token !== null,
    isOrdering: state.cart.ordering,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchCurrentProduct: (id, quantity) =>
      dispatch(actionCreators.fetchCurrentProduct(id, quantity)),
    onRenderCartProducts: () =>
      dispatch(actionCreators.renderCartProducts()),
    onClearCart: () => dispatch(actionCreators.clearCart()),
    onRemoveProduct: id => dispatch(actionCreators.removeProduct(id)),
    onUpdateProdQuantity: (event, product) =>
      dispatch(actionCreators.updateProductQuantity(event, product)),
    onSetOrderingState: () =>
      dispatch(actionCreators.setOrderingState()),
    onChangeAuthRedirectPath: path =>
      dispatch(changeAuthRedirectPath(path)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cart));
