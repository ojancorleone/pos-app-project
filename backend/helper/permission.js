
require("dotenv").config();
const ModelUser       = require("./../model/user");
const HelperResponse  = require("./../helper/response");
const Constants       = require("./../helper/constants");
const Crypto          = require('crypto');
const basicAuth       = require('basic-auth');

module.exports = client => {
  const modelUser = ModelUser(client);
  const reply     = HelperResponse();

  let module = {};

  module.isAllowed = (role, module, write = false) => {
    let access;
    switch (role) {
      case "admin":
        access = Constants.ACCESS.ADMINISTRATOR;
        break;
      case "cashier":
        access = Constants.ACCESS.CASHIER;
        break;
      case "inventory":
        access = Constants.ACCESS.INVENTORY;
        break;
    }
    if (write) return access.write.includes(module) ? true : false;
    else return access.read.includes(module) ? true : false;
  };

  const mapURLtoModuleName = url => {
    // add 'es' or irregular plurals here for exception
    return url.split("/")[1].slice(-1) === "s"
      ? url.split("/")[1].substr(0, url.split("/")[1].length - 1)
      : url.split("/")[1];
  };

  // Validate module access rights
  module.checkAccess = async (req, res, next) => {
    const role = await modelUser.getRole("email", req.headers.user_email);
    req.role = role;
    if (
      !module.isAllowed(
        role,
        mapURLtoModuleName(req.url),
        ["POST", "PUT", "PATCH", "DELETE"].includes(req.method)
      )
    ) {
      return reply.unauthorized(req, res, "violation of module access rights");
    }
    next();
  };

  module.validateAuthorization = (auth, password) => {
      const backendKeyword = Crypto.pbkdf2Sync(`${process.env.API_CREDENTIAL}|${password}`, 'salt', 10, 16, 'sha512');
      console.log(`format-keyword \t: ${process.env.API_CREDENTIAL}|${password}`);
      console.log(`server-keyword \t: ${backendKeyword.toString('hex')}`);
      console.log(`client-keyword \t: ${auth.name}`);
      console.log(`client-password \t: ${auth.pass}`);
      return (auth.name === process.env.API_CREDENTIAL && auth.pass === backendKeyword.toString('hex'));
  }

  return module;
};
