"use strict";

const crypto = require("crypto");

module.exports = {
  getSalt: length =>
    crypto
      .randomBytes(length / 2)
      .toString("hex")
      .slice(0, length),

  getSaltHashPassword: (password, salt) =>
    crypto
      .createHash("sha512")
      .update(`${salt}${password}`)
      .digest()
      .toString("hex")
};
