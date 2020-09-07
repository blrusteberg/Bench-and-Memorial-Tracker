const mongoose = require("mongoose");
const uuid = require("uuid");

const MemorialSchema = mongoose.Schema({
  name: String,
  _id: {
    type: String,
    default: () => uuid.v4(),
  },
  typeId: {
    type: String,
    required: true,
  },
  attributes: [
    {
      _id: {
        type: String,
        default: () => uuid.v4(),
      },
      value: {
        type: mongoose.Schema.Types.Mixed,
        default: null,
      },
      attributeId: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("memorials", MemorialSchema);
