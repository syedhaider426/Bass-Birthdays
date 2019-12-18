import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";
import "font-awesome/css/font-awesome.css";
import WebFont from "webfontloader";
import smoothscroll from "smoothscroll-polyfill";
smoothscroll.polyfill();

WebFont.load({
  google: {
    families: ["Montserrat", "sans-serif"]
  }
});

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

//browserrouter - passes down the history object
//in the browser and passes it down to the component tree

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
