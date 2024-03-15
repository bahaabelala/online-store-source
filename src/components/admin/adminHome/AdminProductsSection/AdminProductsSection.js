import React from "react";
import classes from "./AdminProductsSection.module.css";
import PropTypes from "prop-types";
import AdminProduct from "./AdminProduct/AdminProduct";

const AdminProductsSection = props => {
  return (
    <section className={classes.AdminProductsSection}>
      <h1 className={classes.title}>{props.sectionTitle}</h1>
      <div className={classes.adminProducts}>
        {props.products.map(prod => (
          <AdminProduct
            key={prod.id}
            product={prod}
            productDeleted={props.deleteProduct} />
        ))}
      </div>
    </section>
  );
};

AdminProductsSection.propTypes = {
  sectionTitle: PropTypes.string.isRequired,
  products: PropTypes.array.isRequired,
};

export default AdminProductsSection;
