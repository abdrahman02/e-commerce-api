import mongoose from "mongoose";

const gambarSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    url: { type: String, required: true, unique: true },
    id_produk: {
      type: mongoose.Schema.Types.ObjectID,
      ref: "Produk",
      required: true,
    },
  },
  { timestamps: true }
);

const Gambar = mongoose.model("Gambar", gambarSchema);

export default Gambar;
