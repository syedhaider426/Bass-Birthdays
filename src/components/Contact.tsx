import React, { RefObject } from "react";
import { toast } from "react-toastify";
import Form from "../common/Form";
import Joi from "@hapi/joi";

interface AppProps {
  //code related to your props goes here
}

class Contact extends Form<AppProps> {
  private recaptchaRef: RefObject<HTMLInputElement>;
  constructor(props: AppProps) {
    super(props);
    this.state = {
      data: { name: "", email: "", comment: "", recaptchaVerification: false },
      errors: { recaptchaVerification: "" },
    };
    this.recaptchaRef = React.createRef();
    this.setSchema(
      Joi.object().keys({
        name: Joi.string().required().label("Name"),
        email: Joi.string().required().label("Email"),
        comment: Joi.string().required().label("Comment"),
        recaptchaVerification: Joi.boolean().valid(true).label("Recaptcha"),
      })
    );
  }

  /* When a user submits the form, run this function */
  submitValues = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    const { name, email, comment } = this.state.data;
    const recaptchaValue = this.recaptchaRef.current!.value;
    const errors = this.handleSubmit();
    console.log("Are there errors", errors);
    if (
      errors.name ||
      errors.email ||
      errors.comment ||
      errors.recaptchaVerification.length > 0
    ) {
      this.setState({ errors: errors });
    } else {
      fetch(
        `/contactInfo?name=${name}&email=${email}&comment=${comment}&recaptchaValue=${recaptchaValue}`,
        { method: "POST" }
      )
        .then(() => {
          //Clearing out values in form
          const { data } = this.state;

          Object.keys(data).forEach((key) => {
            data[key] = "";
          });
          this.setState({ data: data, errors: { recaptchaVerification: "" } });
          toast.success("🚀 Successfully submitted contact info!");
        })
        .catch((err) => {
          toast.error("🚀 Unable to send email. Please try again later!");
        });
    }
  };

  render() {
    var nameLabel: JSX.Element = (
      <div>
        Name <span className="star">*</span>
      </div>
    );
    var emailLabel: JSX.Element = (
      <div>
        Email <span className="star">*</span>
      </div>
    );
    var commentLabel: JSX.Element = (
      <div>
        Question/Comment <span className="star">*</span>
      </div>
    );

    /* Note: If name/email receive null or undefined in value field,
     * a warning will be thrown regarding controlled/uncontrolled elements
     */

    /* render Input/TextArea - name,autoFocus,type,placeholder,
     * className,labelClassName,label, ariaRequired
     */
    return (
      <div className="center">
        <h1>
          <u>Contact Us</u>
        </h1>
        <p style={{ color: "white" }}>
          Got a question? We'd love to hear from you. Send us a message and
          we'll respond as soon as possible.
        </p>
        <div className="container contact-jumbotron">
          <form onSubmit={this.submitValues}>
            {this.renderInput(
              "name",
              true,
              "text",
              "Name...",
              "",
              "contact float-left mt-3",
              nameLabel,
              true
            )}

            {this.renderInput(
              "email",
              false,
              "text",
              "Email...",
              "",
              "contact float-left mt-3",
              emailLabel,
              true
            )}

            {this.renderTextArea(
              "comment",
              false,
              "Question/Comment...",
              "",
              "contact float-left mt-3",
              commentLabel,
              true,
              "comment"
            )}
            <br></br>
            {this.renderCaptcha(this.recaptchaRef)}
            {this.renderButton("Submit")}
          </form>
        </div>
      </div>
    );
  }
}
export default Contact;
