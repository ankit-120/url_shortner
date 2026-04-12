import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./config/db";
import { connectRedis } from "./config/redis";

const PORT = process.env.PORT || 8000;

connectDB();
connectRedis();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
