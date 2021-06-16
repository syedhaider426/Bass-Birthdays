import React, { Component, RefObject } from "react";
import Input from "./Input";
import TextArea from "./TextArea";
import ReCAPTCHA from "react-google-recaptcha";
import Joi from "@hapi/joi";

interface AppProps {
  //code related to your props goes here
}

interface AppState {
  data: { [key: string]: any };
  errors: { [key: string]: any; recaptchaVerification: string };
}

class Form<T> extends Component<AppProps, AppState> {
  private schema: Joi.ObjectSchema<any>;
  constructor(props: AppProps) {
    super(props);
    this.schema = Joi.object().keys();
    this.state = {
      data: {},
      errors: { recaptchaVerification: "" },
    };
  }

  getSchema = (): Joi.ObjectSchema<any> => {
    return this.schema;
  };

  setSchema = (schema: Joi.ObjectSchema<any>): void => {
    this.schema = schema;
  };

  /* When a user tries to submit their contact info,
   * validate that all pertinent information has been entereed
   */
  validate = (): {
    [key: string]: any;
    recaptchaVerification: string;
  } => {
    //abortEarly means to pass all errors inside of just short-circuiting with the first one
    const options = { abortEarly: false };
    const { error } = this.schema.validate(this.state.data, options);
    if (!error) return { recaptchaVerification: "" };
    const validErrors: { [key: string]: any; recaptchaVerification: string } = {
      recaptchaVerification: "",
    };
    for (let item of error.details) validErrors[item.path[0]] = item.message;
    return validErrors;
  };

  /* If the user has passed the captacha, set the captcha in the state to true. */
  verifyCaptcha = () => {
    const data = this.state.data;
    data["recaptchaVerification"] = true;
    this.setState({ data });
  };

  /*Make fields required*/
  handleSubmit = (): any => {
    //Validates all info has been entered
    const vErrors: { [key: string]: any; recaptchaVerification: string } =
      this.validate();
    if (vErrors !== null) {
      if (vErrors["recaptchaVerification"].length > 0)
        alert("Please verify that you are a human!");
    } else {
      /* If errors returns null, then set errors object to be
       * an empty object. Else, display the error
       */
      this.setState({ errors: vErrors || { recaptchaVerification: "" } });
    }
    if (vErrors) {
      return vErrors;
    } else {
      //Clearing out values in form
      const { data } = this.state;

      Object.keys(data).forEach((key) => {
        data[key] = "";
      });
      this.setState({ data: data, errors: { recaptchaVerification: "" } });
    }
  };

  handleInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const data = this.state.data;
    data[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ data });
  };

  handleTextAreaChange = (e: React.FormEvent<HTMLTextAreaElement>): void => {
    const data = this.state.data;
    data[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ data });
  };

  /* Render captcha onto a form */
  renderCaptcha(refCaptcha: RefObject<HTMLInputElement>): JSX.Element {
    return (
      <ReCAPTCHA
        onChange={this.verifyCaptcha}
        sitekey={"6LeSQ9kUAAAAAAbEPtNAB97hC9fyqbbYb1epP3Dn"}
        ref={refCaptcha}
      ></ReCAPTCHA>
    );
  }

  /* Render button onto a form */
  renderButton(label: string): JSX.Element {
    return (
      <button type="submit" className="btn btn-primary float-left mt-1">
        {label}
      </button>
    );
  }

  /* Render input onto a form */
  renderInput(
    name: string,
    autoFocus: boolean,
    type: string,
    placeholder: string,
    className: string,
    labelClassName: string,
    label: JSX.Element,
    ariaRequired: boolean
  ): JSX.Element {
    const { data, errors } = this.state;

    return (
      <Input
        autoFocus={autoFocus}
        value={data[name]}
        onChange={this.handleInputChange}
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
    name: string,
    autoFocus: boolean,
    placeholder: string,
    className: string,
    labelClassName: string,
    label: JSX.Element,
    ariaRequired: boolean,
    ariaLabel: string
  ) {
    const { data, errors } = this.state;

    return (
      <TextArea
        autoFocus={autoFocus}
        value={data[name]}
        onChange={this.handleTextAreaChange}
        name={name}
        placeholder={placeholder}
        className={className ? className + " form-control" : "form-control"}
        errors={errors[name]}
        labelClassName={labelClassName}
        label={label}
        ariaRequired={ariaRequired}
        ariaLabel={ariaLabel}
      />
    );
  }
}

export default Form;
