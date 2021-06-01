import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import { Request, Response, Application } from "express";
import { router as artists } from "../routes/artists";
import { router as payload } from "../routes/payload";
import { router as contact } from "../routes/contact";

// "Initializes" the routes
module.exports = function (app: Application) {
  app.use(express.json());

  /* https://medium.com/@alexishevia/using-cors-in-express-cac7e29b005b */
  // Skips the same-origin policy
  // Access resources from remote hosts
  app.use(cors());
  app.use(helmet());

  app.use(express.static(path.join(__dirname, "../../../build")));

  // Routes used to get information about artists
  app.use("/", artists);

  // Route used to send contact info
  app.use("/", contact);

  // Route used for webhooks
  app.use("/", payload);

  // Used to display index.html on the front-end
  app.get("*", function (req: Request, res: Response) {
    res.sendFile(path.resolve(__dirname, "../../../build", "index.html"));
  });
};
