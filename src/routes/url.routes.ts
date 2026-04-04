import { Router } from "express";
import {
  createShortUrlController,
  redirectUrlController,
} from "../controllers/url.controller";

export const router = Router();

router.post("/shorten", createShortUrlController);
router.get("/:code", redirectUrlController);
