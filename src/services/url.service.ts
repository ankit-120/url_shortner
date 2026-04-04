import { nanoid } from "nanoid";

const urlDb: any = {};

export const createShortUrl = async (longUrl: string) => {
  if (!longUrl) throw new Error("URL is required");

  const code = nanoid(6);

  urlDb[code] = longUrl;

  return {
    shortUrl: `${process.env.URL}/api/url/${code}`,
  };
};

export const getLongUrl = async (code: string) => {
  if (!code) throw new Error("Code is required");

  return urlDb[code];
};
