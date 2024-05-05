import snap from "../../configs/Midtrans";
import Checkout from "../../models/Landing/Checkout";

export const createTokenMidtrans = async (req, res) => {
  const { idUser, produk, totalAmount } = req.body;

  try {
    const checkout = new Checkout({
      id_buyer: idUser,
      produk: produk,
    });
    await checkout.save();

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

    let parameter = {
      transaction_details: {
        order_id: checkout._id,
        gross_amount: totalAmount,
      },
      items: items,
      customer_details: {
        name: user.name,
        username: user.email,
        email: user.email,
      },
    };

    const tokenMidtrans = await snap.createTransaction(parameter);

    return res.status(201).json({
      msg: "Token midtrans berhasil dibuat!",
      success: true,
      tokenMidtrans: tokenMidtrans.token,
    });
  } catch (error) {
    console.log(`createTokenMidtrans() Error: ${error.message}`);
    return res
      .status(500)
      .json({ msg: "Token midtrans gagal dibuat!", success: false });
  }
};


export const callbackMidtrans = async (req, res) => {
    
}