import React, { Component } from "react";
import { Link } from "react-router-dom";
// import AutoComplete from "../common/AutoComplete";

class NavBar extends Component {
  state = { options: "" };
  componentDidMount() {
    var url;
    if (process.env.NODE_ENV === "production")
      url = "https://dubstepdata.info/artistOnly";
    else url = "http://localhost:8080/artistOnly";
    fetch(url)
      .then(response => response.json())
      .then(data => {
        var arr = [];
        for (var x = 0; x < data.length; x++) {
          arr.push(data[x].Artist);
        }
        this.setState({ options: arr });
      });
  }

  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-expand-lg" id="navbar">
          <Link className="navbar-brand main-title" to="/">
            <span className="bass-birthdays">Bass Birthdays </span>
            <i className="fa fa-birthday-cake fa-10x"></i>
          </Link>
          {/* <AutoComplete
            onSubmit={this.handleSubmit}
            suggestions={this.state.options}
          /> */}
          <button
            className="custom-toggler navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li
                className="nav-item"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
                <Link className="nav-link" to="/" exact="true">
                  Home
                </Link>
              </li>
              <li
                className="nav-item"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li
                className="nav-item"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
