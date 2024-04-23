import mongoose from "mongoose";

const kategoriProdukSchema = mongoose.Schema(
  {
    nama_kategori: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const KategoriProduk = mongoose.model("KategoriProduk", kategoriProdukSchema);

export default KategoriProduk;
