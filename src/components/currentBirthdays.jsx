import React, { Component } from "react";

class CurrentBirthdays extends Component {
  state = { currentArtists: [] };

  componentDidMount() {
    var url;
    if (process.env.NODE_ENV === "production")
      url = "https://dubstepdata.info/currentArtist";
    else url = "http://localhost:8080/currentArtist";
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({ currentArtists: data });
      });
  }

  render() {
    const { currentArtists } = this.state;
    const length = currentArtists.length;
    if (length === 0) return <h1 className="no-artists">None</h1>;
    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  }
}

export default CurrentBirthdays;
