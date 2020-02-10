import React from "react";

import Header from "./main_components/Header";
import Content from "./main_components/Content";
import Footer from "./main_components/Footer";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

/* Because there may be toast notifications used throughout this web application,
 * we can simply declare it at the top level of the application
 */
toast.configure();

/*
 * Structure
 *
 * NavBar at Top Level
 * Content at Mid Level
 *     -Consists of either Home, About, Contact, Not-Found, or "Profile Page"
 * Footer at Bottom Level
 *

 */

function App() {
  return (
    <React.Fragment>
      <Header />
      <Content />
      <Footer />
    </React.Fragment>
  );
}

export default App;
