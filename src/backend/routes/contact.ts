import AWS from "aws-sdk";
import { keys } from "../config/keys";
import express, { Router, Request, Response } from "express";
import fetch from "node-fetch";
import { PromiseResult } from "aws-sdk/lib/request";

const region = keys.region;
const toEmail = keys.toEmail;
const fromEmail = keys.fromEmail;
const configurationSet = keys.configurationSet;
const secret = keys.recaptchaServer;

export const router: Router = express.Router();

/*https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/js-sdk-dv.pdf*/

// This will send the user's contact info to the "toEmail"
router.post("/contactInfo", async (req: Request, res: Response) => {
  const { name, email, comment, recaptchaValue: response } = req.query;

  if (name === "" || email === "" || comment === "") {
    return res.status(400).send("Please enter a name, email, and comment");
  }

  fetch(
    `https://www.google.com/recaptcha/api/siteverify?response=${response}&secret=${secret}`,
    { method: "POST" }
  );

  /* Useful resource: https://medium.com/@yashoda.charith10/sending-emails-using-aws-ses-nodejs-460b8cc6d0d5*/
  const serverParams: {
    Source: string;
    Template: string;
    ConfigurationSetName: string;
    Destination: {
      ToAddresses: [string];
    };
    TemplateData: string;
  } = {
    Source: fromEmail,
    Template: "EmailTemplate",
    ConfigurationSetName: configurationSet,
    Destination: {
      ToAddresses: [toEmail],
    },
    TemplateData: `{ \"name\":\"${name}\",  \"email\":\"${email}\", \"comment\":\"${comment}\" }`,
  };

  // Create the promise and SES service object
  const sendPromise: Promise<
    PromiseResult<AWS.SES.SendTemplatedEmailResponse, AWS.AWSError>
  > = new AWS.SES({
    apiVersion: "2010-12-01",
    region: region,
  })
    .sendTemplatedEmail(serverParams)
    .promise();

  // Send email and handle promise's fulfilled/rejected states by logging to winston logger
  let err: boolean = false;
  sendPromise
    .then((data) => {
      err = false;
    })
    .catch((err) => {
      err = true;
    });

  if (err)
    return res
      .status(400)
      .send("Unable to submit contact info. Please try again.");
  return res.status(200).send("Submitted contact info");
});
