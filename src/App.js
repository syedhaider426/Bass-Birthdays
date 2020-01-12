import React from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/home";
import NotFound from "./components/notFound";
import ArtistProfile from "./components/artistProfile";

import { TransitionGroup, CSSTransition } from "react-transition-group";
import NavBar from "./components/navbar";
import About from "./components/about";
import Contact from "./components/contact";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";

/* Transition source help from
 * https://medium.com/@khwsc1/step-by-step-guide-of-simple-routing-transition-effect-for-react-with-react-router-v4-and-9152db1566a0*
 */
toast.configure();
function App() {
  return (
    <React.Fragment>
      <NavBar></NavBar>
      <div className="content">
        <div className="main-content">
          <Route
            render={({ location }) => {
              const { key, pathname } = location;

              return (
                <TransitionGroup component={null}>
                  <CSSTransition
                    key={key}
                    appear={true}
                    classNames={"fade"}
                    timeout={{ enter: 750, exit: 0 }}
                  >
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
                  </CSSTransition>
                </TransitionGroup>
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
