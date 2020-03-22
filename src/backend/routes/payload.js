const express = require("express");
const router = express.Router();

//Github webhooks
router.post("/payload", (req, res) => {
  const sender = req.body.sender; //sender = who made the push
  childProcess.exec("cd / && ./deploy.sh");
  if (sender.login === "syedhaider426") {
    childProcess.exec("cd / && ./deploy.sh", (err, stdout, stderr) => {
      if (err) return res.send(500); //if the push was not successful, send an error code
      res.send(200); //send a success code for push
    });
  }
});
export default router;
