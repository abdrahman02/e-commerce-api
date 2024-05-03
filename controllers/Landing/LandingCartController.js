import Cart from "../../models/Landing/Cart.js";

export const getAllByIdUserDataOnCart = async (req, res) => {
  const { idUser } = req.body;
  try {
    const datas = await Cart.find({ id_buyer: idUser });
    if (!datas || datas === undefined)
      return res
        .status(404)
        .json({ msg: "Cart tidak ditemukan!", success: false });

    return res
      .status(200)
      .json({ msg: "Berhasil mengambil data!", success: true, datas: datas });
  } catch (error) {
    console.log(`getAllByIdUserDataOnCart() Error: ${error.message}`);
    return res
      .status(500)
      .json({ msg: "Gagal mengambil data!", success: false });
  }
};
export const getSingleDataOnCart = async (req, res) => {
  const { idCart } = req.params;
  try {
    const data = await Cart.findOne({ _id: idCart });
    if (!data || data === undefined)
      return res
        .status(404)
        .json({ msg: "Cart tidak ditemukan", success: false });
    return res
      .status(200)
      .json({ msg: "Berhasil mengambil data!", success: true, data: data });
  } catch (error) {
    console.log(`getSingleDataOnCart() Error: ${error.message}`);
    return res
      .status(500)
      .json({ msg: "Gagal mengambil data!", success: false });
  }
};
export const createDataOnCart = async (req, res) => {
  const { idProduk, idUser } = req.body;
  try {
    const checkData = await Cart.findOne({
      id_produk: idProduk,
      id_buyer: idUser,
    });
    if (checkData === undefined)
      return res
        .status(404)
        .json({ msg: "Cart tidak ditemukan!", success: false });
    else if (!checkData) {
      const newData = new Cart({
        id_produk: idProduk,
        id_buyer: idUser,
        jumlah_beli: 1,
      });
      await newData.save();

      return res.status(201).json({
        msg: "Berhasil menambahkan data!",
        success: true,
        data: newData,
      });
    } else {
      return res.status(202).json({ msg: "Cart sudah ada!", success: false });
    }
  } catch (error) {
    console.log(`createDataOnCart() Error: ${error.message}`);
    return res
      .status(500)
      .json({ msg: "Gagal menambahkan data!", success: false });
  }
};
export const addQuantityDataOnCart = async (req, res) => {
  const { idCart } = req.params;
  try {
    const updatedData = await Cart.findOneAndUpdate(
      {
        _id: idCart,
      },
      { $inc: { jumlah_beli: 1 } },
      { new: true }
    );
    if (!updatedData || updatedData == undefined) {
      return res
        .status(404)
        .json({ msg: "Cart tidak ditemukan!", success: false });
    }
    // const updateStok = await Produk.findOneAndUpdate(
    //   { _id: updatedData.id_produk },
    //   { $inc: { stok: -1 } },
    //   { new: true }
    // );
    // if (!updateStok || updateStok === undefined)
    //   return res.status(404).json({
    //     msg: "Gagal update stok, produk tidak ditemukan!",
    //     success: false,
    //   });

    return res.status(200).json({
      msg: "Berhasil memperbaharui data!",
      success: true,
      data: updatedData,
    });
  } catch (error) {
    console.log(`addQuantityOnCart() Error: ${error.message}`);
    return res
      .status(500)
      .json({ msg: "Gagal memperbaharui data!", success: false });
  }
};
export const reduceQuantityDataOnCart = async (req, res) => {
  const { idCart } = req.params;
  try {
    const updatedData = await Cart.findOneAndUpdate(
      {
        _id: idCart,
      },
      { $inc: { jumlah_beli: -1 } },
      { new: true }
    );
    if (!updatedData || updatedData == undefined) {
      return res
        .status(404)
        .json({ msg: "Cart tidak ditemukan!", success: false });
    }

    return res.status(200).json({
      msg: "Berhasil memperbaharui data!",
      success: true,
      data: updatedData,
    });
  } catch (error) {
    console.log(`reduceQuantityOnCart() Error: ${error.message}`);
    return res
      .status(500)
      .json({ msg: "Gagal memperbaharui data!", success: false });
  }
};
export const deleteDataOnCart = async (req, res) => {
  const { idCart } = req.params;
  try {
    const data = await Cart.findOneAndDelete({ _id: idCart });
    if (!data || data == undefined) {
      return res
        .status(404)
        .json({ msg: "Kategori produk tidak ditemukan!", success: false });
    }

    return res
      .status(200)
      .json({ msg: "Berhasil menghapus data!", success: true });
  } catch (error) {
    console.log(`deleteDataOnCart() Error: ${error.message}`);
    return res
      .status(500)
      .json({ msg: "Gagal menghapus data!", success: false });
  }
};
