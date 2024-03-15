import React from "react";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import withSectionHeading from "../../../hoc/withSectionHeading/withSectionHeading";
import Product from "../../general/UI/Product/Product";

const BestSellers = props => {
  const products = props.products.map(product => {
    return (
      <Product
        class="BestProduct"
        key={product.id}
        productID={product.id}
        title={product.name}
        details={product.description}
        price={product.price}
        image={product.image}
        countInStock={product.countInStock}
      />
    );
  });

  return <Aux>{products}</Aux>;
};

export default withSectionHeading(BestSellers, "Best Sellers");
