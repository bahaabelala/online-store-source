import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Slider.module.css";

import Button from "../../general/UI/Button/Button";

import controllerImage from "../../../assets/images/Controller.jpg";

const Slider = props => {
  let activeProductComponent = null;
  const navigate = useNavigate();

  // > Going to the details of the chosen (clicked) product
  const goToProduct = () => {
    navigate(`/product/${props.activeProductID}`);
  };

  useEffect(() => {
    const slideTimer = setTimeout(() => {
      props.slide('');
    }, 3000);

    return () => clearTimeout(slideTimer);
  })

  // ^ Finding the data of the active product in the slider
  const activeProductObj = props.products.find(product => {
    return product.id === props.activeProductID;
  });

  // ^ Visualizing the data of the active product in the slider
  if (activeProductObj) {
    activeProductComponent = [
      <div key="1" className={classes.productImage}>
        <img src={controllerImage} alt={activeProductObj.name} />
      </div>,
      <div key="2" className={classes.productInfo}>
        <h1>{activeProductObj.name}</h1>
        <p>
          {`${activeProductObj.description
            .split(" ")
            .slice(0, 5)
            .join(" ")}...`}
        </p>
        <Button clicked={goToProduct}>SHOP NOW</Button>
      </div>,
    ];
  }

  // ^ Creating the sliding buttons with determining the active one
  const slideButtons = props.products.map(product => {
    let activeClass = "";
    if (product.id === props.activeProductID) {
      activeClass = classes.active;
    }

    return (
      <span
        key={product.id}
        className={activeClass}
        onClick={() => {
          props.slide(product.id);
        }}
      ></span>
    );
  });

  return (
    <section className={classes.Slider}>
      {activeProductComponent}

      <div className={classes.navContainer}>{slideButtons}</div>
    </section>
  );
};

export default Slider;
