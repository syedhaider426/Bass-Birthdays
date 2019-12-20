import React, { Component } from "react";

class Carousel extends Component {
  state = { currentArtists: [] };

  componentDidMount() {
    var url;
    if (process.env.NODE_ENV == "production")
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
    if (length == 0) return <h1 className="no-artists">None</h1>;
    return (
      <React.Fragment>
        {currentArtists.map(artist => (
          <div className={"col-sm-6 mx-auto img-wrapper"}>
            <img className="img-fluid" src={artist.profileImage}></img>
            <div className="bottom-left">{artist.artist}</div>
          </div>
        ))}
      </React.Fragment>
    );
  }
}

export default Carousel;
