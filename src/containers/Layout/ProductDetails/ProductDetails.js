import React, { Component } from "react";
import classes from "./ProductDetails.module.css";
import SectionTitle from "../../../components/general/UI/SectionTitle/SectionTitle";
import Button from "../../../components/general/UI/Button/Button";
import Input from "../../../components/general/UI/Input/Input";
import Loader from "../../../components/general/UI/Loader/Loader";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import withRouter from "../../../hoc/withRouter/withRouter";
import { connect } from "react-redux";
import * as actionCreators from "./store/actions/actionCreators";
import { Helmet } from 'react-helmet';

//! Test
import controllerImage from "../../../assets/images/Controller.jpg";

class productDetails extends Component {
  componentDidMount() {
    this.props.onFetchProduct(this.props.params.id);
  }

  // > Adding the product to cart
  addToCartHandler = () => {
    this.props.navigate(
      `/cart/${this.props.params.id}.${this.props.quantity.value}`
    );
  };

  render() {
    let productDetailsJSX;

    // ^ Rendering JSX Conditionally (Loading OR Product Details)
    if (this.props.loading === true) {
      productDetailsJSX = <Loader />;
    } else if (this.props.product) {
      productDetailsJSX = (
        <Aux>
          <SectionTitle>{this.props.product.name}</SectionTitle>
          <div className={classes.productDetailsBody}>
            <div className={classes.imageContainer}>
              <img src={controllerImage} alt={this.props.product.name} />
            </div>
            <p className={classes.description}>
              {this.props.product.description}
            </p>
            <p className={classes.price}>
              <span className='fw-bold'>Price:</span>&nbsp;&nbsp;&nbsp;
              <strong>${this.props.product.price}</strong>
            </p>
            <p className={classes.numberInStock}>
              <span className='fw-bold'>Availability:</span>&nbsp;&nbsp;&nbsp;
              <strong>{this.props.product.countInStock}</strong>{" "}
              In Stock
            </p>
            <div className={classes.subtotal}>
              <label htmlFor="count"><span className='fw-bold'>Subtotal:</span>&nbsp;&nbsp;&nbsp;</label>
              <Input
                elementType={this.props.quantity.elementType}
                elementConfig={this.props.quantity.elementConfig}
                value={this.props.quantity.value}
                name={this.props.quantity.value}
                changed={e => this.props.onSetQuantity(e)}
              />
            </div>
            <Button clicked={this.addToCartHandler}>ADD TO CART</Button>
          </div>
        </Aux>
      );
    }

    return (
      <section className={classes.ProductDetails}>
        <Helmet>
          <title>Online Store | Product Details</title>
        </Helmet>
        {productDetailsJSX}
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    product: state.productDetails.product,
    loading: state.productDetails.loading,
    quantity: state.productDetails.quantity,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchProduct: id => dispatch(actionCreators.fetchProduct(id)),
    onSetQuantity: e => dispatch(actionCreators.setQuantity(e)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(productDetails));
