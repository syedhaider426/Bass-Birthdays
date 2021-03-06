import React from "react";
import { Link } from "react-router-dom";
import AutoComplete from "./AutoComplete";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Location } from "history";

/* If user is currently on the home page and clicks "Bass Birthdays",
 * reload the page
 */
function validateCurrentPage(location: Location<unknown>): void {
  if (location.pathname === "/") window.location.reload();
}

/* Navbar is displayed at the top of page */
const Navbar: React.FC<RouteComponentProps> = ({
  location,
}: RouteComponentProps) => {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg" id="navbar">
        <Link
          className="navbar-brand main-title"
          to="/"
          title="Bass Birthdays Home Button"
          onClick={() => validateCurrentPage(location)}
        >
          <span className="bass-birthdays">Bass Birthdays </span>
          <i className="fa fa-birthday-cake fa-10x"></i>
        </Link>
        <AutoComplete />
        <button
          className="custom-toggler navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarToggle"
          aria-controls="navbarToggle"
          aria-label="Navbar Toggler Icon"
          aria-expanded="false"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarToggle">
          {/*.navbar-collapse.show closes the navbar when a navigation link has been clicked*/}
          <ul className="navbar-nav ml-auto nav-tabs ">
            <li
              className="nav-item"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              <Link className="nav-link" to="/">
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

export default withRouter(Navbar);
