import mongoose from "mongoose";

const cartSchema = mongoose.Schema(
  {
    id_produk: {
      type: mongoose.Schema.Types.ObjectID,
      ref: "Produk",
      required: true,
    },
    id_buyer: {
      type: mongoose.Schema.Types.ObjectID,
      ref: "User",
      required: true,
    },
    jumlah_beli: { type: Number, required: true },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
