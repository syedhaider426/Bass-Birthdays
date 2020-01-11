import React, { Fragment } from "react";

const About = () => {
  return (
    <Fragment>
      <h1 className="center">
        <u>About</u>
      </h1>
      <div className="container jumbotron">
        <p>
          Bass Birthdays is a website dedicated to displaying the birthdays of
          artists involved in the bass music scene, whether that be a dubstep
          artist or future bass artist.
        </p>
        <p>
          Each artist shown on the website has their own profile where users can
          see the most popular songs created by the artist as well as any
          artists who make similar music to them.
        </p>
      </div>
    </Fragment>
  );
};

export default About;
