import React from "react";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/all" className="nav-link">
              All Birthdays
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/birthday" className="nav-link">
              Submit Birthday Request
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link">
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
