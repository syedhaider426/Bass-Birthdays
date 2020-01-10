const AWS = require("aws-sdk");
const config = require("config");
const accessKeyId = config.get("awsAccessKeyId");
const secretAccessKey = config.get("awsSecretAccessKey");
const region = config.get("region");
const toEmail = config.get("toEmail");
const fromEmail = config.get("fromEmail");
const express = require("express");
const router = express.Router();
const Contact = require("../database/models/contacts");

/*https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/js-sdk-dv.pdf*/
AWS.config.update({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: region
});

router.post("/contactInfo", (req, res) => {
  const name = req.query.name;
  const email = req.query.email;
  const comment = req.query.comment;

  /* Useful resource: https://medium.com/@yashoda.charith10/sending-emails-using-aws-ses-nodejs-460b8cc6d0d5*/
  const params = {
    Source: fromEmail,
    Template: "EmailTemplate",
    ConfigurationSetName: "Email_Channel",
    Destination: {
      ToAddresses: [toEmail]
    },
    TemplateData: `{ \"name\":\"${name}\",  \"email\":\"${email}\", \"comment\":\"${comment}\" }`
  };

  // Create the promise and SES service object
  var sendPromise = new AWS.SES({ apiVersion: "2010-12-01" })
    .sendTemplatedEmail(params)
    .promise();

  // Handle promise's fulfilled/rejected states
  sendPromise
    .then(function(data) {
      console.log(data.MessageId);
    })
    .catch(function(err) {
      console.error(err, err.stack);
    });

  const contact = new Contact({ name, email, comment });
  contact.save();
});

module.exports = router;
