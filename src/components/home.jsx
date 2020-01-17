import React from "react";
import AllBirthdays from "./AllBirthdays";
import CurrentBirthdays from "./CurrentBirthdays";

const Home = () => {
  return (
    <React.Fragment>
      <div className="home-display container">
        <div className="col-md-12">
          <CurrentBirthdays />
        </div>
        <div className="col-md-12">
          <AllBirthdays />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
