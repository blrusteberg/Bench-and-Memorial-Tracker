const MemorialsService = require("../services/memorials");

class MemorialsController {
  static getMemorials = async (req, res, next) => {
    try {
      await MemorialsService.getMemorials();
      next();
    } catch (e) {
      console.log(e.message);
    }
  };
}

module.exports = MemorialsController;
