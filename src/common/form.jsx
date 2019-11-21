import React, { Component } from "react";

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
    //also submit the date
    console.log(name);
    console.log(email);
    console.log(comments);
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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}

export default Form;

/*htmlFor
Now when the user clicks with the mouse on the username text the browser will automatically put the focus in the corresponding input field. This also works with other input elements such as <textbox> and <select>.
*/
