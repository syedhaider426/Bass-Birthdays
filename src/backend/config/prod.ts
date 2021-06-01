import privateKeys from "./privateKeys";

export const prodKeys: privateKeys = {
  db: process.env.DB || "",
  port: Number(process.env.PORT),
  client_id: process.env.CLIENT_ID || "",
  client_secret: process.env.CLIENT_SECRET || "",
  redirect_uri: process.env.REDIRECT_URI || "",
  consumer_key: process.env.CONSUMER_KEY || "",
  consumer_secret: process.env.CONSUMER_SECRET || "",
  access_token: process.env.ACCESS_TOKEN || "",
  access_token_secret: process.env.ACCESS_TOKEN_SECRET || "",
  region: process.env.REGION || "",
  toEmail: process.env.TOEMAIL || "",
  fromEmail: process.env.FROMEMAIL || "",
  configurationSet: process.env.CONFIGURATIONSET || "",
  recaptchaServer: process.env.RECAPTCHASERVER || "",
};
