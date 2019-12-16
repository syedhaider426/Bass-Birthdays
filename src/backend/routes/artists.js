const express = require("express");
const router = express.Router();
const rp = require("request-promise"); // "Request" library, used to make post/update/delete requests
const querystring = require("querystring");

const Artist = require("../database/models/artist"); //Artist model

router.get("/artist", async (req, res) => {
  const result = await Artist.find().sort({ birthday: 1 });
  res.status(200).send(result);
});

module.exports = router;
