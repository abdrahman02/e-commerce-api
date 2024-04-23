import mongoose from "mongoose";

const produkSchema = mongoose.Schema({
  nama_produk: { type: String, required: true },
  deskripsi: { type: String, required: true },
  harga: { type: Number, required: true },
  stok: { type: Number, required: true },
  jumlah_terjual: { type: Number, required: false, default: 0 },
  status: {
    type: String,
    enum: ["aktif", "tidak_aktif"],
    default: "aktif",
    required: false,
  },
  id_seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Produk = mongoose.model("Produk", produkSchema);
export default Produk;
