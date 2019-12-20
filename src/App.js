import React from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import AllBirthdays from "./components/allBirthdays";
import NotFound from "./components/notFound";
import Footer from "./components/footer";
function App() {
  return (
    <div>
      <div className="content">
        <h1 className="main-title">Bass Birthdays</h1>
        <h6>
          <em className="tagline">Birthdays of Your Favorite DJs</em>
        </h6>
        <hr></hr>
        <Switch>
          <Route path="/not-found" component={NotFound}></Route>
          <Route path="/" exact component={AllBirthdays}></Route>
          <Redirect to="/not-found" />
        </Switch>
      </div>
    </div>
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
