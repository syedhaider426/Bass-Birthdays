import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";
import "font-awesome/css/font-awesome.css";
import WebFont from "webfontloader";

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

/* Solved issue with scrolling to top of window by doing this 
https://stackoverflow.com/questions/8149155/animate-scrolltop-not-working-in-firefox/8149216#8149216*/

//browserrouter - passes down the history object
//in the browser and passes it down to the component tree

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
