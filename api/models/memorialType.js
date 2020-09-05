const mongoose = require("mongoose");
const uuid = require("uuid");

const MemorialSchema = mongoose.Schema({
  name: String,
  _id: {
    type: String,
    default: () => uuid.v4(),
  },
  attributes: [
    {
      _id: {
        type: String,
        default: () => uuid.v4(),
      },
      name: {
        type: String,
        required: true,
      },
      dataType: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
      },
      required: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

module.exports = mongoose.model("memorialTypes", MemorialSchema);
