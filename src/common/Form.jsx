import React, { Component } from "react";
import Input from "./Input";
import TextArea from "./TextArea";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      errors: {}
    };
  }

  /* When a user tries to submit their contact info,
   * validate that all pertinent information has been entereed
   */
  validate = () => {
    //abortEarly means to pass all errors inside of just short-circuiting with the first one
    const options = { abortEarly: false };
    const { error } = this.schema.validate(this.state.data, options);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  /*Make fields required*/
  handleSubmit = e => {
    /* This prevents the default behavior of submitting form to server,
     * causing a full page reload
     */
    e.preventDefault();

    //Validates all info has been entered
    const errors = this.validate();

    /* If errors returns null, then set errors object to be
     * an empty object. Else, display the error
     */
    this.setState({ errors: errors || {} });

    if (errors) {
      return;
    }

    //Submit form values
    this.submitValues();

    //Clearing out values in form
    const { data } = this.state;

    Object.keys(data).forEach(key => {
      data[key] = "";
    });
    this.setState({ data: data, errors: {} });
  };

  handleChange = ({ currentTarget: input }) => {
    const data = this.state.data;
    data[input.name] = input.value;
    this.setState({ data });
  };

  renderButton(label) {
    return (
      <button type="submit" className="btn btn-primary float-left mt-1">
        {label}
      </button>
    );
  }

  renderInput(
    name,
    autoFocus,
    type,
    placeholder,
    className,
    labelClassName,
    label,
    ariaRequired
  ) {
    const { data, errors } = this.state;

    return (
      <Input
        autoFocus={autoFocus}
        value={data[name]}
        onChange={this.handleChange}
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className={className}
        errors={errors[name]}
        labelClassName={labelClassName}
        label={label}
        aria-required={ariaRequired}
      />
    );
  }

  renderTextArea(
    name,
    autoFocus,
    placeholder,
    className,
    labelClassName,
    label,
    ariaRequired
  ) {
    const { data, errors } = this.state;

    return (
      <TextArea
        autoFocus={autoFocus}
        value={data[name]}
        onChange={this.handleChange}
        id={name}
        name={name}
        placeholder={placeholder}
        className={className ? className + " form-control" : "form-control"}
        errors={errors[name]}
        labelClassName={labelClassName}
        label={label}
        aria-required={ariaRequired}
      />
    );
  }
}

export default Form;
