import Artist, { IArtist } from "../database/models/artist";
import { keys } from "../config/keys";
import Twit from "twit";
import { errorLog, twitterLog } from "../utils/logger";

// Configuration details to post/get from Twitter
var twitterConfig = {
    twitter: {
      consumer_key: keys.consumer_key,
      consumer_secret: keys.consumer_secret,
      access_token: keys.access_token,
      access_token_secret: keys.access_token_secret,
    },
  },
  T = new Twit(twitterConfig.twitter);

async function getCurrentBirthdayTweet() {
  //Gets current date and tomorrow's date
  const today: Date = new Date();
  const tomorrow: Date = new Date();
  tomorrow.setDate(today.getDate() + 1);

  // This is done because there is no need to worry about the hours
  today.setHours(0, 0, 0, 0);
  tomorrow.setHours(0, 0, 0, 0);

  //gets the artists for the date passed in
  const result: Array<IArtist> = await Artist.find({
    Birthday: {
      $gte: today,
      $lt: tomorrow,
    },
  }).select({ Twitter: 1, _id: 0 });

  //Create tweet will combine all the artists returned from query
  createTweet(result);
}

// Creates tweet for all the artists whose birthday it is
function createTweet(result: Array<IArtist>) {
  let tweet: string = "Happy Birthday ";
  if (tweet === "Happy Birthday " && result.length === 0) {
    tweet = "No Birthdays Today :(";
  } else {
    //Creates the tweet
    let counter: number = 0;
    result.forEach((artist) => {
      let res: String = artist.Twitter;
      if (result.length == 1) tweet = tweet + "@" + res.substring(20) + "!";
      else if (counter == result.length - 1 && result.length > 1)
        tweet = tweet + "and @" + res.substring(20) + "!";
      else tweet = tweet + "@" + res.substring(20) + ", ";
      counter++;
    });
  }
  tweet += "\nCheck out more birthdays at https://bassbirthdays.com!";
  let twitterObj: { status: string } = { status: tweet };
  //Posts the tweet to Twitter
  T.post(
    "statuses/update",
    twitterObj,
    (err: any, data: any, response: any) => {
      if (err) errorLog.error(err);
      else twitterLog.debug("Tweet for " + new Date() + " is " + tweet);
    }
  );
}
