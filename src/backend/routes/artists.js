const express = require("express");
const router = express.Router();
const rp = require("request-promise"); // "Request" library, used to make post/update/delete requests
const querystring = require("querystring");

const Artist = require("../database/models/artist"); //Artist model

const config = require("config");
const client_id = config.get("client_id");
const client_secret = config.get("client_secret");

var authOptions = {
  url: "https://accounts.spotify.com/api/token",
  headers: {
    Authorization:
      "Basic " + Buffer.from(client_id + ":" + client_secret).toString("base64")
  },
  form: {
    grant_type: "client_credentials"
  },
  json: true
};
router.get("/artist", async (req, res) => {
  const result = await Artist.find().sort({ Birthday: 1 });
  res.status(200).send(result);
});

router.get("/artistInfo", async (req, res) => {
  const artist = req.query.artist;
  const result = await Artist.find({ Artist: artist })
    .select({
      _id: 0,
      profileImage: 1,
      Artist: 1,
      Birthday: 1,
      Genre: 1,
      spotifyID: 1
    })
    .limit(1); //returns an array
  var spotifyID = result[0].spotifyID;
  // getSpotifyTopTracks(spotifyID).then(trackList => {
  //   var finalResult = Object.assign({}, result, { topSongs: trackList });
  //   res.status(200).send(finalResult);
  // });
  const tracks = await getSpotifyTopTracks(spotifyID);
  const artists = await getSpotifyRelatedArtists(spotifyID);
  var finalResult = Object.assign(
    {},
    result,
    { topSongs: tracks },
    { relatedArtists: artists }
  );

  res.status(200).send(finalResult);
});

/*https://stackoverflow.com/questions/47341603/async-await-with-request-promise-returns-undefined*/

async function getSpotifyTopTracks(spotifyID) {
  var token = "";
  await rp.post(authOptions, async function(error, response, body) {
    if (!error && response.statusCode === 200) {
      token = body.access_token; // use the access token to access the Spotify Web API
    }
  });
  var query = querystring.stringify({
    country: "US"
  });
  var options = {
    url:
      "https://api.spotify.com/v1/artists/" +
      spotifyID +
      "/top-tracks?" +
      query,
    headers: {
      Authorization: "Bearer " + token
    },
    json: true
  };
  return await rp.get(options).then(function(response) {
    var tracks = [];
    for (var x = 0; x < response.tracks.length; x++) {
      var track = response.tracks[x].name;
      var image = response.tracks[x].album.images[0].url;
      var url = response.tracks[x].external_urls.spotify;
      tracks.push({
        track: track,
        image: image,
        url: url
      });
    }
    return tracks;
  });
}

async function getSpotifyRelatedArtists(spotifyID) {
  var token = "";
  await rp.post(authOptions, async function(error, response, body) {
    if (!error && response.statusCode === 200) {
      token = body.access_token; // use the access token to access the Spotify Web API
    }
  });
  var options = {
    url: "https://api.spotify.com/v1/artists/" + spotifyID + "/related-artists",
    headers: {
      Authorization: "Bearer " + token
    },
    json: true
  };
  return await rp.get(options).then(function(response) {
    var artists = [];
    for (var x = 0; x < response.artists.length; x++) {
      var artist = response.artists[x].name;
      var image = response.artists[x].images[0].url;
      var external_urls = response.artists[x].external_urls.spotify;
      artists.push({
        artist: artist,
        image: image,
        url: external_urls
      });
    }
    return artists;
  });
}

router.get("/currentArtist", async (req, res) => {
  var date = req.query.date;
  var month = req.query.month;
  var year = new Date().getFullYear();
  var today = new Date(year, month, date);
  var tomorrow = new Date(year, month, date);
  tomorrow.setDate(today.getDate() + 1);

  today.setHours(0, 0, 0, 0);
  tomorrow.setHours(0, 0, 0, 0);
  var isoToday = today.toISOString();
  var isoTomorrow = tomorrow.toISOString();

  const result = await Artist.find({
    Birthday: {
      $gte: isoToday,
      $lt: isoTomorrow
    }
  });
  res.status(200).send(result);
});

module.exports = router;
