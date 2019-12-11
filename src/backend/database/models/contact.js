const mongoose = require("mongoose");

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

module.exports = ContactForm;
