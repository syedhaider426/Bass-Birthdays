import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import WebFont from "webfontloader";

// https://github.com/airbnb/javascript/tree/master/react
// Used this resource for naming conventions

//Loads the Monserrat font and sans-serif font
WebFont.load({
  google: {
    families: ["Montserrat", "sans-serif"]
  }
});

/* App component is rendered in the BrowserRouter in order to pass down the history object
 * from React Router through the component tree.
 *
 * Root element is targeted because it is the top-most level of the application. "Root" id
 * is defined in index.html in the public folder.
 */

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
