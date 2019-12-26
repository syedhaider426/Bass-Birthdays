import React, { Component } from "react";
import { Link } from "react-router-dom";

var url;
if (process.env.NODE_ENV === "production")
  url = new URL("https://dubstepdata.info/currentArtist");
else url = new URL("http://localhost:8080/currentArtist");

function makeMonthFormat(n) {
  return n < 10 ? "0" + n : "" + n;
}

function makeDateFormat(n) {
  return n < 10 ? "0" + n : "" + n;
}

class FooterBirthdays extends Component {
  state = { currentArtists: [], currentDate: new Date() };

  componentDidMount() {
    const { currentDate } = this.state;
    var date = currentDate.getDate();
    var month = currentDate.getMonth();
    var params = { date: date, month: month };
    url.search = new URLSearchParams(params).toString();
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({ currentArtists: data });
      });
  }

  handlePrevDate = () => {
    var { currentDate } = this.state;
    currentDate.setDate(currentDate.getDate() - 1);
    var date = currentDate.getDate();
    var month = currentDate.getMonth();
    var params = { date: date, month: month };
    url.search = new URLSearchParams(params).toString();
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({ currentDate, currentArtists: data });
      });
  };

  handleNextDate = () => {
    var { currentDate } = this.state;
    currentDate.setDate(currentDate.getDate() + 1);
    var date = currentDate.getDate();
    var month = currentDate.getMonth();
    var params = { date: date, month: month };
    url.search = new URLSearchParams(params).toString();
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({ currentDate, currentArtists: data });
      });
  };

  render() {
    const { currentArtists, currentDate } = this.state;
    var day = makeDateFormat(currentDate.getDate());
    var month = makeMonthFormat(currentDate.getMonth() + 1);
    var year = currentDate.getFullYear();
    var date = month + "/" + day + "/" + year;
    const length = currentArtists.length;
    var compareDate1 = currentDate.setHours(0, 0, 0, 0);
    var compareDate2 = new Date().setHours(0, 0, 0, 0);
    if (compareDate1 === compareDate2) date = "Today's Birthdays";
    if (length === 0)
      return (
        <div>
          {" "}
          <h1 className="title">
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
              onClick={this.handlePrevDate}
            ></span>
            <span className="sr-only">Previous</span>
            {date}
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
              onClick={this.handleNextDate}
            ></span>
            <span className="sr-only">Next</span>
          </h1>
          <h1 className="no-artists">None</h1>
        </div>
      );
    return (
      <React.Fragment>
        <h1 className="title">
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
            onClick={this.handlePrevDate}
          ></span>
          <span className="sr-only">Previous</span>
          {date}
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
            onClick={this.handleNextDate}
          ></span>
          <span className="sr-only">Next</span>
        </h1>

        <div className="center">
          {currentArtists.map(artist => (
            <React.Fragment>
              <span className="img-foot-link">
                <Link to={"/profile/" + artist.Artist}>
                  <img
                    className="img-fluid footer-img"
                    src={artist.profileImage}
                    alt={artist.Artist}
                    key={artist.Artist}
                  ></img>
                </Link>
              </span>
            </React.Fragment>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default FooterBirthdays;
