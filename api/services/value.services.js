const Value = require("../models/Value");
const { Error } = require("../error/error");

class ValueServices {
  getValueByMemorialIdAndByAttributeId(memorialId, attributeId) {
    return Value.query().findOne({
      MemorialId: memorialId,
      AttributeId: attributeId,
    });
  }
}

module.exports = ValueServices;
