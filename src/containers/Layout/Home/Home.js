import React, { Component } from "react";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import { connect } from "react-redux";
import * as actionCreators from "./store/actions/actionCreators";
import { unsetOrderingState } from '../Cart/store/actions/actionCreators';
import { Helmet } from 'react-helmet';

import Slider from "../../../components/home/Slider/Slider";
import BestSellers from "../../../components/home/BestSellers/BestSellers";
import OtherProducts from "../../../components/home/OtherProducts/OtherProducts";
import Footer from "../../../components/home/Footer/Footer";
import Loader from "../../../components/general/UI/Loader/Loader";
import Pagination from "../../../components/general/UI/Pagination/Pagination";


class Home extends Component {
  componentDidMount() {
    this.props.onRenderOtherProducts(1);
    this.props.onRenderBestProducts();
    this.props.onUnsetOrderingState();
  }

  render() {
    let sliderJSX = null,
      bestSellersJSX = null,
      otherProductsJSX = null;


    // ^ Rendering the UI conditionally
    // ^ If the data is still loading a spinner will be rendered
    if (this.props.loading) {
      return <Loader />;
    }
    if (this.props.sliderProducts.length) {
      sliderJSX = (
        <Slider
          products={this.props.sliderProducts}
          activeProductID={this.props.sliderActiveProductID}
          slide={this.props.onSlide}
        />
      );
    }
    if (this.props.bestSellers.length) {
      bestSellersJSX = (
        <BestSellers products={this.props.bestSellers} />
      );
    }
    if (this.props.otherProducts.length) {
      otherProductsJSX = (
        <OtherProducts
          products={this.props.otherProducts}
          loading={this.props.loadingOtherProd} />
      );
    }

    return (
      <Aux>
        <Helmet>
          <title>Online Store | Home</title>
        </Helmet>
        {sliderJSX}
        {bestSellersJSX}
        {otherProductsJSX}
        <Pagination
          totalPages={this.props.totalPages}
          activePage={this.props.activePage}
          changePage={this.props.onRenderOtherProducts} />
        <Footer />
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.home.loading,
    sliderProducts: state.home.sliderProducts,
    sliderActiveProductID: state.home.sliderActiveProductID,
    bestSellers: state.home.bestSellers,
    otherProducts: state.home.otherProducts,
    loadingOtherProd: state.home.loadingOtherProd,
    totalPages: state.home.totalPages,
    activePage: state.home.activePage,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSlide: id => dispatch(actionCreators.slide(id)),
    onRenderBestProducts: () => dispatch(actionCreators.fetchTopProducts()),
    onRenderOtherProducts: pageNum => dispatch(actionCreators.fetchProducts(pageNum)),
    onUnsetOrderingState: () => dispatch(unsetOrderingState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
