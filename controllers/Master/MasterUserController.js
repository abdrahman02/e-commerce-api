import argon2 from "argon2";
import User from "../../models/User.js";

export const registerUser = async (req, res) => {
  const { name, username, email, password, phone } = req.body;

  try {
    let existingData = await User.findOne({ email });
    if (existingData) {
      return res
        .status(400)
        .json({ msg: "Email sudah digunakan!", success: false });
    }

    const hashedPassword = await argon2.hash(password);

    const newData = new User({
      name,
      username,
      email,
      password: hashedPassword,
      phone,
    });

    await newData.save();

    res
      .status(201)
      .json({ msg: "Sukses, 1 Data berhasil ditambahkan!", success: true });
  } catch (error) {
    console.log(`registerUser() Error: ${error.message}`);
    res.status(500).json({ msg: "Gagal menambahkan data!", success: false });
  }
};

export const loginUser = (req, res) => {
  // Logika untuk login user
};
