const mongoose = require("mongoose");

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

module.exports = BirthdayForm;
