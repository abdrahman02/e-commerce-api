import mongoose from "mongoose";

const gambarSchema = mongoose.Schema({
  nama: { type: String, required: true, unique: true },
  url: { type: String, required: true, unique: true },
});

const produkSchema = mongoose.Schema(
  {
    nama_produk: { type: String, required: true },
    deskripsi: { type: String, required: true },
    harga: { type: Number, required: true },
    stok: { type: Number, required: true },
    jumlah_terjual: { type: Number, required: false, default: 0 },
    status: {
      type: String,
      enum: ["aktif", "tidak_aktif"],
      required: true,
      default: "aktif",
    },
    id_seller: {
      type: mongoose.Schema.Types.ObjectID,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
// {
//         nama: { type: String, required: true, unique: true },
//         url: { type: String, required: true, unique: true },
//       },
const Produk = mongoose.model("Produk", produkSchema);
export default Produk;
