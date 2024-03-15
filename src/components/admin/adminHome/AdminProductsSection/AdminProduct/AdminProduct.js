import React from "react";
import classes from "./AdminProduct.module.css";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// ! Test Image
import controllerImage from "../../../../../assets/images/Controller.jpg";

const AdminProduct = props => {
  const navigate = useNavigate();

  // // > To view the product details for the admin to edit it
  // const viewAdminProductHandler = () => {
  //   navigate(`/admin/products_list/${props.product.id}/edit`);
  // };

  return (
    <div className={classes.AdminProduct}>
      <div className={classes.imageContainer}>
        <img src={controllerImage} alt={props.product.name} />
      </div>
      <div className={classes.titleContainer}>
        <h3>{props.product.name}</h3>
      </div>
      <div className={classes.subdetailsContainer}>
        <span>
          <strong>${props.product.price.toFixed(2)}</strong>
        </span>
        <span>
          <strong>{props.product.countInStock} </strong>
          In Stock
        </span>
      </div>

      <div className={classes.optionsContainer}>
        <i
          className={["ri-delete-bin-line", classes.deleteIcon].join(' ')}
          title='Remove product'
          onClick={() => {
            props.productDeleted(props.product.id, props.product.name);
          }}
        ></i>
        <i
          className={["ri-edit-box-line", classes.editIcon].join(' ')}
          title='Edit product'
          onClick={() => {
            navigate(`/admin/products_list/product/${props.product.id}/edit`);
          }}
        ></i>
      </div>
    </div>
  );
};

AdminProduct.propTypes = {
  product: PropTypes.object.isRequired,
};

export default AdminProduct;
