import React from "react";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <header>
      <li>
        <h1 className="logo">
          <Link to="/">B-Birthdays</Link>
        </h1>
      </li>

      <input type="checkbox" id="nav-toggle" className="nav-toggle" />
      <nav>
        <ul>
          <li>
            <Link to="/all">All Birthdays</Link>
          </li>
          <li>
            <Link to="/birthday">Submit Birthday Request</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
        </ul>
      </nav>
      <label htmlFor="nav-toggle" class="nav-toggle-label">
        <span></span>
      </label>
    </header>
  );
};

/*advantage of span label */
export default NavBar;
