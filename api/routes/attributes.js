const express = require("express");
const router = express.Router();
const Error = require("../error/error");

const Attribute = require("../models/Attribute");

router.get("/", async (req, res) => {
  try {
    const attributes = await Attribute.query();
    res.status(200).json(attributes);
  } catch (err) {
    Error.errorHandler(err, res);
  }
});

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

router.put("/", async (req, res) => {
  try {
    const numUpdated = await Attribute.query().findById(req.body.Id).patch({
      Name: req.body.Name,
      ValueType: req.body.ValueType,
    });
    const s = numUpdated === 1 ? "" : "s";
    res.status(204).json({ message: `Updated ${numUpdated} memorial${s}` });
  } catch (err) {
    Error.errorHandler(err, res);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const numDeleted = await Attribute.query().deleteById(req.params.id);
    const s = numDeleted === 1 ? "" : "s";
    res.status(200).json({ message: `${numDeleted} memorial${s} deleted.` });
  } catch (err) {
    Error.errorHandler(err, res);
  }
});

module.exports = router;
