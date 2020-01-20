import React from "react";
import { Link } from "react-router-dom";
// import AutoComplete from "../common/AutoComplete";

/* Navbar is displayed at the top of page */

const Navbar = () => {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg" id="navbar">
        <Link className="navbar-brand main-title" to="/">
          <span className="bass-birthdays">Bass Birthdays </span>
          <i className="fa fa-birthday-cake fa-10x"></i>
        </Link>
        <button
          className="custom-toggler navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarToggle"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarToggle">
          {/*.navbar-collapse.show closes the navbar when a navigation link has been clicked*/}
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
};

export default Navbar;
