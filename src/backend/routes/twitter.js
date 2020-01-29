const Artist = require("../database/models/artist"); //Artist model
const config = require("config");
// Cron used to repeatedly run the script every day
const cron = require("node-cron");

const Twit = require("twit");

// Configuration details to post/get from Twitter
var twitterConfig = {
    twitter: {
      consumer_key: config.get("consumer_key"),
      consumer_secret: config.get("consumer_secret"),
      access_token: config.get("access_token"),
      access_token_secret: config.get("access_token_secret")
    }
  },
  T = new Twit(twitterConfig.twitter);

// Function is called to start the cron at 6pm UTC/10am PST
function cronjob() {
  cron.schedule("0 8 * * *", () => {
    getCurrentBirthdayTweet();
  });
}

async function getCurrentBirthdayTweet() {
  //Gets current date and tomorrow's date
  var today = new Date();
  var tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  // This is done because there is no need to worry about the hours
  today.setHours(0, 0, 0, 0);
  tomorrow.setHours(0, 0, 0, 0);

  // MongoDB stores dates in ISO format
  var isoToday = today.toISOString();
  var isoTomorrow = tomorrow.toISOString();

  // Gets twitter from query
  var result = await Artist.find({
    Birthday: {
      $gte: isoToday,
      $lt: isoTomorrow
    }
  }).select({ Twitter: 1, _id: 0 });

  //Create tweet will combine all the artists returned from query
  createTweet(result);
}

// Creates tweet for all the artists whose birthday it is
function createTweet(result) {
  var tweet = "Happy Birthday ";
  if (tweet === "Happy Birthday " && result.length === 0) {
    tweet = "No Birthdays Today :(";
  } else {
    //Creates the tweet
    for (var x = 0; x < result.length; x++) {
      var res = result[x].Twitter;
      if (result.length == 1) tweet = tweet + "@" + res.substring(20) + "!";
      else if (x == result.length - 1 && result.length > 1)
        tweet = tweet + "and @" + res.substring(20) + "!";
      else tweet = tweet + "@" + res.substring(20) + ", ";
    }
  }

  //Posts the tweet to Twitter
  T.post("statuses/update", { status: tweet }, function(err, data, response) {
    if (err) {
      errorLog.error(err);
    } else {
      twitterLog.debug("Tweet for " + new Date() + " is " + tweet);
    }
  });
}

exports.cronjob = cronjob;
