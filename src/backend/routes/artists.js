const express = require("express");
const router = express.Router();

const Artist = require("../database/models/artist").default;

router.get("/artist", async (req, res) => {
  const result = await Artist.find().sort({ birthday: 1 });
  res.status(200).send(result);
});

module.exports = router;
