import React, { Fragment } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import ScrollToTop from "../utils/scrollToTop";
const About = () => {
  ScrollToTop();
  return (
    <Fragment>
      <h1 className="center">
        <u>About</u>
      </h1>
      <TransitionGroup component={null}>
        <CSSTransition
          appear={true}
          classNames={"fade"}
          timeout={{ enter: 750, exit: 0 }}
        >
          <div className="container jumbotron">
            <p>
              Bass Birthdays is a website dedicated to displaying the birthdays
              of artists involved in the bass music scene, whether that be a
              dubstep artist or future bass artist.
            </p>
            <p>
              Each artist shown on the website has their own profile where users
              can see the most popular songs created by the artist as well as
              any artists who make similar music to them.
            </p>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </Fragment>
  );
};

export default About;
