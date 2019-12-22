import React from "react";
import AllBirthdays from "./allBirthdays";
import CurrentBirthdays from "./currentBirthdays";
const Home = () => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-5">
          <CurrentBirthdays />
        </div>
        <div className="col-md-7">
          <AllBirthdays />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
