import React from "react";
import "./App.css";
import NavBar from "./components/navbar";
import { Switch, Route, Redirect } from "react-router-dom";
import CurrentBirthdays from "./components/currentBirthdays";
import AllBirthdays from "./components/allBirthdays";
import ContactForm from "./components/contactForm";
import RequestForm from "./components/requestForm";
import NotFound from "./components/notFound";
import Footer from "./components/footer";
function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/all" exact component={AllBirthdays}></Route>
        <Route path="/contact" exact component={ContactForm}></Route>
        <Route path="/birthday" exact component={RequestForm}></Route>
        <Route path="/not-found" component={NotFound}></Route>
        <Route path="/" exact component={CurrentBirthdays}></Route>
        <Redirect to="/not-found" />
      </Switch>
      <Footer />
    </div>
  );
}

//switch renders first child that matches the url location
//order routes from most specific to most generic
//if you have a redirect without the from, then it will redirect
//if there is no route available

export default App;
