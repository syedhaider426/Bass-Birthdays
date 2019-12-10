const config = require("config");
const db = config.get("db.connect");
const express = require("express");

const app = express();
const router = express.Router();
const cors = require("cors");
const port = config.get("db.port");
const path = require("path");
//const port = process.env.PORT;
app.use(cors());
app.use(express.static(path.join(__dirname, "../../build")));
app.use(express.json());
app.listen(8080);

app.use("/api", router);
const mongoose = require("mongoose");

mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
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

var contactFormSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  comments: {
    type: String
  },
  createdOn: {
    type: Date,
    default: Date.now()
  }
});

var ContactForm = mongoose.model("ContactForm", contactFormSchema);

var birthdayFormSchema = mongoose.Schema({
  name: {
    type: String
  },
  birthday: {
    type: Date
  },
  phoneNumber: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  socials: {
    facebook: {
      type: String
    },
    soundcloud: {
      type: String
    },
    instagram: {
      type: String
    },
    twitter: {
      type: String
    },
    spotify: {
      type: String
    },
    bandcamp: {
      type: String
    }
  },
  comments: {
    type: String
  },
  createdOn: {
    type: Date,
    default: Date.now()
  }
});

var BirthdayForm = mongoose.model("BirthdayForm", birthdayFormSchema);

router.get("/artist", async (req, res) => {
  const result = await Artist.find().sort({ birthday: 1 });
  res.status(200).send(result);
});

router.post("/contact", async (req, res) => {
  const contact = new ContactForm(req.body);
  const result = await contact.save();
  res.status(200).send(result);
});

router.post("/birthday", async (req, res) => {
  const birthdayForm = new BirthdayForm(req.body);
  const result = await birthdayForm.save();
  res.status(200).send(result);
});

app.get("*", function(request, response) {
  response.sendFile(path.resolve(__dirname, "../../build", "index.html"));
});
