import React from "react";
import { toast } from "react-toastify";
import Form from "../common/Form";

var url;
if (process.env.NODE_ENV === "development")
  url = new URL("http://localhost:8080/contactInfo");
else url = new URL("https://www.dubstepdata.info/contactInfo");

class Contact extends Form {
  state = {
    data: { name: "", email: "", comment: "" },
    errors: {}
  };

  /* When a user tries to submit their contact info,
   * validate that all pertinent information has been entereed
   */
  validate = () => {
    const errors = {};
    const { name, email, comment } = this.state.data;
    if (name.trim() === "") errors.name = "Name is required";
    if (email.trim() === "") errors.email = "Email is required";
    if (comment.trim() === "") errors.comment = "Comment is required";

    return Object.keys(errors).length === 0 ? null : errors;
  };

  submitValues = () => {
    const { name, email, comment } = this.state.data;
    var params = { name, email, comment };
    url.search = new URLSearchParams(params).toString();

    fetch(url, { method: "POST" })
      .then(() => {
        toast.success("🚀 Successfully submitted contact info!");
      })
      .catch(err => {
        console.log("Error - Contact Info", err);
        toast.error("🚀 Unable to submit contact info. Try again later.");
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
          <form onSubmit={this.handleSubmit}>
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

            {this.renderButton("Submit")}
          </form>
        </div>
      </div>
    );
  }
}
export default Contact;
