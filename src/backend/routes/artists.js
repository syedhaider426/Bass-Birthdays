const express = require("express");
const router = express.Router();
const rp = require("request-promise"); // "Request" library, used to make post/update/delete requests
const querystring = require("querystring");

const Artist = require("../database/models/artist"); //Artist model

const config = require("config");

/* Spotify credentials */
const client_id = config.get("client_id");
const client_secret = config.get("client_secret");

/* Client talkes to Spotify and asks for OAuth token */
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

/* Gets all artists (as well as all fields) and sorts birthdays in ascending order */
router.get("/artist", async (req, res) => {
  const result = await Artist.find().sort({ Birthday: 1 });
  res.status(200).send(result);
});

/* Gets all artists (only artist field) and sorts artists in ascending order */
router.get("/artistOnly", async (req, res) => {
  const result = await Artist.find()
    .sort({ Artist: 1 })
    .select({ Artist: 1, _id: 0 });
  res.status(200).send(result);
});

/* Gets the artists who birthday it is */
router.get("/currentArtist", async (req, res) => {
  // date/month are passed in from React
  const { date, month } = req.query;

  //gets current year as dates are stored with the current year
  const year = new Date().getFullYear();

  const today = new Date(year, month, date);
  const tomorrow = new Date(year, month, date);

  //sets the next day
  tomorrow.setDate(today.getDate() + 1);

  // time does not matter when comparing current date to birthday
  today.setHours(0, 0, 0, 0);
  tomorrow.setHours(0, 0, 0, 0);

  // mongodb stores dates in ISO-format
  const isoToday = today.toISOString();
  const isoTomorrow = tomorrow.toISOString();

  //gets the artists for the date passed in
  const result = await Artist.find({
    Birthday: {
      $gte: isoToday,
      $lt: isoTomorrow
    }
  });
  res.status(200).send(result);
});

/* Gets info about artist from Spotify */
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
  if (result.length == 0) {
    res.status(400).send(result);
    return;
  }
  //result[0] because even though one element is getting returned, it's an array
  const spotifyID = result[0].spotifyID;

  //Gets the top 10 tracks produced by the artist
  const tracks = await getSpotifyTopTracks(spotifyID);

  //Gets the top 20 related artists
  const artists = await getSpotifyRelatedArtists(spotifyID);
  const finalResult = Object.assign(
    {},
    result,
    { topSongs: tracks },
    { relatedArtists: artists }
  );

  res.status(200).send(finalResult);
});

/*https://stackoverflow.com/questions/47341603/async-await-with-request-promise-returns-undefined*/

/* Gets the top 10 tracks produced by the artist
 * Params: SpotifyID of the artist
 */
async function getSpotifyTopTracks(spotifyID) {
  var token = "";

  /* Spotify needs a token in order to do requests to their API .
   * This post request will get a valid token
   */
  await rp.post(authOptions, async function(error, response, body) {
    if (!error && response.statusCode === 200) {
      token = body.access_token; // use the access token to access the Spotify Web API
    }
  });
  const query = querystring.stringify({
    country: "US"
  });

  /* Using this url, and the headers, get the top tracks
   * for an artist
   */
  const options = {
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

  // Gets the track name, album/song image, and the link to the song
  return await rp.get(options).then(function(response) {
    const tracks = [];

    for (var x = 0; x < response.tracks.length; x++) {
      var track = response.tracks[x].name;
      var image = response.tracks[x].album.images[0].url;
      var trackURL = response.tracks[x].external_urls.spotify;
      tracks.push({
        track: track,
        image: image,
        url: trackURL
      });
    }
    return tracks;
  });
}

/* Gets the top 20 related artists
 * Params: SpotifyID of the artist
 */
async function getSpotifyRelatedArtists(spotifyID) {
  var token = "";

  /* Spotify needs a token in order to do requests to their API .
   * This post request will get a valid token
   */
  await rp.post(authOptions, async function(error, response, body) {
    if (!error && response.statusCode === 200) {
      token = body.access_token; // use the access token to access the Spotify Web API
    }
  });

  /* Using this url, and the headers, get the top tracks
   * for an artist
   */
  var options = {
    url: "https://api.spotify.com/v1/artists/" + spotifyID + "/related-artists",
    headers: {
      Authorization: "Bearer " + token
    },
    json: true
  };

  // Gets the artist name, artist profile image, and link to artist
  return await rp.get(options).then(function(response) {
    var artists = [];

    for (var x = 0; x < response.artists.length; x++) {
      var artist = response.artists[x].name;
      var image = "";
      if (response.artists[x].images[0] === undefined) {
        image = "empty-image.png";
      } else image = response.artists[x].images[0].url;
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

module.exports = router;
