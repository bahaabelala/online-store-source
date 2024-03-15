import React, { useState } from "react";
import classes from "./Form.module.css";
import PropTypes from "prop-types";
import Input from "../Input/Input";
import Button from "../Button/Button";

const Form = props => {
  const [form, setForm] = useState({ ...props.form });

  // > Recording the value of the input while user typing
  const inputChangedHandler = (e, inputIdentifier) => {
    // ^ Copying the form and mutate it
    const updatedForm = {
      ...form,
      [inputIdentifier]: {
        ...form[inputIdentifier],
        value: e.target.value,
      },
    };

    // ^ Finally, updating the state with the new value recorded
    setForm(updatedForm);
  };

  // > Submit Handler (Returning the data from the form)
  const submitForm = e => {
    e.preventDefault();

    // ^ Collecting the data of form items
    const formItemsData = {};

    for (const dataItem in form) {
      if (form[dataItem].elementType === "radioInput") {
        const checkedElementIndex = form[dataItem].elementConfig.findIndex(
          config => config.checked
        );
        const checkedElementValue = form[dataItem].value[checkedElementIndex];

        formItemsData[dataItem] = checkedElementValue;
      } else {
        formItemsData[dataItem] = form[dataItem].value;
      }
    }

    // ^ Process the data collected as needed (in the component that contain the form)
    props.dataProcessed(formItemsData);
  };

  // ^ Converting the form elements into an array to map them
  let formElementsArr = [];
  for (const key in form) {
    formElementsArr.push({ id: key, config: form[key] });
  }

  return (
    <form className={classes.Form} onSubmit={submitForm}>
      {formElementsArr.map(element => {
        return (
          <Input
            key={element.id}
            elementType={element.config.elementType}
            elementConfig={element.config.elementConfig}
            name={element.id}
            value={element.config.value}
            changed={e => {
              inputChangedHandler(e, element.id);
            }}
          />
        );
      })}
      <Button fontWeight="400" fontSize="1.1rem">
        {props.buttonText}
      </Button>
      {props.children}
    </form>
  );
};

Form.propTypes = {
  form: PropTypes.object.isRequired,
  buttonText: PropTypes.string.isRequired,
  dataProcessed: PropTypes.func.isRequired,
};

export default Form;
