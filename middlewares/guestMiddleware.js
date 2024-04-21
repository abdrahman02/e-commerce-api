const guestMiddleware = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (token)
    return res
      .status(403)
      .json({ msg: "Akses ditolak karena anda telah login!" });

  next();
};

export default guestMiddleware;
