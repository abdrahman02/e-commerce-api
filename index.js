import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import connectDB from "./configs/Database.js";
import MasterUserRoute from "./routes/Master/MasterUserRoute.js";
import MasterKategoriProdukRoute from "./routes/Master/MasterKategoriProdukRoute.js";
import LandingProdukRoute from "./routes/Landing/LandingProdukRoute.js";

dotenv.config();
const app = express();
await connectDB();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.APP_SESSION,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(MasterUserRoute);
app.use(MasterKategoriProdukRoute);
app.use(LandingProdukRoute);

app.listen(process.env.APP_PORT, () =>
  console.log(`Server up and running on port ${process.env.APP_PORT}...`)
);
