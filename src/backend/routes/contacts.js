const express = require("express");
const router = express.Router();

const ContactForm = require("../database/models/contact");

router.post("/contact", async (req, res) => {
  const contact = new ContactForm(req.body);
  const result = await contact.save();
  res.status(200).send(result);
});

module.exports = router;
