import React, { Component } from "react";

var url;
if (process.env.NODE_ENV === "development")
  url = new URL("http://localhost:8080/contactInfo");
else url = new URL("https://www.dubstepdata.info/contactInfo");

class Contact extends Component {
  state = {
    name: "",
    email: "",
    comment: ""
  };

  handleName = ({ target: input }) => {
    this.setState({ name: input.value });
  };

  handleEmail = ({ target: input }) => {
    this.setState({ email: input.value });
  };

  handleComment = ({ target: input }) => {
    this.setState({ comment: input.value });
  };

  /*Make fields required*/
  handleSubmit = () => {
    const { name, email, comment } = this.state;
    var params = { name, email, comment };
    url.search = new URLSearchParams(params).toString();
    fetch(url, { method: "POST" })
      .then(response => response.json())
      .then(() => {
        this.setState({ name: "", email: "", comment: "" });
        this.props.history.push("/");
      });
  };

  render() {
    return (
      <div className="center">
        <h1>
          <u>Contact Us</u>{" "}
        </h1>
        <p className="white">
          Got a question? We'd love to hear from you. Send us a message and
          we'll respond as soon as possible.
        </p>
        <div className="container jumbotron">
          <label htmlFor="name" className="contact float-left">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="form-control"
            placeholder="Name..."
            onChange={this.handleName}
          ></input>
          <hr></hr>
          <label htmlFor="email" className="contact float-left">
            Email <span className="star">*</span>
          </label>
          <input
            id="email"
            type="text"
            className="form-control"
            placeholder="Email..."
            onChange={this.handleEmail}
          ></input>
          <hr></hr>
          <label htmlFor="comment" className="contact float-left">
            Question/Comment <span className="star">*</span>
          </label>
          <textarea
            id="comment"
            type="textarea"
            className="form-control"
            placeholder="Question/Comment..."
            onChange={this.handleComment}
          ></textarea>
          <hr></hr>
          <button
            type="button"
            className="btn btn-primary float-left"
            onClick={this.handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}
export default Contact;
