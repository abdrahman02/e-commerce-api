import mongoose from "mongoose";

const CheckoutSchema = new mongoose.Schema({
  id_buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  produk: [
    {
      id_produk: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Produk",
        required: true,
      },
      jumlah_beli: { type: Number, required: true },
    },
  ],
  total_amount: { type: Number, required: true },
});

const Checkout = mongoose.model("Checkout", CheckoutSchema);

export default Checkout;
