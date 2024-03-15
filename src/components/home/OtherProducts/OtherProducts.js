import React from "react";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import withSectionHeading from "../../../hoc/withSectionHeading/withSectionHeading";

import Product from "../../general/UI/Product/Product";
import Loader from "../../general/UI/Loader/Loader";

const OtherProducts = props => {
    const productsJSX = props.products.map(product => {
      return (
        <Product
          class="NormalProduct"
          key={product.id}
          productID={product.id}
          title={product.name}
          price={product.price}
          image={product.image}
          countInStock={product.countInStock}
        />
      );
    });


    if (props.loading) return (
      <div style={{ position: 'relative', width: '100%', padding: '20px' }}>
        <Loader />
      </div>
    );

    return (
      <Aux>
        {productsJSX}
      </Aux>
    );
}


export default withSectionHeading(OtherProducts, "Other Products");
