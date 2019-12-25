const express = require("express");
const router = express.Router();
const rp = require("request-promise"); // "Request" library, used to make post/update/delete requests
const querystring = require("querystring");

const Artist = require("../database/models/artist"); //Artist model

router.get("/artist", async (req, res) => {
  const result = await Artist.find().sort({ Birthday: 1 });
  res.status(200).send(result);
});

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
