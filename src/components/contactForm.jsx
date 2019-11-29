import React, { Component } from "react";
import Form from "../common/form";
class ContactForm extends Component {
  state = {};
  render() {
    return (
      <div className="container birthday-table mt-2">
        <div className="row">
          <div className="col-sm-12 ">
            <Form />;
          </div>
        </div>
      </div>
    );
  }
}

export default ContactForm;
