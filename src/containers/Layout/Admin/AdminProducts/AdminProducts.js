import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from '../store/actions/actionCreators';
import withRouter from '../../../../hoc/withRouter/withRouter';

import Aux from "../../../../hoc/Auxiliary/Auxiliary";
import AdminProductsSection from "../../../../components/admin/adminHome/AdminProductsSection/AdminProductsSection";
import SectionTitle from "../../../../components/general/UI/SectionTitle/SectionTitle";
import Loader from "../../../../components/general/UI/Loader/Loader";
import Pagination from "../../../../components/general/UI/Pagination/Pagination";


class AdminProducts extends Component {
  componentDidMount() {
    this.props.onRenderProducts(this.props.params.page);
    this.props.onUnsetProductEditedState();
    this.props.onUnsetProductAddedState();
  }

  deleteProductHandler = (productID, productName) => {
    const deleteConfirmation = window.confirm(`Are you sure, you want to delete "${productName}"?!`);

    if (deleteConfirmation) {
      this.props.onDeleteProduct(this.props.token, productID);
    }
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
        <AdminProductsSection
          sectionTitle="Slider Products"
          products={this.props.sliderProducts}
          deleteProduct={this.deleteProductHandler}
        />
      );
    }
    if (this.props.bestSellers.length) {
      bestSellersJSX = (
        <AdminProductsSection
          sectionTitle="Best Sellers"
          products={this.props.bestSellers}
          deleteProduct={this.deleteProductHandler}
        />
      );
    }
    if (this.props.otherProducts.length) {
      otherProductsJSX = (
        <AdminProductsSection
          sectionTitle="Other Products"
          products={this.props.otherProducts}
          deleteProduct={this.deleteProductHandler}
        />
      );
    }

    const addBtnStyles = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'var(--green)',
      color: 'white',
      padding: '10px',
      fontSize: '2rem',
      cursor: 'pointer'
    }

    return (
      <Aux>
        <i
          className="ri-add-line"
          style={addBtnStyles}
          onClick={() => { this.props.navigate('/admin/products_list/product/add') }}
          ></i>

        {sliderJSX}
        {bestSellersJSX}
        {otherProductsJSX}
        <Pagination
          totalPages={this.props.totalPages}
          activePage={this.props.activePage}
          changePage={page => {
            this.props.navigate(`/admin/products_list/${page}`);
            this.props.onRenderProducts(page);
          }} />
        <SectionTitle></SectionTitle>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.admin.loading,
    sliderProducts: state.admin.products.sliderProducts,
    bestSellers: state.admin.products.bestSellers,
    otherProducts: state.admin.products.otherProducts,
    totalPages: state.admin.prodTotalPages,
    activePage: state.admin.prodActivePage,
    token: state.register.token,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRenderProducts: pageNum => dispatch(actionCreators.fetchProducts(pageNum)),
    onUnsetProductEditedState: () => dispatch(actionCreators.unsetProductEditedState()), 
    onUnsetProductAddedState: () => dispatch(actionCreators.unsetProductAddedState()),
    onDeleteProduct: (token, id) => dispatch(actionCreators.deleteProduct(token, id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(AdminProducts)
);
