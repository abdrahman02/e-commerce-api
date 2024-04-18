import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/,
  },
  password: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  roles: [{ type: string }],
});

const User = mongoose.model("User", userSchema);

export default User;
