import mongoose from "mongoose";

const MTMProdukKategoriSchema = mongoose.Schema({
  id_produk: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "Produk",
    required: true,
  },
  id_kategori_produk: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "KategoriProduk",
    required: true,
  },
});
