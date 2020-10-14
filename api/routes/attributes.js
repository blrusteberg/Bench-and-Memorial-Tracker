const express = require("express");
const router = express.Router();
const Error = require("../error/error");

const Attribute = require("../models/Attribute");
const Value = require("../models/Value");

router.post("/", async (req, res) => {
  try {
    const type = await Attribute.query().insert({
      Name: req.body.Name,
      ValueType: req.body.ValueType,
    });
    res.status(201).json(type);
  } catch (err) {
    Error.errorHandler(err, res);
  }
});

router.get("/", async (req, res) => {
  try {
    const attributes = await Attribute.query();

    res.status(200).json(attributes);
  } catch (err) {
    Error.errorHandler(err, res);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const numUpdated = await Attribute.query().findById(req.params.id).patch({
      Name: req.body.Name,
    });
    const s = numUpdated === 1 ? "" : "s";
    res.status(204).json({ message: `Updated ${numUpdated} memorial${s}` });
  } catch (err) {
    Error.errorHandler(err, res);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleteTypeRelationPromise = Attribute.relatedQuery("Types")
      .for(req.params.id)
      .unrelate();
    const deleteValuesPromise = Value.query()
      .delete()
      .where("AttributeId", req.params.id);
    Promise.all([deleteTypeRelationPromise, deleteValuesPromise]).then(
      async () => {
        const numDeleted = await Attribute.query().deleteById(req.params.id);
        const s = numDeleted === 1 ? "" : "s";
        res.status(200).json({ message: `${numDeleted} memorial${s} deleted.` });
      }
    );
  } catch (err) {
    Error.errorHandler(err, res);
  }
});

module.exports = router;
