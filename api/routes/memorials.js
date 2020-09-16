const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const Error = require("../error/error");

const Memorial = require("../models/Memorial");
const Value = require("../models/Value");

router.get("/", async (req, res) => {
  try {
    const memorials = await Memorial.query();
    res.status(200).json(memorials);
  } catch (err) {
    Error.errorHandler(err, res);
  }
});

router.get("/:id/types", async (req, res) => {
  try {
    const memorialType = await Memorial.relatedQuery("Type").for(req.params.id);
    res.status(200).json(memorialType);
  } catch (err) {
    Error.errorHandler(err, res);
  }
});

router.post("/", async (req, res) => {
  try {
    const memorial = await Memorial.query().insert({
      TypeId: req.body.TypeId,
    });
    res.status(201).json(memorial);
  } catch (err) {
    Error.errorHandler(err, res);
  }
});

router.post("/types/:TypeId/attributes/values", async (req, res) => {
  try {
    const memorial = await Memorial.query().insert({
      Name: req.body.Memorial.Name,
      TypeId: req.params.TypeId,
    });

    const insertValuePromises = [];
    req.body.Values.forEach((value) => {
      const insertPromise = Value.query().insert({
        Value: value.Value,
        AttributeId: value.AttributeId,
        MemorialId: memorial.Id,
      });
      insertValuePromises.push(insertPromise);
    });
    Promise.all(insertValuePromises).then((data) => res.status(201).json(data));
  } catch (err) {
    Error.errorHandler(err, res);
  }
});

router.put("/", async (req, res) => {
  try {
    const numUpdated = await Memorial.query().findById(req.body.id).patch({
      TypeId: req.body.typeId,
    });
    const s = numUpdated === 1 ? "" : "s";
    res.status(204).json({ message: `Updated ${numUpdated} memorial${s}` });
  } catch (err) {
    Error.errorHandler(err, res);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const numDeleted = await Memorial.query().deleteById(req.params.id);
    const s = numDeleted === 1 ? "" : "s";
    res.status(200).json({ message: `${numDeleted} memorial${s} deleted.` });
  } catch (err) {
    Error.errorHandler(err, res);
  }
});

module.exports = router;
