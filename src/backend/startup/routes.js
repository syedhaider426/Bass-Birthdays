const express = require("express");
const artists = require("../routes/artists");
const contact = require("../routes/contact");
const twitter = require("../routes/twitter");
//const scripts = require("../routes/scripts");
const cors = require("cors");
const childProcess = require("child_process");
const path = require("path");

// "Initializes" the routes
module.exports = function(app) {
  app.use(express.json());

  /* https://medium.com/@alexishevia/using-cors-in-express-cac7e29b005b */
  // Skips the same-origin policy
  // Access resources from remote hosts
  app.use(cors());
  app.use(express.static(path.join(__dirname, "../../../build")));

  // Routes used to get information about artists
  app.use("/", artists);

  // Route used to send contact info
  app.use("/", contact);

  // Route used to get data from the Spotify API
  //app.use("/", scripts);

  // Cron-job for twitter bot to keep running
  twitter.cronjob();

  //Github webhooks
  app.post("/payload", (req, res) => {
    const sender = req.body.sender; //sender = who made the push
    const branch = req.body.ref; //branch = what branch is being pushed to

    if (branch === "master" && sender.login === "syedhaider426") {
      childProcess.exec("cd / && ./deploy.sh", (err, stdout, stderr) => {
        if (err) return res.send(500); //if the push was not successful, send an error code
        res.send(200); //send a success code for push
      });
    }
  });

  // Used to display index.html on the front-end
  app.get("*", function(req, res) {
    res.sendFile(path.resolve(__dirname, "../../../build", "index.html"));
  });
};
