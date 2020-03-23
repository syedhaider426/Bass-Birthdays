const express = require("express");
const router = express.Router();
const { exec } = require("child_process");

//Github webhooks; endpoint is responsible for pulling commits on server.
router.post("/payload", (req, res) => {
  exec("sh deploy.sh", (err, stdout, stderr) => {
    if (err) {
      return res.status(500).send(err); //send a HTTP response of 500 if it is unsuccessful
    }
    res.status(200).send("Succesfully pulled commits"); //send a HTTP response of 200 if it is successful
  });
});

module.exports = router;
