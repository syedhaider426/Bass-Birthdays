const express = require("express");
const router = express.Router();
const rp = require("request-promise"); // "Request" library, used to make post/update/delete requests
const querystring = require("querystring");

const Artist = require("../database/models/artist"); //Artist model

const config = require("config");
const client_id = config.get("client_id");
const client_secret = config.get("client_secret");

async function getArtist() {
  const result = await Artist.find().select({
    Artist: 1,
    SpotifyID: 1,
    _id: 1
  });

  return result;
}

async function doIt() {
  const result = await getArtist();
  var token = "";
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64")
    },
    form: {
      grant_type: "client_credentials"
    },
    json: true
  };
  await rp.post(authOptions, async function(error, response, body) {
    if (!error && response.statusCode === 200) {
      token = body.access_token; // use the access token to access the Spotify Web API
    }
  });
  console.log(result.length);
  for (var x = 0; x < result.length; x++) {
    var options = {
      url: "https://api.spotify.com/v1/artists/" + result[x].SpotifyID,
      headers: {
        Authorization: "Bearer " + token
      },
      json: true
    };
    console.log(x + ". " + result[x].Artist);
    console.log("made it here");
    await rp.get(options).then(async function(response) {
      console.log("RESPONSE:", response);
      console.log(response.genres);
      var blah = await Artist.updateOne(
        { _id: result[x]._id },
        { $set: { Genre: response.genres } }
      );
      console.log(blah);
    });
  }
}

//imagesList
async function generateNewImages() {
  const result = Artist.find().select({ ProfileImage: 1 });
  for (item in result) {
    console.log("Item", item);
    var arr = [item.ProfileImage];
    var blah = await Artist.updateOne(
      { _id: item._id },
      { $set: { imageList: arr } }
    );
    console.log(blah);
  }
}

async function getImages() {
  const result = await getArtist();
  var token = "";
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64")
    },
    form: {
      grant_type: "client_credentials"
    },
    json: true
  };
  await rp.post(authOptions, async function(error, response, body) {
    if (!error && response.statusCode === 200) {
      token = body.access_token; // use the access token to access the Spotify Web API
    }
  });

  for (var x = 0; x < result.length; x++) {
    var options = {
      url: "https://api.spotify.com/v1/artists/" + result[x].SpotifyID,
      headers: {
        Authorization: "Bearer " + token
      },
      json: true
    };
    console.log(x + ". " + result[x].Artist);
    await rp.get(options).then(async function(response) {
      var image = response.images[2].url;
      var blah = await Artist.updateOne(
        { _id: result[x]._id },
        { $set: { ProfileImage: image } }
      );
    });
  }
}

doIt();
//getImages();

async function byeas() {
  const result = await Artist.find({ Birthday: { $exists: true } }).sort({
    Birthday: 1
  });
  var res;
  console.log(result.length);
  for (var x = 0; x < result.length; x++) {
    var bday = result[x].Birthday;
    if (
      bday > new Date("2020", "1", "20") &&
      bday < new Date("2020", "2", "18")
    ) {
      res = await Artist.update(
        { _id: result[x]._id },
        { $set: { Horoscope: "Aquarius" } }
      );
    } else if (
      bday > new Date("2020", "2", "19") &&
      bday < new Date("2020", "3", "20")
    ) {
      res = await Artist.update(
        { _id: result[x]._id },
        { $set: { Horoscope: "Pisces" } }
      );
    } else if (
      bday > new Date("2020", "3", "21") &&
      bday < new Date("2020", "4", "19")
    ) {
      res = await Artist.update(
        { _id: result[x]._id },
        { $set: { Horoscope: "Aries" } }
      );
    } else if (
      bday > new Date("2020", "4", "20") &&
      bday < new Date("2020", "5", "20")
    ) {
      res = await Artist.update(
        { _id: result[x]._id },
        { $set: { Horoscope: "Taurus" } }
      );
    } else if (
      bday > new Date("2020", "5", "21") &&
      bday < new Date("2020", "6", "20")
    ) {
      res = await Artist.update(
        { _id: result[x]._id },
        { $set: { Horoscope: "Gemini" } }
      );
    } else if (
      bday > new Date("2020", "6", "21") &&
      bday < new Date("2020", "7", "22")
    ) {
      res = await Artist.update(
        { _id: result[x]._id },
        { $set: { Horoscope: "Cancer" } }
      );
    } else if (
      bday > new Date("2020", "7", "23") &&
      bday < new Date("2020", "8", "22")
    ) {
      res = await Artist.update(
        { _id: result[x]._id },
        { $set: { Horoscope: "Leo" } }
      );
    } else if (
      bday > new Date("2020", "8", "23") &&
      bday < new Date("2020", "9", "22")
    ) {
      res = await Artist.update(
        { _id: result[x]._id },
        { $set: { Horoscope: "Virgo" } }
      );
    } else if (
      bday > new Date("2020", "9", "23") &&
      bday < new Date("2020", "10", "22")
    ) {
      res = await Artist.update(
        { _id: result[x]._id },
        { $set: { Horoscope: "Libra" } }
      );
    } else if (
      bday > new Date("2020", "10", "23") &&
      bday < new Date("2020", "11", "21")
    ) {
      res = await Artist.update(
        { _id: result[x]._id },
        { $set: { Horoscope: "Scorpio" } }
      );
    } else if (
      bday > new Date("2020", "11", "22") &&
      bday < new Date("2020", "12", "21")
    ) {
      res = await Artist.update(
        { _id: result[x]._id },
        { $set: { Horoscope: "Sagittarius" } }
      );
    } else {
      res = await Artist.update(
        { _id: result[x]._id },
        { $set: { Horoscope: "Capricorn" } }
      );
    }
    console.log(res);
  }
  console.log("Done");
}
//byeas();

async function doIt2() {
  const result = await getArtist();
  var token = "";
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64")
    },
    form: {
      grant_type: "client_credentials"
    },
    json: true
  };
  await rp.post(authOptions, async function(error, response, body) {
    if (!error && response.statusCode === 200) {
      token = body.access_token; // use the access token to access the Spotify Web API
    }
  });
  console.log(result.length);
  for (var x = 0; x < result.length; x++) {
    var options = {
      url: "https://api.spotify.com/v1/artists/" + result[x].SpotifyID,
      headers: {
        Authorization: "Bearer " + token
      },
      json: true
    };
    console.log(x + ". " + result[x].Artist);
    await rp.get(options).then(async function(response) {
      console.log(response.popularity);
      var blah = await Artist.updateOne(
        { _id: result[x]._id },
        { $set: { Popularity: response.popularity } }
      );
      //console.log(blah);
    });
  }
}
//doIt2();
module.exports = router;
