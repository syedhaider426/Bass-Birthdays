import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "../components/Home";
import About from "../components/About";
import Contact from "../components/Contact";
import ArtistProfile from "../components/ArtistProfile";
import NotFound from "../components/NotFound";

/* Content at Mid Level
 *  -Consists of either Home, About, Contact, Not-Found, or "Profile Page"
 */
const Content = () => {
  return (
    <main>
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
    </main>
  );
};

/* Switch is used to navigate between different url destinations/routes
 * Routes indicate different url destinations a user can go to
 * Redirect is used when no routes are found
 * switch renders first child that matches the url location
 * order routes from most specific to most generic
 * if you have a redirect without the from, then it will redirect
 * if there is no route available
 */

export default Content;
