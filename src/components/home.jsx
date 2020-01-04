import React from "react";
import AllBirthdays from "./allBirthdays";
import CurrentBirthdays from "./currentBirthdays";
const Home = () => {
  return (
    <React.Fragment>
      <div className="home-display">
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
