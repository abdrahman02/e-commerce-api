import  KategoriProduk  from "../../models/Master/KategoriProduk.js";

export const getAllKategoriProduk = async (req, res) => {
  try {
    const datas = await KategoriProduk.find();
    return res
      .status(200)
      .json({ msg: "Berhasil mengambil data!", success: true, datas: datas });
  } catch (error) {
    console.log(`getAllKategoriProduk() Error: ${error.message}`);
    return res
      .status(500)
      .json({ msg: "Gagal mengambil data!", success: false });
  }
};

export const getSingleKategoriProduk = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await KategoriProduk.findById(id);
    return res
      .status(200)
      .json({ msg: "Berhasil mengambil data!", success: true, data: data });
  } catch (error) {
    console.log(`getSingleKategoriProduk() Error: ${error.message}`);
    return res
      .status(500)
      .json({ msg: "Gagal mengambil data!", success: false });
  }
};

export const createKategoriProduk = async (req, res) => {
  const { namaKategoriProduk } = req.body;
  try {
    const newData = new KategoriProduk({
      nama_kategori_produk: namaKategoriProduk,
    });
    await newData.save();
    return res.status(201).json({
      msg: "Berhasil menambahkan data!",
      success: true,
      data: newData,
    });
  } catch (error) {
    console.log(`createKategoriProduk() Error ${error.message}`);
    return res
      .status(500)
      .json({ msg: "Gagal menambahkan data!", success: false });
  }
};

export const updateKategoriProduk = async (req, res) => {
  const { namaKategoriProduk } = req.body;
  const { idKategoriProduk } = req.params;
  try {
    const newData = await KategoriProduk.findOneAndUpdate(
      { _id: idKategoriProduk },
      { $set: { nama_kategori_produk: namaKategoriProduk } },
      { new: true }
    );

    return res.status(200).json({
      msg: "Berhasil memperbaharui data!",
      success: true,
      data: newData,
    });
  } catch (error) {
    console.log(`updateKategoriProduk() Error: ${error.message}`);
    return res
      .status(500)
      .json({ msg: "Gagal memperbaharui data!", success: false });
  }
};

export const deleteKategoriProduk = async (req, res) => {
  const { idKategoriProduk } = req.params;
  try {
    await KategoriProduk.findOneAndDelete({ _id: idKategoriProduk });
    return res
      .status(200)
      .json({ msg: "Berhasil menghapus data!", success: true });
  } catch (error) {
    console.log(`deleteKategoriProduk() Error: ${error.message}`);
    return res.status(500).json({msg: "Gagal menghapus data!", success:false});
  }
};
