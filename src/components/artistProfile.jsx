import React, { Component } from "react";
import emptyImage from "../images/empty-image.png";
import placeholder from "../images/picture-placeholder.png";

var url;
if (process.env.NODE_ENV === "production")
  url = new URL("https://dubstepdata.info/artistInfo");
else url = new URL("http://localhost:8080/artistInfo");

function convertISODateToString(date) {
  var dateString = date.substring(0, 10);
  var month = dateString.substring(5, 7);
  date = dateString.substring(8);
  dateString = month + "/" + date;
  return dateString;
}

class ArtistProfile extends Component {
  state = {
    image: placeholder,
    artist: "",
    birthday: "",
    genres: [],
    topSongs: ["", "", "", "", "", "", "", "", "", ""],
    relatedArtists: [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ],
    profileContent: false
  };

  componentDidMount() {
    const { artist } = this.props.match.params;
    document.getElementById("navbar").scrollIntoView();
    var params = { artist: artist };
    url.search = new URLSearchParams(params).toString();
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.length === 0) {
          this.props.history.push("/not-found");
          return;
        }
        this.setState({ genres: [] });
        this.setState({
          image: data[0].profileImage,
          artist: data[0].Artist,
          birthday: "Birthday: " + convertISODateToString(data[0].Birthday),
          genres: data[0].Genre,
          topSongs: data.topSongs,
          relatedArtists: data.relatedArtists
        });
        document.body.style.cursor = "default";
      });
  }
  /*VERY IMPORTANT*/
  /*when you have a component changing the url, you can call
this mounting method to update the state*/

  /* important url: https://stackoverflow.com/questions/43351752/react-router-changes-url-but-not-view*/

  componentWillReceiveProps(nextProps) {
    const { artist } = nextProps.match.params;
    console.log("Artist", artist);
    var params = { artist: artist };
    url.search = new URLSearchParams(params).toString();
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        document.body.style.cursor = "default";
        if (data[0].Artist.length > 0) {
          this.setState({
            image: data[0].profileImage,
            artist: data[0].Artist,
            birthday: convertISODateToString(data[0].Birthday),
            genres: data[0].Genre,
            topSongs: data.topSongs,
            relatedArtists: data.relatedArtists
          });
        }
      });
  }
  render() {
    const {
      image,
      artist,
      birthday,
      genres,
      topSongs,
      relatedArtists
    } = this.state;

    return (
      <React.Fragment>
        <div className="home-display">
          <div className="col-sm-3">
            <span>
              <i>
                * Data sourced from{" "}
                <a
                  className="spotify-web-api"
                  href="https://developer.spotify.com/documentation/web-api/"
                >
                  Spotify Web API
                </a>
              </i>
            </span>
            <img className="image-artist" src={image} alt={artist}></img>
            <div className="artist-profile">{artist}</div>
            <div className="info ml-3">{birthday}</div>
            <div>
              <div className="info ml-3">
                <u>Genres</u>
              </div>
              <ul>
                {genres.map(genre => (
                  <li key={genre} className="li-genre">
                    {genre}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-sm-4">
            <div>
              <h2 className="h2-title">Top 10 Songs</h2>
              <hr></hr>
              <ol>
                {topSongs.map((song, index) => (
                  <li key={song.track} className="li-song">
                    <a href={song.url}>
                      <img
                        className="li-song img"
                        src={song.image}
                        alt={song.track}
                      />
                      {song.track}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="col-sm-4">
            <div>
              <h2 className="h2-title">Top 20 Related Artists</h2>
              <hr></hr>
              <ol className="related-artists-list">
                {relatedArtists.map(a => (
                  <li key={a.artist} className="li-artist">
                    <a href={a.url}>
                      <img
                        className="li-artist img"
                        src={
                          a.image !== "empty-image.png" ? a.image : emptyImage
                        }
                        alt={a.artist}
                      />
                      {a.artist}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ArtistProfile;
