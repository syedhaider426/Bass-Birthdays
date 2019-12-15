const express = require("express");
const router = express.Router();
const rp = require("request-promise"); // "Request" library, used to make post/update/delete requests
const querystring = require("querystring");

const Artist = require("../database/models/artist");

router.get("/artist", async (req, res) => {
  const result = await Artist.find().sort({ birthday: 1 });
  res.status(200).send(result);
});

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

async function getArtists() {
  const result = await Artist.find({}, { artist: 1, spotifyID: 1 }).sort({
    birthday: 1
  });

  return result;
}

async function getSpotifyID(array) {
  var token = "";
  rp.post(authOptions, async function(error, response, body) {
    if (!error && response.statusCode === 200) {
      token = body.access_token; // use the access token to access the Spotify Web API
    }
    for (var x = 0; x < array.length; x++) {
      var artistName = array[x].artist;
      var query;
      var endingIndex = artistName.length;
      var startParantheses = artistName.indexOf("(");
      if (startParantheses != -1) endingIndex = startParantheses;
      query = querystring.stringify({
        query: artistName.substring(0, endingIndex),
        type: "artist"
      });
      var options = {
        url: "https://api.spotify.com/v1/search?" + query,
        headers: {
          Authorization: "Bearer " + token
        },
        json: true
      };
      await getRequestForSpotifyID(options);
    }
  });
}

async function getRequestForSpotifyID(options) {
  await rp
    .get(options, async function(error, response, body) {
      if (!error && response.statusCode === 200 && body.artists.total > 0) {
        const artist = body.artists.items[0].name;
        const spotifyID = body.artists.items[0].id;
        const genres = body.artists.items[0].genres;
        var profileImage = body.artists.items[0].images[2].url;
        if (profileImage == "undefined") profileImage = "";
        // console.log(spotifyID);
        // console.log(genres);
        // console.log(artist);
        // console.log(profileImage);
        // console.log("----------------");
        const _id = await Artist.find({
          artist: artist
        })
          .limit(1)
          .select({ _id: 1 });
        const result = await Artist.updateMany(
          { _id },
          {
            $set: {
              artist,
              spotifyID,
              genres,
              profileImage
            }
          }
        );
        //console.log(result);
      }
    })
    .catch(err => console.log("Error", err));
}

async function SerialFlow() {
  const artists = await getArtists();
  await getSpotifyID(artists);
  return;
}

module.exports = router;

//SerialFlow();

async function getSpotifyID(array) {
  var token = "";
  rp.post(authOptions, async function(error, response, body) {
    if (!error && response.statusCode === 200) {
      token = body.access_token; // use the access token to access the Spotify Web API
    }
    for (var x = 0; x < array.length; x++) {
      var artistName = array[x].artist;
      var query;
      var endingIndex = artistName.length;
      var startParantheses = artistName.indexOf("(");
      if (startParantheses != -1) endingIndex = startParantheses;
      query = querystring.stringify({
        query: artistName.substring(0, endingIndex),
        type: "artist"
      });
      var options = {
        url: "https://api.spotify.com/v1/search?" + query,
        headers: {
          Authorization: "Bearer " + token
        },
        json: true
      };
      await getRequestForSpotifyID(options);
    }
  });
}

async function getArtistsWOProfileImage() {
  const result = await Artist.find({
    $expr: { $gt: [{ $strLenCP: "$spotifyID" }, 0] },
    profileImage: ""
  })
    .sort({ birthday: 1 })
    .select({ artist: 1, spotifyID: 1 });

  return result;
}

async function SerialFlow2() {
  const artists = await getArtists();
  await getSpotifyProfileImage(artists);
  return;
}

async function getSpotifyProfileImage(array) {
  var token = "";
  rp.post(authOptions, async function(error, response, body) {
    if (!error && response.statusCode === 200) {
      token = body.access_token; // use the access token to access the Spotify Web API
    }
    for (var x = 0; x < array.length; x++) {
      var query = array[x].spotifyID;
      var options = {
        url: "https://api.spotify.com/v1/artists/" + query,
        headers: {
          Authorization: "Bearer " + token
        },
        json: true
      };
      await getRequestForSpotifyImage(options);
    }
  });
}

async function getRequestForSpotifyImage(options) {
  await rp
    .get(options, async function(error, response, body) {
      if (!error && response.statusCode === 200) {
        const profileImage = body.images[2].url;
        const _id = await Artist.find({
          artist: body.name
        })
          .limit(1)
          .select({ _id: 1 });
        console.log(body.name);
        const result = await Artist.updateOne(
          { _id },
          {
            $set: {
              profileImage
            }
          }
        );
      }
    })
    .catch(err => console.log("Error", err));
}

SerialFlow2();
