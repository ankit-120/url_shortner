import { Request, Response } from "express";
import { createShortUrl, getLongUrl } from "../services/url.service";

export const createShortUrlController = async (req: Request, res: Response) => {
  try {
    const { longUrl } = req.body;

    const result = await createShortUrl(longUrl);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const redirectUrlController = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;

    if (typeof code !== "string") {
      res.status(400).json({
        success: false,
        message: "Invalid code provided",
      });
      return;
    }

    const longUrl = await getLongUrl(code);

    if (!longUrl) {
      res.status(404).json({
        success: false,
        message: "URL not found",
      });
      return;
    }

    res.redirect(longUrl);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
