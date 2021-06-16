import React, { Component, KeyboardEvent, Fragment, RefObject } from "react";
import { Link } from "react-router-dom";
import ReactPlaceholder from "react-placeholder";
import "react-placeholder/lib/reactPlaceholder.css";
import { RoundShape } from "react-placeholder/lib/placeholders";

/* If the month returned is less tha 10, then place a 0
 * in front of it. Ex 9 -> 09
 */
function makeMonthFormat(month: number): string {
  return month < 10 ? "0" + month : "" + month;
}

/* If the date returned is less than 10, then place a 0
 * in front of it Ex 9 -> 09
 */
function makeDateFormat(day: number): string {
  return day < 10 ? "0" + day : "" + day;
}

type ArtistType = {
  _id: string;
  Artist: string;
  ProfileImage: string;
};

interface AppProps {
  //code related to your props goes here
}

interface AppState {
  currentArtists: ArtistType[];
  currentDate: Date;
  ready: boolean;
}

class CurrentBirthdays extends Component<AppProps, AppState> {
  private prevArrow: RefObject<HTMLInputElement>;
  private nextArrow: RefObject<HTMLInputElement>;
  constructor(props: AppProps) {
    super(props);
    this.prevArrow = React.createRef();
    this.nextArrow = React.createRef();
    this.state = {
      currentArtists: [],
      currentDate: new Date(),
      ready: false,
    };
  }
  componentDidMount(): void {
    //Gets the current date
    const { currentDate } = this.state;
    let path: string = `/currentArtist?date=${currentDate.getDate()}&month=${currentDate.getMonth()}`;
    //Gets the artists whose birthday is on the current date
    fetch(path)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ currentArtists: data, ready: true });
      })
      .catch((err) =>
        console.error("componentDidMount (CurrentBirthday) - Error", err)
      );
  }

  /* When a user clicks the 'Next' or 'Previous' arrows,
   * it will update the artists shown on the Current Birthdays
   * component
   */
  handleDateChange = (counter: number): void => {
    //Gets the current date
    const { currentDate } = this.state;

    //Increments/decrements date depending on "counter" value
    currentDate.setDate(currentDate.getDate() + counter);

    let path: string = `/currentArtist?date=${currentDate.getDate()}&month=${currentDate.getMonth()}`;
    fetch(path)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ currentDate, currentArtists: data });
      })
      .catch((err) => console.log(err));
  };

  handlePrevKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    // User pressed the enter key
    if (e.key === "13" || e.key === "37") {
      this.handleDateChange(-1);
    }
    // User pressed the right arrow key
    else if (e.key === "39") {
      this.handleDateChange(1);
      this.nextArrow.current!.focus();
    }
  };

  handleNextKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    // User pressed the enter key
    if (e.key === "13" || e.key === "39") {
      this.handleDateChange(1);
    }
    // User pressed the left arrow key
    else if (e.key === "37") {
      this.handleDateChange(-1);
      this.prevArrow.current!.focus();
    }
  };

  render(): JSX.Element {
    const { currentArtists, currentDate, ready }: AppState = this.state;

    const imagePlaceholder: JSX.Element = (
      <div className="my-awesome-placeholder">
        <RoundShape
          color="gray"
          className="margin-center"
          style={{ width: 160, height: 160 }}
        />
      </div>
    );

    /* Length is checked to see if there are any artists who have a birthday
     * on the current date
     */
    const length: number = currentArtists.length;

    //Extracts the month,day, and year
    const day: string = makeDateFormat(currentDate.getDate()); //getDate returns a value between 1-31
    const month: string = makeMonthFormat(currentDate.getMonth() + 1); //getMonth returns a value between 0-11
    const year: string = currentDate.getFullYear().toString();

    //Creates a date string
    let date: string = month + "/" + day + "/" + year;

    //If there are no birthdays, show this.
    const noBirthdays: JSX.Element = <h1 className="no-artists">None</h1>;

    //Checks if the two dates are equivalent
    const compareDate1: number = currentDate.setHours(0, 0, 0, 0);
    const compareDate2: number = new Date().setHours(0, 0, 0, 0);
    if (compareDate1 === compareDate2) date = "Today's Birthdays";
    return (
      <Fragment>
        {/* This displays the next/prev arrows and the current date*/}
        <h1 className="current-birthdays-title">
          <span
            tabIndex={0}
            onKeyDown={this.handlePrevKeyDown}
            onClick={() => this.handleDateChange(-1)}
            ref={this.prevArrow}
          >
            <i
              className="fa fa-lg fa-arrow-left"
              title="View Previous Day's Birthday"
            ></i>
          </span>
          <div className="divider"></div>
          {date}
          <div className="divider"></div>
          <span
            tabIndex={0}
            onKeyDown={this.handleNextKeyDown}
            onClick={() => this.handleDateChange(1)}
            ref={this.nextArrow}
          >
            <i
              className="fa fa-lg fa-arrow-right"
              title="View Next Day's Birthday"
            ></i>
          </span>
        </h1>

        <hr></hr>

        {/*If there are no birthdays, show "None"; else, show the artists*/}
        <ReactPlaceholder
          showLoadingAnimation
          ready={ready}
          customPlaceholder={imagePlaceholder}
        >
          {length === 0 ? (
            noBirthdays
          ) : (
            <div className="row">
              {currentArtists.map((artist: ArtistType) => (
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
        </ReactPlaceholder>
      </Fragment>
    );
  }
}

export default CurrentBirthdays;
