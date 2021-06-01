import mongoose from "mongoose";
import { keys } from "../config/keys";

// "Initializes" the database
module.exports = () => {
  mongoose.connect(keys.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
