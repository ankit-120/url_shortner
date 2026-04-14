import express from "express";
import { router as urlRouter } from "./routes/url.routes";
import limiter from "./middlewares/rateLimiter";

const app = express();

app.use(express.json());
app.use(limiter);
app.use("/api/url", urlRouter);

export default app;
