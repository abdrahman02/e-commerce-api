import fs from "fs";
import path from "path";
import crypto from "crypto";
import Produk from "../../models/Landing/Produk.js";
import MTMProdukKategori from "../../models/Landing/MTMProdukKategori.js";
import KategoriProduk from "../../models/Master/KategoriProduk.js";
import User from "../../models/Master/User.js";
import now from "moment-timezone";
import Gambar from "../../models/Landing/Gambar.js";

export const getAllProduk = async (req, res) => {
  try {
    const products = await Produk.find();
    if (!products || products == undefined) {
      return res
        .status(404)
        .json({ msg: "Produk tidak ditemukan!", success: false });
    }

    const datas = [];
    for (const product of products) {
      const categories = await MTMProdukKategori.find({
        id_produk: product._id,
      }).populate("id_kategori_produk", "nama_kategori_produk");
      if (!categories || categories == undefined) {
        return res
          .status(404)
          .json({ msg: "Categories tidak ditemukan!", success: false });
      }
      const categoriesData = categories.map((cat) => ({
        idKategoriProduk: cat.id_kategori_produk._id,
        namaKategoriProduk: cat.id_kategori_produk.nama_kategori_produk,
      }));
      datas.push({
        produk: { ...product._doc, id_seller: product.id_seller },
        kategori: categoriesData,
      });
    }

    return res
      .status(200)
      .json({ msg: "Berhasil mengambil data!", success: true, datas: datas });
  } catch (error) {
    console.log(`getAllProduk() Error: ${error.message}`);
    return res
      .status(500)
      .json({ msg: "Gagal mengambil data!", success: false });
  }
};

