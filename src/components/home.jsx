import React from "react";
import AllBirthdays from "./AllBirthdays";
import CurrentBirthdays from "./CurrentBirthdays";

/* Home page consists of the Current Birthdays component and the ALl Birthdays component
 * Each component takes the full width of the CONTAINER.
 */

const Home = () => {
  return (
    <React.Fragment>
      <div className=" container">
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
