import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

/*Form can have properties of the controls on the browser page*/
/*State can be dynamic based on controls being created*/
/*date field database value*/
class Form extends Component {
  state = { name: "", email: "", comments: "" };

  handleName = ({ currentTarget: input }) => {
    this.setState({ name: input.value });
  };

  handleEmail = ({ currentTarget: input }) => {
    this.setState({ email: input.value });
  };

  handleComments = ({ currentTarget: input }) => {
    this.setState({ comments: input.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, email, comments } = this.state;
    const obj = {
      name,
      email,
      comments
    };
    axios
      .post("http://localhost:4000/contact", obj)
      .then(() => {
        this.props.history.push("/all");
      })
      .catch(err => console.log("Error", err));
    this.setState({
      name: "",
      email: "",
      comments: ""
    });
  };
  render() {
    const { name, email, comments } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            autoFocus
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={this.handleName}
            placeholder="Enter name"
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            className="form-control"
            value={email}
            onChange={this.handleEmail}
            placeholder="Enter email"
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="comments">Comments</label>
          <input
            type="text"
            id="comments"
            className="form-control"
            value={comments}
            onChange={this.handleComments}
            placeholder="Enter comments"
          ></input>
        </div>
        <button type="submit" className="contact-button btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}

export default withRouter(Form);

/*htmlFor
Now when the user clicks with the mouse on the username text the browser will automatically put the focus in the corresponding input field. This also works with other input elements such as <textbox> and <select>.
*/
