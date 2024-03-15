import React from "react";
import classes from "./AdminProductsSection.module.css";
import PropTypes from "prop-types";
import AdminProduct from "./AdminProduct/AdminProduct";
import Alert from '../../../general/UI/Alert/Alert';

const AdminProductsSection = props => {
  console.log(props.products);

  return (
    <section className={classes.AdminProductsSection}>
      <h1 className={classes.title}>{props.sectionTitle}</h1>
      <div className={classes.adminProducts}>
        {props.products !== 'No data to show!' ?
            props.products.map(prod => (
              <AdminProduct
                key={prod.id}
                product={prod}
                productDeleted={props.deleteProduct} />
            ))
          : (
            <Alert>
              There is no products in your store!
            </Alert>
          )}
      </div>
    </section>
  );
};

AdminProductsSection.propTypes = {
  sectionTitle: PropTypes.string.isRequired,
  products: PropTypes.array.isRequired || PropTypes.string.isRequired,
};

export default AdminProductsSection;
