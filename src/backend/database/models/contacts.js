const mongoose = require("mongoose");

// Creates the schema for contact info
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

// Creates the model for contact info
const Contact = mongoose.model("Contact", contact);

module.exports = Contact;
