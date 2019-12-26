import React, { Component } from "react";
import FooterBirthdays from "./footerBirthdays";

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
    image: "",
    artist: "",
    birthday: "",
    genres: [],
    topSongs: [],
    relatedArtists: []
  };

  componentDidMount() {
    const { artist } = this.props.match.params;
    console.log(artist);
    var params = { artist: artist };
    url.search = new URLSearchParams(params).toString();
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          image: data[0].profileImage,
          artist: data[0].Artist,
          birthday: convertISODateToString(data[0].Birthday),
          genres: data[0].Genre,
          topSongs: data.topSongs,
          relatedArtists: data.relatedArtists
        });
      });
  }
  /*VERY IMPORTANT*/
  /*when you have a component changing the url, you can call
this mounting method to update the state*/

  /* important url: https://stackoverflow.com/questions/43351752/react-router-changes-url-but-not-view*/

  componentWillReceiveProps(nextProps) {
    const { artist } = nextProps.match.params;
    console.log(artist);
    var params = { artist: artist };
    url.search = new URLSearchParams(params).toString();
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          image: data[0].profileImage,
          artist: data[0].Artist,
          birthday: convertISODateToString(data[0].Birthday),
          genres: data[0].Genre,
          topSongs: data.topSongs,
          relatedArtists: data.relatedArtists
        });
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

    if (topSongs.length <= 0)
      return (
        <React.Fragment>
          <div className="container">
            <div className="home-display">
              <div className="col-6">
                <h1>Page Not Found</h1>
                <div className="text-center jumbotron">
                  <h1>Oops!</h1>
                  <p>
                    Visit our homepage to browse through our site or search for
                    an artist or date below
                  </p>
                  <input type="text"></input>
                </div>
              </div>
              <div className="col-6">
                <FooterBirthdays />
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    return (
      <React.Fragment>
        <div className="home-display">
          <div className="col-md-4 container">
            <img className="image-artist" src={image}></img>
            <div className="center-info">
              <div>
                <label className="artist-name">Name: </label>
                <div className="divider" />
                <label className="artist-name">{artist}</label>
              </div>
              <div>
                <label className="birthday-date">Birthday: </label>
                <div className="divider" />
                <label className="birthday-date">{birthday}</label>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div>
              <h2 className="h2-title">
                <u>Genres </u>
              </h2>
              <ol>
                {genres.map(genre => (
                  <li key={genre} className="li-genre">
                    {genre}
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h2 className="h2-title">
                <u>Top 10 Songs</u>{" "}
              </h2>
              <ol>
                {topSongs.map(song => (
                  <li key={song.track} className="li-song">
                    <a href={song.url}>
                      <img
                        className="li-song img"
                        src={song.image}
                        alt={song.track}
                      />{" "}
                      {song.track}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="col-md-4">
            <div>
              <h2 className="h2-title">
                <u>Top 20 Related Artists</u>{" "}
              </h2>
              <ol className="related-artists-list">
                {relatedArtists.map(a => (
                  <li key={a.artist} className="li-artist">
                    <a href={a.url}>
                      <img
                        className="li-artist img"
                        src={a.image}
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
        <FooterBirthdays />
      </React.Fragment>
    );
  }
}

export default ArtistProfile;
