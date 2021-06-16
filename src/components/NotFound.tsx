import React from "react";
import AutoComplete from "./AutoComplete";

/* NotFound page is routed to when user goes to an invalid url */

const NotFound: React.FC = (): JSX.Element => {
  /**
   * When a user enters an invalid artist in the autocomplete,
   * it will make the cursor into a 'loading' icon. Therefore,
   * if the artist does not exist, it will go back to the default icon
   */
  document.body.style.cursor = "default";

  return (
    <React.Fragment>
      <div className="container ">
        <div className="home-display ">
          <div className="col-sm-6 margin-center">
            <h1 className="text-center">Page Not Found</h1>
            <div className="text-center jumbotron ">
              <h2>Oops!</h2>
              <p>
                Visit our homepage to browse through our site or search for an
                artist or date below
              </p>
              <div className="margin-center">
                <AutoComplete />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NotFound;
