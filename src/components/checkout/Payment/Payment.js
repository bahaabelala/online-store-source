import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import Aux from "../../../hoc/Auxiliary/Auxiliary";
import SectionTitle from "../../general/UI/SectionTitle/SectionTitle";
import Form from "../../general/UI/Form/Form";
import Backdrop from '../../general/UI/Backdrop/Backdrop';
import PayPal from './PayPal/PayPal';

const Payment = props => {
  const [paymentForm] = useState({
    paymentMethod: {
      elementType: "radioInput",
      elementConfig: [
        {
          type: "radio",
          checked: true,
          readOnly: true,
        },
      ],
      value: ["PayPal"],
    },
  });
  const [paypalChosen, setPaypalChosen] = useState(false);
  const navigate = useNavigate();

  // > Recording form data in the local storage
  const recordFormData = formData => {
    // ^ Storing data in redux
    props.storeData(formData);

    // ^ Mark the payment method as paypal (FOR A PURPOSE OF TESTING PAYPAL INTEGRATION)
    setPaypalChosen(true);
  };

  return (
    <Aux>
      <SectionTitle />
      <Form
        form={paymentForm}
        buttonText="CONTINUE"
        dataProcessed={recordFormData}
      />

      {/* (FOR A PURPOSE OF TESTING PAYPAL INTEGRATION) */}
      {
        paypalChosen ?
          <Backdrop clicked={() => navigate('/checkout/ordersummary')}>
            <PayPal totalPrice={props.cartItemsPrice} />
          </Backdrop>
          : null
      }
    </Aux >
  );
};

export default Payment;