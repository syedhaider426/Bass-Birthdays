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

app.get("/artist", async (req, res) => {
  const result = await Artist.find().sort({ birthday: 1 });
  res.status(200).send(result);
});

app.post("/contact", async (req, res) => {
  const contact = new ContactForm(req.body);
  const result = await contact.save();
  res.status(200).send(result);
});

app.post("/birthday", async (req, res) => {
  const birthdayForm = new BirthdayForm(req.body);
  const result = await birthdayForm.save();
  res.status(200).send(result);
});
