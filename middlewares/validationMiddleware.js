import { validationResult } from "express-validator";

export const validateRegistration = (req, res, next) => {
  const errors = validationResult(req).formatWith(
    ({ msg, param, value, path }) => ({
      msg,
      param,
      value,
      path,
    })
  );

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};
