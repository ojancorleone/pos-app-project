
const ModelUser = require("./../model/user/user");
const HelperResponse = require("./../helper/response");
const Constants = require("./../helper/constants");
const crypto            = require('crypto');

module.exports = client => {
  const modelUser = ModelUser(client);
  const reply = HelperResponse();

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

  module.validateHandShake = (clientKeyword, type) => {
      const backendKeyword = crypto.pbkdf2Sync(`${process.env.KEYWORD}|${type}`, 'salt', 10, 16, 'sha512');
      console.log(`handshake-keyword : ${backendKeyword.toString('hex')}`);
      console.log(`client-keyword  : ${clientKeyword}`);
      if(clientKeyword != backendKeyword.toString('hex'))
        return false;
      else return true;
  }

  return module;
};
