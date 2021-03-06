import React, { Component, Fragment } from "react";
import emptyImage from "../images/empty-image.png";
import placeholder from "../images/picture-placeholder.png";
import convertISODateToString from "../utils/convertISODateToString";
import { ScrollToNavbarTop } from "../utils/scrollToTop";
import ReactPlaceholder from "react-placeholder";
import "react-placeholder/lib/reactPlaceholder.css";
import { TextRow, RoundShape } from "react-placeholder/lib/placeholders";

type SongType = {
  track: string;
  image: string;
  url: string;
};

type ArtistType = {
  artist: string;
  image: string;
  url: string;
};

interface AppProps {
  //code related to your props goes here
  match: any;
  history: any;
}

interface AppState {
  image: string;
  artist: string;
  birthday: string;
  genres: string[];
  topSongs: SongType[];
  relatedArtists: ArtistType[];
  profileContent: boolean;
  popularity: string;
  ready: boolean;
}

class ArtistProfile extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      image: placeholder,
      artist: "",
      birthday: "",
      genres: [],
      topSongs: [],
      relatedArtists: [],
      profileContent: false,
      popularity: "",
      ready: false, //true when the component has been mounted
    };
  }

  componentDidMount(): void {
    //This params value is received when a user clicks on an artist's image/table row
    const { artist }: { artist: string } = this.props.match.params;

    //Scrolls to the top of page (which is the navbar)
    ScrollToNavbarTop();

    fetch(`/artistInfo?artist=${artist}`)
      .then((response: any) => response.json())
      .then((data: any) => {
        /* If there are no artists found with the specified name,
         * go to the not-found page
         */
        if (data.length === 0) {
          document.body.style.cursor = "default";
          this.props.history.push("/not-found");
          return;
        }
        let birthday: string;
        let birthdayList: string[] = data[0].BirthdayList;
        if (birthdayList !== undefined) {
          birthdayList.forEach(
            (birthday: string, index: number, array: string[]) => {
              array[index] = convertISODateToString(birthday);
            }
          );

          birthday = birthdayList.toString();
        } else birthday = convertISODateToString(data[0].Birthday);

        this.setState({
          image: data[0].ProfileImage,
          artist: data[0].Artist,
          birthday: birthday,
          genres: data[0].Genre,
          topSongs: data.topSongs, //topSongs is an array
          relatedArtists: data.relatedArtists, //relatedArtists is an array
          ready: true,
          popularity: data[0].Popularity,
        });

        /* Cursor is set to loading before the new profile loads.
         * Once the profile loads, cursor becomes the default
         */
        document.body.style.cursor = "default";
      })
      .catch((err) =>
        console.log("ComponentDidMount (ArtistProfile) - Error", err)
      );
  }

  /*VERY IMPORTANT*/
  /*when you have a component changing the url, you can call this mounting method to update the state*/

  /* important url: https://stackoverflow.com/questions/43351752/react-router-changes-url-but-not-view*/

  componentDidUpdate(prevProps: AppProps, prevState: AppState): void {
    if (this.props.match.params.artist !== prevState.artist) {
      const { artist } = prevProps.match.params;
      fetch(`/artistInfo?artist=${artist}`)
        .then((response) => response.json())
        .then((data) => {
          /* If there are no artists found with the specified name,
           * go to the not-found page
           */
          if (data.length === 0) {
            document.body.style.cursor = "default";
            this.props.history.push("/not-found");
            return;
          }
          let birthday: string;
          let birthdayList: string[] = data[0].BirthdayList;
          if (birthdayList !== undefined) {
            birthdayList.forEach(
              (birthday: string, index: number, array: string[]) => {
                array[index] = convertISODateToString(birthday);
              }
            );

            birthday = birthdayList.toString();
          } else birthday = convertISODateToString(data[0].Birthday);

          this.setState({
            image: data[0].ProfileImage,
            artist: data[0].Artist,
            birthday: birthday,
            genres: data[0].Genre,
            topSongs: data.topSongs, //topSongs is an array
            relatedArtists: data.relatedArtists, //relatedArtists is an array
            ready: true,
            popularity: data[0].Popularity,
          });
          document.body.style.cursor = "default";
        })
        .catch((err) =>
          console.log("ComponentDidUpdate (ArtistProfile) - Error", err)
        );
    }
  }
  render() {
    const {
      image,
      artist,
      birthday,
      genres,
      topSongs,
      relatedArtists,
      popularity,
      ready,
    }: AppState = this.state;

    /* Placeholders until the component is mounted */

    /* Image placeholder is a placeholder for the profile image of an Artist */
    const imagePlaceholder: JSX.Element = (
      <div>
        <RoundShape
          color="gray"
          className="margin-center"
          style={{ width: 160, height: 160 }}
        />
      </div>
    );

    /* Placeholder for 10 tracks that are returned from Spotify*/
    const arrayOfSize10: number[] = new Array(10).fill(0);
    const tracksHolder: JSX.Element = (
      <div>
        <table>
          <tbody>
            {arrayOfSize10.map((arr, index) => (
              <tr className="sweg">
                <td>
                  <img
                    color="gray"
                    className="vertical-align rect-shape"
                    style={{ width: 64, height: 64, backgroundColor: "gray" }}
                    alt=""
                  />
                </td>
                <td>
                  <TextRow color="gray" style={{ width: 125, height: 20 }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

    /* Placeholder for 20 tracks that are returned from Spotify*/
    const arrayOfSize20: number[] = new Array(20).fill(0);
    const artistsHolder: JSX.Element = (
      <div>
        <table className="related-artists-list">
          <tbody>
            {arrayOfSize20.map((arr, index) => (
              <tr className="sweg">
                <td>
                  <img
                    color="gray"
                    className="vertical-align rect-shape"
                    style={{ width: 64, height: 64, backgroundColor: "gray" }}
                    alt=""
                  />
                </td>
                <td>
                  <TextRow color="gray" style={{ width: 125, height: 20 }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

    /* This section displays image, artist name, and birthday */

    const infoSection: JSX.Element = (
      <Fragment>
        <ReactPlaceholder
          showLoadingAnimation
          ready={ready}
          customPlaceholder={imagePlaceholder}
        >
          <img className="image-artist" src={image} alt={artist}></img>
          <div
            className="margin-center"
            style={{ width: "240px", fontSize: "36px" }}
          >
            <div className="artist-profile">
              <span>{artist}</span>
            </div>
          </div>
        </ReactPlaceholder>

        <div
          className="margin-center"
          style={{ width: "200px", fontSize: "36px", maxWidth: "100%" }}
        >
          <ReactPlaceholder showLoadingAnimation ready={ready} type="textRow">
            <div className="info ml-3">
              <u>Birthday</u>: {birthday} <u>Popularity</u>: {popularity}%
            </div>
          </ReactPlaceholder>
        </div>
      </Fragment>
    );

    /* This section displays the genres of the artist */
    const genresSection: JSX.Element = (
      <Fragment>
        <div style={{ width: "240px" }} className="margin-center">
          <ReactPlaceholder ready={ready} rows={2} showLoadingAnimation>
            <div className="info ml-3">
              <u>{genres.length !== 0 ? "Genres" : ""}</u>
            </div>
          </ReactPlaceholder>
        </div>
        <div style={{ width: "350px" }} className="genres-div margin-center">
          <ReactPlaceholder ready={ready} rows={2} showLoadingAnimation>
            <div className="info ml-3">
              <span>{genres.join(", ")}</span>
            </div>
          </ReactPlaceholder>
        </div>
      </Fragment>
    );

    /* This div displays the top 10 songs that are being listened to for this artist */
    const tracksSection: JSX.Element = (
      <div>
        <h2 className="h2-title mt-1" style={{ textAlign: "center" }}>
          Top 10 Songs
        </h2>
        <hr></hr>
        <ReactPlaceholder
          showLoadingAnimation
          ready={ready}
          customPlaceholder={tracksHolder}
        >
          <table>
            <tbody>
              {topSongs.map((song: SongType) => (
                <tr>
                  <td key={song.track} className="li-song">
                    <a
                      href={song.url}
                      title={"Click to listen to " + song.track + " on Spotify"}
                    >
                      <img
                        className="li-song img"
                        src={
                          song.image !== "empty-image.png"
                            ? song.image
                            : emptyImage
                        }
                        alt={song.track}
                      />
                    </a>
                  </td>
                  <td>
                    <span className="span-artist-profile">{song.track}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ReactPlaceholder>
      </div>
    );

    /* This div displays the top 20 related artists */
    const artistsSection: JSX.Element = (
      <div>
        <h2 className="h2-title mt-1 " style={{ textAlign: "center" }}>
          Top 20 Related Artists
        </h2>
        <hr></hr>
        <ReactPlaceholder
          showLoadingAnimation
          ready={ready}
          customPlaceholder={artistsHolder}
        >
          <table className="related-artists-list">
            <tbody>
              {relatedArtists.map((a: ArtistType) => (
                <tr>
                  <td key={a.artist} className="li-artist">
                    <a
                      href={a.url}
                      title={
                        "Click to view " + a.artist + "'s profile on Spotify"
                      }
                    >
                      <img
                        className="li-artist img"
                        src={
                          a.image !== "empty-image.png" ? a.image : emptyImage
                        }
                        alt={a.artist}
                      />{" "}
                    </a>
                  </td>
                  <td>
                    <span aria-label={a.artist} className="span-artist-profile">
                      {a.artist}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ReactPlaceholder>
      </div>
    );

    return (
      <div className="home-display container">
        <div className="col-sm-12 center">
          {infoSection}
          {genresSection}
        </div>

        <div className="col-sm-6">{tracksSection}</div>
        <div className="col-sm-6">{artistsSection}</div>

        {
          <button
            type="button"
            className="btn btn-primary margin-center"
            aria-label="Back to the Top of Table"
            title="Go back to the Top of the Birthdays Table"
            onKeyDown={(e) => {
              if (e.keyCode === 13) ScrollToNavbarTop();
            }}
            onClick={ScrollToNavbarTop}
          >
            Back to Top
          </button>
        }
      </div>
    );
  }
}

export default ArtistProfile;
