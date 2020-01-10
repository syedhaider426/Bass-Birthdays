const mongoose = require("mongoose");

const contact = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  }
});

const Contact = mongoose.model("Contact", contact);

module.exports = Contact;
