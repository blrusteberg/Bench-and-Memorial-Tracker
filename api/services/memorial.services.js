const Memorial = require("../models/Memorial");
const { Error } = require("../error/error");

class MemorialService {
  getMemorials() {
    return Memorial.query();
  }
}

module.exports = MemorialService;
