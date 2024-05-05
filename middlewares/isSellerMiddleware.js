import User from "../models/Master/User.js";

const isSellerMiddleware = async (req, res, next) => {
  const { email } = req.user;
  try {
    const roleUser = await User.findOne({ email: email }, { roles: 1, _id: 0 });
    console.log("roleUser", roleUser);
    if (roleUser.roles.includes("seller")) {
      next();
    } else {
      return res.status(403).json({ msg: "Forbidden", success: false });
    }
  } catch (error) {
    console.log(`isSellerMiddleware() Error: ${error.message}`);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export default isSellerMiddleware;