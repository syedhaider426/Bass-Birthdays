import React, { Fragment } from "react";
import AllBirthdays from "./AllBirthdays";
import CurrentBirthdays from "./CurrentBirthdays";

/* Home page consists of the Current Birthdays component and the ALl Birthdays component
 * Each component takes the full width of the CONTAINER.
 */

const Home: React.FC = (): JSX.Element => {
  return (
    <Fragment>
      <div className="container">
        <div className="col-md-12">
          <CurrentBirthdays />
        </div>
        <div className="col-md-12">
          <AllBirthdays />
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
