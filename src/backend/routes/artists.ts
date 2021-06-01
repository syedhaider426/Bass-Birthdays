import express, { Request, Response, Router } from "express";
import rp from "request-promise";
import querystring from "querystring";
import Artist, { IArtist } from "../database/models/artist";
import { keys } from "../config/keys";

export const router: Router = express.Router();

/* Spotify credentials */
const client_id = keys.client_id;
const client_secret = keys.client_secret;

/* Client talkes to Spotify and asks for OAuth token */
const authOptions = {
  url: "https://accounts.spotify.com/api/token",
  headers: {
    Authorization:
      "Basic " +
      Buffer.from(client_id + ":" + client_secret).toString("base64"),
  },
  form: {
    grant_type: "client_credentials",
  },
  json: true,
};

/* Gets all artists (as well as all fields) and sorts birthdays in ascending order */
router.get("/artist", async (req: Request, res: Response) => {
  const result: Array<IArtist> = await Artist.find({
    Birthday: { $exists: true },
  }).sort({
    Birthday: 1,
  });
  res.status(200).send(result);
});

/* Gets all artists (only artist field) and sorts artists in ascending order */
router.get("/artistOnly", async (req: Request, res: Response) => {
  const result: Array<IArtist> = await Artist.find()
    .sort({ Artist: 1 })
    .select({ Artist: 1, _id: 0 });
  res.status(200).send(result);
});

/* Gets the artists who birthday it is */
router.get("/currentArtist", async (req: Request, res: Response) => {
  // date/month are passed in from React
  const { date, month } = req.query;

  //gets current year as dates are stored with the current year
  const year: number = new Date().getFullYear();

  const today = new Date(year, Number(month), Number(date));
  const tomorrow = new Date(year, Number(month), Number(date));

  //sets the next day
  tomorrow.setDate(today.getDate() + 1);

  // time does not matter when comparing current date to birthday
  today.setHours(0, 0, 0, 0);
  tomorrow.setHours(0, 0, 0, 0);

  //gets the artists for the date passed in
  const result: Array<IArtist> = await Artist.find({
    Birthday: {
      $gte: today,
      $lt: tomorrow,
    },
  });
  res.status(200).send(result);
});

/* Gets info about artist from Spotify */
router.get("/artistInfo", async (req: Request, res: Response) => {
  //https://stackoverflow.com/questions/61305362/why-request-query-is-not-any-anymore-express-request-query-typescript-error
  const artist: string = req.query.artist as string;
  const result: Array<IArtist> = await Artist.find({ Artist: artist })
    .collation({ locale: "en", strength: 2 })
    .select({
      _id: 0,
      ProfileImage: 1,
      Artist: 1,
      Birthday: 1,
      Genre: 1,
      SpotifyID: 1,
      BirthdayList: 1,
      Popularity: 1,
    })
    .limit(1); //returns an array

  // Error code is 404 because the artist was not found
  if (result.length == 0) {
    res.status(404).send(result);
    return;
  }
  //result[0] because even though one element is getting returned, it's an array
  const spotifyID: string = result[0].SpotifyID;

  //Gets the top 10 tracks produced by the artist
  const tracks: {
    track: string;
    image: string;
    url: string;
  }[] = await getSpotifyTopTracks(spotifyID);

  //Gets the top 20 related artists
  const artists: {
    artist: string;
    image: string;
    url: string;
  }[] = await getSpotifyRelatedArtists(spotifyID);
  const finalResult: IArtist[] & {
    topSongs: {
      track: string;
      image: string;
      url: string;
    }[];
  } & {
    relatedArtists: {
      artist: string;
      image: string;
      url: string;
    }[];
  } = Object.assign(
    {},
    result,
    { topSongs: tracks },
    { relatedArtists: artists }
  );

  res.status(200).send(finalResult);
});

/*https://stackoverflow.com/questions/47341603/async-await-with-request-promise-returns-undefined*/

/* Gets the top 10 tracks produced by the artist
 * Params: SpotifyID of the artist
 */
async function getSpotifyTopTracks(spotifyID: string) {
  let token: string = "";

  /* Spotify needs a token in order to do requests to their API .
   * This post request will get a valid token
   */
  await rp.post(authOptions, async function (error, response, body) {
    if (!error && response.statusCode === 200) {
      token = body.access_token; // use the access token to access the Spotify Web API
    }
  });
  const query: string = querystring.stringify({
    country: "US",
  });

  /* Using this url, and the headers, get the top tracks
   * for an artist
   */
  const options: {
    url: string;
    headers: { Authorization: string };
    json: boolean;
  } = {
    url:
      "https://api.spotify.com/v1/artists/" +
      spotifyID +
      "/top-tracks?" +
      query,
    headers: {
      Authorization: "Bearer " + token,
    },
    json: true,
  };

  // Gets the track name, album/song image, and the link to the song
  return await rp.get(options).then(function (response) {
    const tracks: { track: string; image: string; url: string }[] = [];
    response.tracks.forEach(
      (res: {
        name: string;
        album: { images: { url: string }[] };
        external_urls: { spotify: string };
      }) => {
        tracks.push({
          track: res.name,
          image: res.album.images[2].url,
          url: res.external_urls.spotify,
        });
      }
    );

    return tracks;
  });
}

/* Gets the top 20 related artists
 * Params: SpotifyID of the artist
 */
async function getSpotifyRelatedArtists(spotifyID: string) {
  let token: string = "";

  /* Spotify needs a token in order to do requests to their API .
   * This post request will get a valid token
   */
  await rp.post(authOptions, async function (error, response, body) {
    if (!error && response.statusCode === 200) {
      token = body.access_token; // use the access token to access the Spotify Web API
    }
  });

  /* Using this url, and the headers, get the top tracks
   * for an artist
   */
  const options: {
    url: string;
    headers: { Authorization: string };
    json: boolean;
  } = {
    url: "https://api.spotify.com/v1/artists/" + spotifyID + "/related-artists",
    headers: {
      Authorization: "Bearer " + token,
    },
    json: true,
  };
  // Gets the artist name, artist profile image, and link to artist
  return await rp.get(options).then(function (response) {
    let artists: { artist: string; image: string; url: string }[] = [];
    response.artists.forEach(
      (art: {
        name: string;
        images: { url: string }[];
        external_urls: { spotify: string };
      }) => {
        artists.push({
          artist: art.name,
          image:
            art.images[2] === undefined ? "empty-image.png" : art.images[2].url,
          url: art.external_urls.spotify,
        });
      }
    );

    return artists;
  });
}
