import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/Database.js";

dotenv.config();
const app = express();

app.use(express.json());

connectDB();

app.listen(process.env.APP_PORT, () =>
  console.log(`Server up and running on port ${process.env.APP_PORT}...`)
);
