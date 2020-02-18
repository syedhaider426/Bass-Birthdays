const AWS = require("aws-sdk");
const config = require("config");
const region = config.get("region");
const toEmail = config.get("toEmail");
const fromEmail = config.get("fromEmail");
const configurationSet = config.get("configurationSet");
const express = require("express");
const router = express.Router();
const rp = require("request-promise");
const errorLog = require("../../utils/logger").errorLog;
const successLog = require("../../utils/logger").successLog;
const fetch = require("node-fetch");
/*https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/js-sdk-dv.pdf*/

// This will send the user's contact info to the "toEmail"
router.post("/contactInfo", async (req, res) => {
  var { name, email, comment, recaptchaValue: response } = req.query;
  const url = new URL("https://www.google.com/recaptcha/api/siteverify");
  const secret = config.get("recaptchaServer");
  if (name === "" || email === "" || comment === "") {
    return res.status(400).send("Please enter a name, email, and comment");
  }

  const recaptchaParams = { response, secret };
  url.search = new URLSearchParams(recaptchaParams).toString();
  fetch(url, { method: "POST" });

  /* Useful resource: https://medium.com/@yashoda.charith10/sending-emails-using-aws-ses-nodejs-460b8cc6d0d5*/
  const serverParams = {
    Source: fromEmail,
    Template: "EmailTemplate",
    ConfigurationSetName: configurationSet,
    Destination: {
      ToAddresses: [toEmail]
    },
    TemplateData: `{ \"name\":\"${name}\",  \"email\":\"${email}\", \"comment\":\"${comment}\" }`
  };

  // Create the promise and SES service object
  var sendPromise = new AWS.SES({
    apiVersion: "2010-12-01",
    region: region
  })
    .sendTemplatedEmail(serverParams)
    .promise();

  // Send email and handle promise's fulfilled/rejected states by logging to winston logger
  sendPromise
    .then(function(data) {
      successLog.info(data.MessageId);
      return res.status(200).send("Submitted contact info");
    })
    .catch(function(err) {
      errorLog.error(err, err.stack);
      return res
        .status(400)
        .send("Unable to submit contact info. Please try again.");
    });
});

module.exports = router;
