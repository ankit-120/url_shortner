import { nanoid } from "nanoid";
import validator from "validator";
import { Url } from "../models/url.models";
import { redisClient } from "../config/redis";

export const createShortUrl = async (longUrl: string) => {
  if (!longUrl) throw new Error("URL is required");

  if (!validator.isURL(longUrl)) throw new Error("Invalid URL");

  const existingUrl = await Url.findOne({ longUrl });

  if (existingUrl) {
    return {
      shortUrl: `${process.env.URL}/api/url/${existingUrl.shortCode}`,
    };
  }

  let code = nanoid(6);

  while (await Url.findOne({ shortCode: code })) {
    code = nanoid(6);
  }

  await Url.create({
    longUrl,
    shortCode: code,
  });

  return {
    shortUrl: `${process.env.URL}/api/url/${code}`,
  };
};

export const getLongUrl = async (code: string) => {
  if (!code) throw new Error("Code is required");

  const cachedUrl = await redisClient.get(code);

  if (cachedUrl) {
    console.log("Cache hit");
    return cachedUrl;
  }
  console.log("Cache miss");

  const url = await Url.findOneAndUpdate(
    { shortCode: code },
    { $inc: { clicks: 1 } },
    { returnDocument: "after" },
  );

  if (!url) throw new Error("URL not found");

  await redisClient.set(code, url.longUrl, { EX: 3600 });

  return url.longUrl;
};
