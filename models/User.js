import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import timestamp from "mongoose-timestamp";

const userSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: { type: String, required: true, unique: true },
  roles: {
    type: [String],
    enum: ["admin", "seller", "buyer"],
    default: "buyer",
    required: true,
  },
});

userSchema.plugin(timestamp);

const User = mongoose.model("User", userSchema);

export default User;
