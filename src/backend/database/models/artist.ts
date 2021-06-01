import {model,Schema} from "mongoose";

export interface IArtist extends Document{
  Artist: String
  Birthday: Date,
  SpotifyID: string,
  ProfileImage: String,
  Genre: [String],
  Twitter: String,
  Horoscope: String,
  Popularity: Number
}

// Creates the schema for an Artist
//https://thecodebarbarian.com/working-with-mongoose-in-typescript.html
const artistSchema:Schema = new Schema({
  Artist: {
    type: String,
    required:true
  },
  Birthday: {
    type: Date,
    required:true
  },
  SpotifyID: {
    type: String,
    required:true
  },
  ProfileImage: {
    type: String,
    required:true
  },
  Genre: {
    type: [String],
    required:true
  },
  Twitter: {
    type: String,
    required:true
  },
  Horoscope: {
    type: String,
    required:true
  },
  Popularity: {
    type: Number,
    required:true
  }
});

// Creates the model for an Artist
export default model<IArtist>("Artist", artistSchema);