export const getSingleProduk = async (req, res) => {
  const { idProduk } = req.params;
  try {
    const product = await Produk.findOne({ _id: idProduk });
    if (!data || data == undefined) {
      return res
        .status(404)
        .json({ msg: "Produk tidak ditemukan!", success: false });
    }
    const categories = await MTMProdukKategori.find({
      id_produk: idProduk,
    }).populate("id_kategori_produk", "nama_kategori_produk");
    if (!categories || categories == undefined) {
      return res
        .status(404)
        .json({ msg: "Categories tidak ditemukan!", success: false });
    }
    const categoriesData = categories.map((cat) => ({
      idKategoriProduk: cat.id_kategori_produk._id,
      namaKategoriProduk: cat.id_kategori_produk.nama_kategori_produk,
    }));

    const data = {
      produk: { ...product._doc, id_seller: product.id_seller._id },
      kategori: categoriesData,
    };

    return res
      .status(200)
      .json({ msg: "Berhasil mengambil data!", success: true, data: data });
  } catch (error) {
    console.log(`getSingleProduk() Error: ${error.message}`);
    return res
      .status(200)
      .json({ msg: "Gagal mengambil data!", success: false });
  }
};
export const createProduk = async (req, res) => {
  const {
    namaProduk,
    deskripsi,
    harga,
    stok,
    status,
    idUser,
    idKategoriProduk,
  } = req.body;
  const { gambar } = req.files;
  try {
    const newData = new Produk({
      nama_produk: namaProduk,
      deskripsi: deskripsi,
      harga: harga,
      stok: stok,
      status: status,
      id_seller: idUser,
    });
    await newData.save();

    const gambarArray = [];
    if (!Array.isArray(gambar)) {
      // Jika single gambar diunggah
      const extGambar = path.extname(gambar.name);
      const date = now().format("DDMMYYYYHHmmss");
      const namaGambar =
        crypto.randomBytes(16).toString("hex") + date + extGambar;
      const urlGambar = `/images/${namaGambar}`;
      gambarArray.push({
        name: namaGambar,
        url: urlGambar,
        id_produk: newData._id,
      });
      gambar.mv(`./public/images/${namaGambar}`);
      await new Gambar(gambarArray[0]).save();
    } else {
      // Jika multiple gambar diunggah
      gambar.forEach((gambar) => {
        const extGambar = path.extname(gambar.name);
        const date = now().format("DDMMYYYYHHmmss");
        const namaGambar =
          crypto.randomBytes(16).toString("hex") + date + extGambar;
        const urlGambar = `/images/${namaGambar}`;
        gambarArray.push({
          name: namaGambar,
          url: urlGambar,
          id_produk: newData._id,
        });
        gambar.mv(`./public/images/${namaGambar}`);
      });
      await Gambar.insertMany(gambarArray);
    }

    const semuaFileTerpindah = gambarArray.every((file) =>
      fs.existsSync("./public/images/", file.name)
    );
    if (!semuaFileTerpindah) {
      gambarArray.forEach((file) => {
        fs.unlinkSync("./public/images/", file.name);
      });
      await Gambar.deleteMany({ id_produk: newData._id });
    }

    if (!Array.isArray(idKategoriProduk)) {
      // Jika hanya satu idKategoriProduk diunggah
      const mtmEntry = {
        id_produk: newData._id,
        id_kategori_produk: idKategoriProduk,
      };
      await new MTMProdukKategori(mtmEntry).save();
    } else {
      const mtmEntries = idKategoriProduk.map((kategoriId) => ({
        id_produk: newData._id,
        id_kategori_produk: kategoriId,
      }));
      await MTMProdukKategori.insertMany(mtmEntries);
    }

    const updateRoleUser = await User.findOneAndUpdate(
      { _id: idUser },
      { $addToSet: { roles: "seller" } },
      { new: true }
    );
    if (!updateRoleUser || updateRoleUser === undefined)
      return res.status(404).json({
        msg: "Gagal memperbaharui role!, user tidak ditemukan",
        success: false,
      });

    return res.status(201).json({
      msg: "Berhasil menambahkan data!",
      success: true,
    });
  } catch (error) {
    console.log(`createProduk() Error ${error.message}`);
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Gagal menambahkan data!", success: false });
  }
};
export const updateProduk = async (req, res) => {
  const {
    namaProduk,
    deskripsi,
    harga,
    stok,
    status,
    idUser,
    idKategoriProduk,
  } = req.body;
  const { gambar } = req.files;
  const { idProduk } = req.params;
  try {
    const updatedProduct = await Produk.findOneAndUpdate(
      { _id: idProduk },
      {
        $set: {
          nama_produk: namaProduk,
          deskripsi,
          harga,
          stok,
          status,
          id_seller: idUser,
        },
      },
      { new: true }
    );
    if (!updatedProduct || updatedProduct == undefined) {
      return res
        .status(404)
        .json({ msg: "Produk tidak ditemukan!", success: false });
    }

    const getNameImageByIdProduct = await Gambar.find(
      { id_produk: idProduk },
      "name"
    );
    if (!getNameImageByIdProduct || getNameImageByIdProduct == undefined) {
      return res
        .status(404)
        .json({ msg: "Gambar lama tidak ditemukan!", success: false });
    }
    getNameImageByIdProduct.forEach((gambar) => {
      fs.unlinkSync(`public/images/${gambar.name}`);
    });
    await Gambar.deleteMany({ id_produk: idProduk });
    const gambarArray = [];
    if (!Array.isArray(gambar)) {
      // Jika single gambar diunggah
      const extGambar = path.extname(gambar.name);
      const date = now().format("DDMMYYYYHHmmss");
      const namaGambar =
        crypto.randomBytes(16).toString("hex") + date + extGambar;
      const urlGambar = `/images/${namaGambar}`;
      gambarArray.push({
        name: namaGambar,
        url: urlGambar,
        id_produk: updatedProduct._id,
      });
      gambar.mv(`./public/images/${namaGambar}`);
      await new Gambar(gambarArray[0]).save();
    } else {
      // Jika multiple gambar diunggah
      gambar.forEach((gambar) => {
        const extGambar = path.extname(gambar.name);
        const date = now().format("DDMMYYYYHHmmss");
        const namaGambar =
          crypto.randomBytes(16).toString("hex") + date + extGambar;
        const urlGambar = `/images/${namaGambar}`;
        gambarArray.push({
          name: namaGambar,
          url: urlGambar,
          id_produk: updatedProduct._id,
        });
        gambar.mv(`./public/images/${namaGambar}`);
      });
      await Gambar.insertMany(gambarArray);
    }

    const semuaFileTerpindah = gambarArray.every((file) =>
      fs.existsSync("./public/images/", file.name)
    );
    if (!semuaFileTerpindah) {
      gambarArray.forEach((file) => {
        fs.unlinkSync("./public/images/", file.name);
      });
      await Gambar.deleteMany({ id_produk: updatedProduct._id });
    }

    await MTMProdukKategori.deleteMany({ id_produk: idProduk });
    if (!Array.isArray(idKategoriProduk)) {
      // Jika hanya satu idKategoriProduk diunggah
      const mtmEntry = {
        id_produk: idProduk,
        id_kategori_produk: idKategoriProduk,
      };
      await new MTMProdukKategori(mtmEntry).save();
    } else {
      const mtmEntries = idKategoriProduk.map((kategoriId) => ({
        id_produk: idProduk,
        id_kategori_produk: kategoriId,
      }));
      await MTMProdukKategori.insertMany(mtmEntries);
    }

    const kategoriProduk = await KategoriProduk.find(
      { _id: { $in: idKategoriProduk } },
      "nama_kategori_produk"
    );

    return res.status(200).json({
      msg: "Berhasil memperbaharui data!",
      success: true,
      data: { produk: updatedProduct, kategoriProduk },
    });
  } catch (error) {
    console.log(`updateProduk() Error: ${error.message}`);
    return res
      .status(500)
      .json({ msg: "Gagal memperbaharui data!", success: false });
  }
};
export const deleteProduk = async (req, res) => {
  const { idProduk } = req.params;
  try {
    const data = await Produk.findOneAndDelete({ _id: idProduk });
    if (!data || data == undefined) {
      return res
        .status(404)
        .json({ msg: "Produk tidak ditemukan!", success: false });
    }

    const getNameImageByIdProduct = await Gambar.find(
      { id_produk: idProduk },
      "name"
    );
    getNameImageByIdProduct.forEach((gambar) => {
      fs.unlinkSync(`public/images/${gambar.name}`);
    });
    await Gambar.deleteMany({ id_produk: idProduk });

    await MTMProdukKategori.deleteMany({ id_produk: idProduk });
    return res
      .status(200)
      .json({ msg: "Berhasil menghapus data!", success: true });
  } catch (error) {
    console.log(`deleteProduk() Error: ${error.message}`);
    return res
      .status(500)
      .json({ msg: "Gagal menghapus data!", success: false });
  }
};
