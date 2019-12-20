const express = require("express");
const router = express.Router();
const rp = require("request-promise"); // "Request" library, used to make post/update/delete requests
const querystring = require("querystring");

const Artist = require("../database/models/artist"); //Artist model

router.get("/artist", async (req, res) => {
  const result = await Artist.find().sort({ birthday: 1 });
  res.status(200).send(result);
});

router.get("/currentArtist", async (req, res) => {
  var today = new Date(2019, 9, 25);
  var tomorrow = new Date(2019, 10, 26);
  tomorrow.setDate(today.getDate() + 1);

  today.setHours(0, 0, 0, 0);
  tomorrow.setHours(0, 0, 0, 0);
  var isoToday = today.toISOString();
  var isoTomorrow = tomorrow.toISOString();

  const result = await Artist.find({
    birthday: {
      $gte: isoToday,
      $lt: isoTomorrow
    }
  }).limit(4);
  res.status(200).send(result);
});

module.exports = router;
