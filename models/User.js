import mongoose from "mongoose";
import timestamp from "mongoose-timestamp";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/,
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return v.length >= 8;
      },
      message: (props) =>
        `${props.value} harus memiliki panjang minimal 8 karakter!`,
    },
  },
  phone: { type: String, required: true, unique: true },
  roles: [{ type: string, enum: ["admin", "seller", "buyer"], required: true }],
});

userSchema.plugin(timestamp);

const User = mongoose.model("User", userSchema);

export default User;
