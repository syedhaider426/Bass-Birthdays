import React, { Component } from "react";
import { Link } from "react-router-dom";
import placeholder from "../images/picture-placeholder.png";

var url;
if (process.env.NODE_ENV === "production")
  url = new URL("https://dubstepdata.info/currentArtist");
else url = new URL("http://localhost:8080/currentArtist");

/* If the month returned is less than 10, then place a 0
 * in front of it. Ex 9 -> 09
 */
function makeMonthFormat(month) {
  return month < 10 ? "0" + month : "" + month;
}

/* If the date returned is less than 10, then place a 0
 * in front of it Ex 9 -> 09
 */
function makeDateFormat(day) {
  return day < 10 ? "0" + day : "" + day;
}

class CurrentBirthdays extends Component {
  state = {
    currentArtists: [{ profileImage: placeholder }],
    currentDate: new Date()
  };

  componentDidMount() {
    //Gets the current date
    const { currentDate } = this.state;

    //Gets the date/month from the date
    var date = currentDate.getDate();
    var month = currentDate.getMonth();

    //"Creates" the URL with params
    var params = { date: date, month: month };
    url.search = new URLSearchParams(params).toString();

    //Gets the artists whose birthday is on the current date
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({ currentArtists: data });
      })
      .catch(err =>
        console.log("componentDidMount (CurrentBirthday) - Error", err)
      );
  }

  /* When a user clicks the 'Next' or 'Previous' arrows,
   * it will update the artists shown on the Current Birthdays
   * component
   */
  handleDateChange = counter => {
    //Gets the current date
    var { currentDate } = this.state;

    //Increments/decrements date depending on "counter" value
    currentDate.setDate(currentDate.getDate() + counter);

    //Gets date/month from date that is in the state
    var date = currentDate.getDate();
    var month = currentDate.getMonth();

    var params = { date: date, month: month };
    url.search = new URLSearchParams(params).toString();
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({ currentDate, currentArtists: data });
      })
      .catch(err => console.log(err));
  };

  render() {
    const { currentArtists, currentDate } = this.state;

    /* Length is checked to see if there are any artists who have a birthday
     * on the current daye
     */
    const length = currentArtists.length;

    //Extracts the month,day, and year
    var day = makeDateFormat(currentDate.getDate()); //getDate returns a value between 1-31
    var month = makeMonthFormat(currentDate.getMonth() + 1); //getMonth returns a value between 0-11
    var year = currentDate.getFullYear();

    //Creates a date string
    var date = month + "/" + day + "/" + year;

    //If there are no birthdays, show this.
    var noBirthdays = <h1 className="no-artists">None</h1>;

    //Checks if the two dates are equivalent
    var compareDate1 = currentDate.setHours(0, 0, 0, 0);
    var compareDate2 = new Date().setHours(0, 0, 0, 0);
    if (compareDate1 === compareDate2) date = "Today's Birthdays";
    return (
      <React.Fragment>
        {/* This displays the next/prev arrows and the current date*/}
        <h1 className="current-birthdays-title">
          <span onClick={() => this.handleDateChange(-1)}>
            <i className="fa fa-lg fa-arrow-left"></i>
          </span>
          <div className="divider"></div>
          {date}
          <div className="divider"></div>
          <span onClick={() => this.handleDateChange(1)}>
            <i className="fa fa-lg fa-arrow-right"></i>
          </span>
        </h1>

        <hr></hr>

        {/*If there are no birthdays, show "None"; else, show the artists*/}
        {length === 0 ? (
          noBirthdays
        ) : (
          <div className="row">
            {currentArtists.map(artist => (
              <div className="img-wrapper" key={artist._id}>
                <Link to={"/profile/" + artist.Artist}>
                  <img
                    className="img-fluid"
                    src={artist.ProfileImage}
                    alt={artist.Artist}
                  />
                </Link>
                <div className="curr-artist-name">{artist.Artist}</div>
              </div>
            ))}
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default CurrentBirthdays;
