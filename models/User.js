import mongoose from "mongoose";
import timestamp from "mongoose-timestamp";

const userSchema = new mongoose.Schema({
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
  roles: [{ type: string, enum: ["admin", "seller", "buyer"], required: true }],
});

userSchema.plugin(timestamp);

const User = mongoose.model("User", userSchema);

export default User;
