const config = require("config");
const db = config.get("db.connect");
const express = require("express");

const app = express();

const cors = require("cors");
const port = config.get("db.port");
//const port = process.env.PORT;
app.use(cors());

app.use(express.json());

app.listen(port, () => console.log(`Connected on port ${port}`));

const mongoose = require("mongoose");
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(err => {
    console.log("Errors", err.message);
  });

//declare schema
//declare model

var artistSchema = mongoose.Schema({
  artist: {
    type: String
  },
  birthday: {
    type: Date
  }
});

var Artist = mongoose.model("Artist", artistSchema);

app.get("/artist", async (req, res) => {
  const result = await Artist.find();
  res.status(200).send(result);
});
