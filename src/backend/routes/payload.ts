import express, { Request, Response, Router } from "express";
import { exec } from "child_process";

export const router: Router = express.Router();

//Github webhooks; endpoint is responsible for pulling commits on server.
router.post("/payload", (req: Request, res: Response) => {
  exec("sh deploy.sh", (err: any, stdout: any, stderr: any) => {
    if (err) {
      return res.status(500).send(err); //send a HTTP response of 500 if it is unsuccessful
    }
    return res.status(200).send("Succesfully pulled commits"); //send a HTTP response of 200 if it is successful
  });
  return null;
});
