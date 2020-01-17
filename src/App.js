import React from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ArtistProfile from "./components/ArtistProfile";
import NotFound from "./components/NotFound";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
 * Switch is used to navigate between different url destinations/routes
 * Routes indicate different url destinations a user can go to
 * Redirect is used when no routes are found
 */
function App() {
  return (
    <React.Fragment>
      <NavBar></NavBar>
      <div className="content">
        <div className="main-content">
          <Route
            render={({ location }) => {
              return (
                <Switch location={location}>
                  <Route path="/not-found" component={NotFound}></Route>
                  <Route path="/" exact component={Home}></Route>

                  <Route path="/about" exact component={About}></Route>
                  <Route path="/contact" exact component={Contact}></Route>
                  <Route
                    path="/profile/:artist"
                    component={ArtistProfile}
                  ></Route>
                  <Redirect to="/not-found" />
                </Switch>
              );
            }}
          />
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}

//switch renders first child that matches the url location
//order routes from most specific to most generic
//if you have a redirect without the from, then it will redirect
//if there is no route available

export default App;
