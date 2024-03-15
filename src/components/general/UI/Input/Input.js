import React, { useState } from "react";
import classes from "./Input.module.css";
import Aux from "../../../../hoc/Auxiliary/Auxiliary";
import uploadAxios from "../../../../axios/axios-upload";
import Loader from "../../../general/UI/Loader/Loader";

const Input = props => {
  let inputElement = null,
    [loading, SetLoading] = useState(false),
    [fileURL, setFileURL] = useState("");

  // > Handler for file input type
  const uploadHandler = async e => {
    try {
      const formData = new FormData();

      formData.append("image", e.target.files[0]);

      SetLoading(true);

      // ^ Posting the file to the server endpoint
      const response = await uploadAxios.post("", formData);

      // ^ Catching the image URL
      const imageURL = response.data.path;
      setFileURL(imageURL);
      SetLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={classes.Input}
          {...props.elementConfig}
          name={props.name}
          value={props.value}
          onChange={props.changed}
          required
        />
      );
      break;

    case "fileInput":
      inputElement = (
        <div className={classes.FileInputContainer}>
          <input
            className={classes.FileURLInput}
            type="url"
            placeholder={props.elementConfig.placeholder}
            name={props.name}
            value={fileURL || props.value}
            onChange={props.changed}
            required
          />
          <input
            className={classes.FileInput}
            type={props.elementConfig.type}
            accept={props.elementConfig.accept}
            onChange={uploadHandler}
            id={props.name}
          />
          <div className={classes.loaderContainer}>
            {loading ? <Loader size="small" /> : null}
          </div>
          <label className={classes.FileInputLabel} htmlFor={props.name}>
            Upload
          </label>
        </div>
      );
      break;

    case "select":
      inputElement = (
        <select
          className={classes.SelectInput}
          name={props.name}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.displayValue}
            </option>
          ))}
        </select>
      );
      break;

    case "radioInput":
      inputElement = (
        <div className={classes.RadioInputContainer}>
          {props.elementConfig.map((config, i) => {
            return (
              <Aux key={props.value[i]}>
                <input
                  className={classes.RadioInput}
                  {...config}
                  name={props.name[i]}
                  value={props.value[i]}
                  id={props.value[i]}
                />
                <label
                  className={classes.RadioInputLabel}
                  htmlFor={props.value[i]}
                >
                  {props.value[i]}
                </label>
              </Aux>
            );
          })}
        </div>
      );
      break;

    case "textarea":
      inputElement = (
        <textarea
          className={[classes.Input, classes.Textarea].join(" ")}
          {...props.elementConfig}
          name={props.value}
          value={props.value}
          onChange={props.changed}
          required
        ></textarea>
      );
      break;

    default:
      break;
  }

  return <Aux>{inputElement}</Aux>;
};

export default Input;
