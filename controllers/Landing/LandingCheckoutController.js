import snap from "../../configs/Midtrans";
import { v4 as uuidv4 } from "uuid";
import Checkout from "../../models/Landing/Checkout.js";
import dotenv from "dotenv";

dotenv.config();
export const createTokenMidtrans = async (req, res) => {
  const { idUser, produk, totalAmount } = req.body;

  try {
    const items = produk.map(async (produk) => ({
      id: produk.id_produk,
      price: await Produk.findOne({ _id: produk.id_produk }, { harga: 1 }),
      quantity: produk.jumlahBeli,
      name: await Produk.findOne({ _id: produk.id_produk }, { nama_produk: 1 }),
    }));

    const user = await User.findOne(
      { _id: idUser },
      { _id: 0, email: 1, name: 1, username: 1 }
    );

    const uuid = uuidv4();

    let parameter = {
      transaction_details: {
        order_id: uuid,
        gross_amount: totalAmount,
      },
      items: items,
      customer_details: {
        name: user.name,
        username: user.email,
        email: user.email,
      },
    };

    const response = await snap.createTransaction(parameter);

    if (response.status !== 201)
      return res
        .status(500)
        .json({ msg: "Failed to create transaction", success: false });

    const data = new Checkout({
      _id: uuid,
      id_buyer: idUser,
      produk: produk,
    });
    await data.save();
      
    return res.status(201).json({
      msg: "Transaksi berhasil dibuat!",
      success: true,
      snap_token: response.token,
      snap_redirect_url: response.redirect_url,
    });
  } catch (error) {
    console.log(`createTokenMidtrans() Error: ${error.message}`);
    return res
      .status(500)
      .json({ msg: "Transaksi gagal dibuat!", success: false });
  }
};