import React from "react";

const NotFound = () => {
  return (
    <React.Fragment>
      <div className="container">
        <div className="home-display">
          <div className="col-sm-6">
            <h1>Page Not Found</h1>
            <div className="text-center jumbotron">
              <h1>Oops!</h1>
              <p>
                Visit our homepage to browse through our site or search for an
                artist or date below
              </p>
              <input type="text"></input>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NotFound;
