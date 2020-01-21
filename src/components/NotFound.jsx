import React from "react";
import AutoComplete from "./AutoComplete";

/* NotFound page is routed to when user goes to an invalid url */

const NotFound = () => {
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
