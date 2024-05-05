import midtransClient from "midtrans-client";
import dotenv from "dotenv";

dotenv.config();
const snap = midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});

export default snap;
