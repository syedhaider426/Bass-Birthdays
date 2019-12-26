import React from "react";
import "./App.css";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import Home from "./components/home";
import NotFound from "./components/notFound";
import ArtistProfile from "./components/artistProfile";
import Footer from "./components/footer";
import NavBar from "./components/navbar";
function App() {
  return (
    <React.Fragment>
      <div>
        <div className="content">
          <Link to="/">
            <h1 className="main-title">Bass Birthdays</h1>
          </Link>

          <hr></hr>
          <Switch>
            <Route path="/not-found" component={NotFound}></Route>
            <Route path="/" exact component={Home}></Route>
            <Route
              path="/profile/:artist"
              exact
              component={ArtistProfile}
            ></Route>
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}
/*<div className="footer-table">
        <Footer />
      </div>*/
//switch renders first child that matches the url location
//order routes from most specific to most generic
//if you have a redirect without the from, then it will redirect
//if there is no route available

export default App;
