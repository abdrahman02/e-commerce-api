import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import connectDB from "./configs/Database.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(session({
    secret: process.env.APP_SESSION,
    resave: false,
    saveUninitialized: true,
}));

connectDB();

app.listen(process.env.APP_PORT, () =>
  console.log(`Server up and running on port ${process.env.APP_PORT}...`)
);
