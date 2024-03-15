import React, { Component } from "react";
import withSectionHeading from "../../../hoc/withSectionHeading/withSectionHeading";
import Product from "../../../components/general/UI/Product/Product";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Loader from "../../../components/general/UI/Loader/Loader";
import withRouter from "../../../hoc/withRouter/withRouter";
import Alert from "../../../components/general/UI/Alert/Alert";
import { connect } from "react-redux";
import * as actionCreators from "./store/actions/actionCreators";
import { unsetOrderingState } from "../Cart/store/actions/actionCreators";
import { Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

//! Test
import controllerImage from "../../../assets/images/Controller.jpg";

class SearchProducts extends Component {
  componentDidMount() {
    if (!this.props.params.keyword) this.props.navigate('/');
    this.props.onFetchProducts(this.props.params.keyword);
    this.props.onUnsetOrderingState();
  }

  componentDidUpdate() {
    if (!this.props.params.keyword) this.props.navigate('/');
    if (this.props.params.keyword !== this.props.searchKeyword) {
      this.props.onFetchProducts(this.props.params.keyword);
    }
  }

  render() {
    let searchResultJSX = null;

    if (this.props.loading) {
      searchResultJSX = <Loader />;
    } else if (this.props.searchProducts === "No data to show!") {
      searchResultJSX = (
        <Col xs={12} sm={12} md={12} lg={12}>
          <Alert>No products match your search!</Alert>
        </Col>
      );
    } else {
      searchResultJSX = this.props.searchProducts.map(product => (
        <Product
          key={product.id}
          class="NormalProduct"
          productID={product.id}
          title={product.name}
          price={product.price}
          image={controllerImage}
          countInStock={product.countInStock}
        />
      ));
    }

    return (
      <Aux>
        <Helmet>
          <title>Online Store | Search Result</title>
        </Helmet>

        {searchResultJSX}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchProducts: state.search.searchProducts,
    searchKeyword: state.search.searchKeyword,
    loading: state.search.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchProducts: keyword =>
      dispatch(actionCreators.fetchSearchProducts(keyword)),
    onUnsetOrderingState: () =>
      dispatch(unsetOrderingState()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withSectionHeading(SearchProducts, "Search results")));
