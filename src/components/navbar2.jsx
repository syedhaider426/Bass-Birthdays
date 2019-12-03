import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/js/bootstrap";

const NavBar = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand navbar-color" to="#">
            Dubstep Data
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link navbar-color" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item dropdown">
                <Link
                  className="nav-link navbar-color dropdown-toggle"
                  to="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Birthdays
                </Link>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to="/all">
                    All Birthdays
                  </Link>
                  <Link className="dropdown-item" to="/birthday">
                    Birthday Request
                  </Link>
                </div>
              </li>
              <li className="nav-item">
                <Link className="nav-link navbar-color" to="/contact">
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link navbar-color" to="/privacy">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

/*advantage of span label */
export default NavBar;
