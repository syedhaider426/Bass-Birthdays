import React, { Component } from "react";

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

class CurrentBirthdays extends Component {
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
          <hr></hr>
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
        <hr></hr>
        <div className="row">
          {currentArtists.map(artist => (
            <div className={"col-6 img-wrapper"} key={artist._id}>
              <img
                className="img-fluid"
                src={artist.profileImage}
                alt={artist.artist}
                key={artist.artist}
              ></img>
              <div className="bottom-left" key={artist._id}>
                {artist.artist}
              </div>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default CurrentBirthdays;
