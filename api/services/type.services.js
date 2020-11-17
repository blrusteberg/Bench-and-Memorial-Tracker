const Type = require("../models/Type");
const { Error } = require("../error/error");

class TypeServices {
  getType(id) {
    return Type.query().findById(id);
  }
  getAttributesOfType(typeId) {
    return Type.relatedQuery("Attributes").for(typeId);
  }
}

module.exports = TypeServices;
