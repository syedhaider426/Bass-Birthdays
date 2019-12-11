const express = require("express");
const router = express.Router();

const BirthdayForm = require("../database/models/birthday");

router.post("/birthday", async (req, res) => {
  const birthdayForm = new BirthdayForm(req.body);
  const result = await birthdayForm.save();
  res.status(200).send(result);
});

module.exports = router;
