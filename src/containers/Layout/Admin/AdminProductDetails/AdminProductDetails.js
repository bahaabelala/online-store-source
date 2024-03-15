import React, { Component } from "react";
import withRouter from "../../../../hoc/withRouter/withRouter";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/actionCreators';

import SectionTitle from "../../../../components/general/UI/SectionTitle/SectionTitle";
import Loader from "../../../../components/general/UI/Loader/Loader";
import Aux from "../../../../hoc/Auxiliary/Auxiliary";
import AdminProductDetailsForm from "../../../../components/admin/adminHome/AdminProductDetailsForm/AdminProductDetailsForm";

class AdminProductDetails extends Component {
  componentDidMount() {
    if (this.props.action === "edit") {
      this.props.onRenderProductDetails(this.props.params.id);
    }
  }

  render() {
    const config =
      this.props.action === "add"
        ? {
          sectionTitle: "Add Product",
          buttonText: "ADD",
          process: (productData) => {
            this.props.onAddProduct(productData, this.props.token, this.props.userID)
          },
        }
        : {
          sectionTitle: "Update Product",
          buttonText: "UPDATE",
          process: (productData) => {
            this.props.onUpdateProduct(
              productData,
              this.props.token,
              this.props.params.id
            );
          },
        };
        
    if (this.props.loading) {
      return <Loader />
    }

    if (this.props.isProductEdited) {
      alert('Updated successfully!');
      this.props.navigate(-1);
    }

    if (this.props.isProductAdded) {
      alert('Added successfully!');
      this.props.navigate(-1);
    }

    if (this.props.action === 'edit' && this.props.productDetails) {
      return (
        <Aux>
          <SectionTitle>{config.sectionTitle}</SectionTitle>
          <AdminProductDetailsForm
            action='edit'
            config={config}
            productDetails={this.props.productDetails} />
        </Aux>
      );
    } 

    if (this.props.action === 'add') {
      return (
        <Aux>
          <SectionTitle>{config.sectionTitle}</SectionTitle>
          <AdminProductDetailsForm action='add' config={config} />
        </Aux>
      );
    }

    return null;
  }
}

const mapStateToProps = state => {
  return {
    loading: state.admin.loading,
    productDetails: state.admin.productDetails,
    isProductEdited: state.admin.isProductEdited,
    isProductDeleted: state.admin.isProductDeleted,
    isProductAdded: state.admin.isProductAdded,
    token: state.register.token,
    userID: state.register.userID,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddProduct: (data, token, userID) => dispatch(actionCreators.addProduct(data, token, userID)),
    onUpdateProduct: (data, token, id) => dispatch(actionCreators.updateProduct(data, token, id)),
    onRenderProductDetails: id => dispatch(actionCreators.fetchProductDetails(id)),
  }
}

AdminProductDetails.propTypes = {
  action: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AdminProductDetails));
