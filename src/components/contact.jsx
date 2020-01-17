import React, { Component } from "react";
import { toast } from "react-toastify";

var url;
if (process.env.NODE_ENV === "development")
  url = new URL("http://localhost:8080/contactInfo");
else url = new URL("https://www.dubstepdata.info/contactInfo");

class Contact extends Component {
  state = {
    name: "",
    email: "",
    comment: "",
    errors: {}
  };

  handleInputChange = ({ target: input }) => {
    const value = input.value;
    const name = input.name;
    this.setState({ [name]: value });
  };

  validate = () => {
    const errors = {};
    const { name, email, comment } = this.state;
    if (name.trim() === "") errors.name = "Name is required";
    if (email.trim() === "") errors.email = "Email is required";
    if (comment.trim() === "") errors.comment = "Comment is required";
    return Object.keys(errors).length === 0 ? null : errors;
  };

  /*Make fields required*/
  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) {
      return;
    }
    const { name, email, comment } = this.state;
    var params = { name, email, comment };
    url.search = new URLSearchParams(params).toString();
    fetch(url, { method: "POST" }).then(() => {
      this.setState({ name: "", email: "", comment: "" });
      toast.success("🚀 Successfully submitted contact info!");
    });
  };

  render() {
    const { errors, name, email, comment } = this.state;

    return (
      <div className="center">
        <h1>
          <u>Contact Us</u>{" "}
        </h1>
        <p style={{ color: "white" }}>
          Got a question? We'd love to hear from you. Send us a message and
          we'll respond as soon as possible.
        </p>
        <div className="container contact-jumbotron">
          <form>
            <hr></hr>
            <label htmlFor="name" className="contact float-left">
              Name <span className="star">*</span>
            </label>
            <input
              id="name"
              type="text"
              className="form-control"
              placeholder="Name..."
              onChange={this.handleInputChange}
              value={name}
            ></input>
            {errors.name && (
              <div className="alert alert-danger">{errors.name}</div>
            )}
            <hr></hr>
            <label htmlFor="email" className="contact float-left">
              Email <span className="star">*</span>
            </label>
            <input
              id="email"
              type="text"
              className="form-control"
              placeholder="Email..."
              onChange={this.handleInputChange}
              value={email}
            ></input>
            {errors.email && (
              <div className="alert alert-danger">{errors.email}</div>
            )}
            <hr></hr>
            <label htmlFor="comment" className="contact float-left">
              Question/Comment <span className="star">*</span>
            </label>
            <textarea
              id="comment"
              type="textarea"
              className="form-control"
              placeholder="Question/Comment..."
              onChange={this.handleInputChange}
              value={comment}
            ></textarea>
            {errors.comment && (
              <div className="alert alert-danger">{errors.comment}</div>
            )}
            <hr></hr>
            <button
              type="button"
              className="btn btn-primary float-left"
              onClick={this.handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default Contact;
