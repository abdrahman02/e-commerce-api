import MTMProdukKategori from "../../models/Landing/MTMProdukKategori.js";
import KategoriProduk from "../../models/Master/KategoriProduk.js";

export const getAllKategoriProduk = async (req, res) => {
  try {
    const datas = await KategoriProduk.find();
    if (!datas || datas == undefined) {
      return res
        .status(404)
        .json({ msg: "Kategori produk tidak ditemukan!", success: false });
    }
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
  const { idKategoriProduk } = req.params;
  try {
    const data = await KategoriProduk.findById(idKategoriProduk);
    if (!data || data == undefined) {
      return res
        .status(404)
        .json({ msg: "Kategori produk tidak ditemukan!", success: false });
    }

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
    const data = await KategoriProduk.findOneAndUpdate(
      { _id: idKategoriProduk },
      { $set: { nama_kategori_produk: namaKategoriProduk } },
      { new: true }
    );
    if (!data || data == undefined) {
      return res
        .status(404)
        .json({ msg: "Kategori produk tidak ditemukan!", success: false });
    }

    return res.status(200).json({
      msg: "Berhasil memperbaharui data!",
      success: true,
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
    const checkedChildren = MTMProdukKategori.find({
      id_kategori_produk: idKategoriProduk,
    });
    if (checkedChildren) {
      return res.status(500).json({
        msg: "Gagal menghapus data dikarenakan data sedang digunakan oleh children data!",
        success: false,
      });
    }

    const data = await KategoriProduk.findByIdAndDelete({
      _id: idKategoriProduk,
    });
    if (!data || data == undefined) {
      return res
        .status(404)
        .json({ msg: "Kategori produk tidak ditemukan!", success: false });
    }

    return res
      .status(200)
      .json({ msg: "Berhasil menghapus data!", success: true });
  } catch (error) {
    console.log(`deleteKategoriProduk() Error: ${error.message}`);
    return res
      .status(500)
      .json({ msg: "Gagal menghapus data!", success: false });
  }
};
