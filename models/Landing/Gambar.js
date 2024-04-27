import mongoose from "mongoose";

const gambarSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  url: { type: String, required: true, unique: true },
  id_produk: { type: String, required: true },
});

const Gambar = mongoose.model("Gambar", gambarSchema);

export default Gambar;
