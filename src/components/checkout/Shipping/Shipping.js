import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import SectionTitle from "../../general/UI/SectionTitle/SectionTitle";
import Form from "../../general/UI/Form/Form";

const Shipping = props => {
  const [shippingForm] = useState({
    address: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Enter your address",
        required: true,
      },
      value: "",
    },
    city: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Enter your city",
        required: true,
      },
      value: "",
    },
    postalCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Enter your postal code",
        required: true,
      },
      value: "",
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Enter your country",
        required: true,
      },
      value: "",
    },
  });
  const navigate = useNavigate();

  // > Recording form data in the local storage
  const recordFormData = formData => {
    // ^ Storing data in redux
    props.storeData(formData);

    // ^ Navigate to payment component to continue ordering...
    navigate("/checkout/payment");
  };

  return (
    <Aux>
      <SectionTitle />
      <Form
        form={shippingForm}
        dataProcessed={recordFormData}
        buttonText="CONTINUE"
      />
    </Aux>
  );
};

export default Shipping;

// Paused Code For its Complicated Problems
// useEffect(() => {
//   // ^ Reading the local storage while mounting the shipping component
//   if (localStorage.getItem("shipping")) {
//     const localStorageShippingData = JSON.parse(
//       localStorage.getItem("shipping")
//     );
//     const updatedShippingForm = { ...shippingForm };
//     let updatedFormItem;
//     // ^ Storing values in the form data in the state
//     for (const formItem in localStorageShippingData) {
//       updatedFormItem = { ...updatedShippingForm[formItem] };
//       updatedFormItem.value = localStorageShippingData[formItem];
//       updatedShippingForm[formItem] = updatedFormItem;
//     }
//     // ^ Setting the state with the values
//     setShippingForm(updatedShippingForm);
//   }
// }, []);
