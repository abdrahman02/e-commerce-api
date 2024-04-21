import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    email_verified_at: { type: Date, required: false, default: null },
    password: {
      type: String,
      required: true,
    },
    phone: { type: String, required: true, unique: true },
    phone_verified_at: { type: Date, required: false, default: null },
    roles: {
      type: [String],
      enum: ["admin", "seller", "buyer"],
      default: "buyer",
      required: true,
    },
  },
  { timestamps: true }
);


const User = mongoose.model("User", userSchema);

export default User;
