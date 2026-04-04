import express from "express";
import { router as urlRouter } from "./routes/url.routes";

const app = express();

app.use(express.json());
app.use("/api/url", urlRouter);

export default app;
