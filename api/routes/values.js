const express = require("express");
const router = express.Router();
const Error = require("../error/error");

const Value = require("../models/Value");

router.get("/", async (req, res) => {
  try {
    const values = await Value.query();
    const parsedValues = values.map((value) => {
      value.Value = JSON.parse(value.Value);
      return value;
    });
    res.status(200).json(parsedValues);
  } catch (err) {
    Error.errorHandler(err, res);
  }
});

router.post("/", async (req, res) => {
  try {
    const createPromises = [];
    req.body.values.forEach((value) => {
      createPromises.push(
        Value.query().insert({
          Value: JSON.stringify(value.value),
          AttributeId: value.attributeId,
          MemorialId: value.memorialId,
        })
      );
    });
    Promise.all(createPromises).then((values) => res.status(201).json(values));
  } catch (err) {
    Error.errorHandler(err, res);
  }
});

router.put("/", async (req, res) => {
  try {
    const updatePromises = [];
    req.body.Values.forEach((value) => {
      updatePromises.push(
        Value.query()
          .findById(value.Id)
          .patch({
            Value: JSON.stringify(value.Value),
            AttributeId: value.AttributeId,
            MemorialId: value.MemorialId,
          })
      );
      Promise.all(updatePromises).then((values) =>
        res.status(204).json(values)
      );
    });
  } catch (err) {
    Error.errorHandler(err, res);
  }
});

module.exports = router;
