import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema(
  {
    id_user: {
      type: mongoose.Schema.Types.ObjectID,
      ref: "User",
      required: true,
    },
    email_verification_code: {
      type: String,
      required: false,
      default: null,
      unique: true,
    },
    phone_verification_code: {
      type: String,
      required: false,
      default: null,
      unique: true,
    },
    refresh_token: {
      type: String,
      required: false,
      default: null,
      unique: true,
    },
  },
  { timestamps: true }
);

const Token = mongoose.model("Token", tokenSchema);

export default Token;
