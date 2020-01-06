import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg ">
        <Link className="navbar-brand main-title" to="/">
          Bass Birthdays
        </Link>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <form className="">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              aria-label="Search"
              aria-describedby="basic-addon1"
            />
            <div className="input-group-prepend">
              <span
                className="input-group-text fa fa-search"
                id="basic-addon1"
              ></span>
            </div>
          </div>
        </form>
      </nav>
    </div>
  );
};

export default NavBar;
