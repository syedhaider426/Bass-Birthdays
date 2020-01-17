import React, { Fragment } from "react";

/* Informational page about Bass Birthdays */

const About = () => {
  return (
    <Fragment>
      <h1 className="center">
        <u>About</u>
      </h1>
      <div className="container jumbotron ">
        <p>
          Bass Birthdays is a website dedicated to displaying the birthdays of
          artists involved in the bass music scene, whether that be a dubstep
          artist or future bass artist.
        </p>
        <p>
          Each artist has their own profile. The data displayed on the website
          is sourced from Spotify's Web API.
        </p>
        <ul>
          <li>Displays the genres that are associated with their music</li>
          <li>Shows an artist's top 10 most popular songs</li>
          <ul>
            <li>
              Each song can be clicked and will take the user to Spotify's
              website
            </li>
          </ul>
          <li>
            Profiles also show 20 artists that make a similar style of music.
          </li>
          <ul>
            <li>
              Each artist can be clicked and will take the user to their Spotify
              page
            </li>
          </ul>
        </ul>
      </div>{" "}
    </Fragment>
  );
};

export default About;
