import React from "react";
import { toast } from "react-toastify";
import Form from "../common/Form";
import Joi from "@hapi/joi";

var url;
if (process.env.NODE_ENV === "development")
  url = new URL("http://localhost:8080/contactInfo");
else url = new URL("https://bassbirthdays.com/contactInfo");

class Contact extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: { name: "", email: "", comment: "", recaptchaVerification: false },
      errors: {}
    };
    this.recaptchaRef = React.createRef();
  }

  /* Schema to validate the inputs from the Contact Form */
  schema = Joi.object().keys({
    name: Joi.string()
      .required()
      .label("Name"),
    email: Joi.string()
      .required()
      .label("Email"),
    comment: Joi.string()
      .required()
      .label("Comment"),
    recaptchaVerification: Joi.boolean()
      .valid(true)
      .label("Recaptcha")
  });

  /* When a user submits the form, run this function */
  submitValues = () => {
    const { name, email, comment } = this.state.data;
    const recaptchaValue = this.recaptchaRef.current.getValue();
    var params = { name, email, comment, recaptchaValue };
    url.search = new URLSearchParams(params).toString();
    fetch(url, { method: "POST" })
      .then(() => {
        toast.success("🚀 Successfully submitted contact info!");
      })
      .catch(err => {
        toast.error("🚀 Unable to send email. Please try again later!");
      });
  };

  render() {
    var nameLabel = (
      <div>
        Name <span className="star">*</span>
      </div>
    );
    var emailLabel = (
      <div>
        Email <span className="star">*</span>
      </div>
    );
    var commentLabel = (
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
          <form onSubmit={this.handleSubmit} method="POST">
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
              true
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
