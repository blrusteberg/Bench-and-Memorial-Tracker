const MemorialsDb = require("../models/memorials.db");

class MemorialsService {
  static createMemorial = async () => {
    try {
    } catch (e) {
      throw new Error(e.message);
    }
  };

  static getMemorials = async () => {
    try {
      return MemorialsDb.getMemorials();
    } catch (e) {
      throw new Error(e.message);
    }
  };

  static updateMemorial = async () => {
    try {
    } catch (e) {
      throw new Error(e.message);
    }
  };

  static deleteMemorial = async () => {
    try {
    } catch (e) {
      throw new Error(e.message);
    }
  };
}

module.exports = MemorialsService;
