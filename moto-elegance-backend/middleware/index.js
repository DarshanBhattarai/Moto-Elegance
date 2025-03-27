const authJwt = require("./authJwt");
const carValidation = require("./carValidation.middleware");

module.exports = {
  authJwt,
  carValidation,
};
