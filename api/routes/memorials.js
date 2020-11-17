const express = require("express");
const router = express.Router();
const Error = require("../error/error");

const MemorialController = require("../controllers/memorial.controller");
// WORK TO REMOVE THESE
const Memorial = require("../models/Memorial");
const Value = require("../models/Value");

const memorialController = new MemorialController();

router.get("/", async (req, res) => {
  try {
    const memorials = await Memorial.query();
    res.status(200).json(memorials);
  } catch (err) {
    Error.errorHandler(err, res);
  }
});

router.get("/types/attributes/values", async (req, res) => {
  memorialController.getMemorialsWithTypeWithAttributesWithValues(req, res);
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

router.post("/values", async (req, res) => {
  try {
    const memorial = await Memorial.query().insert({
      Name: req.body.Name,
      TypeId: req.body.TypeId,
      Image: req.body.Image,
    });
    const insertValuePromises = [];
    req.body.Attributes.forEach((attribute) => {
      if (attribute.ValueType === "Yes/No") {
        attribute.Value = attribute.Value === "true";
      }
      attribute.Value = JSON.stringify(attribute.Value);
      const insertValuePromise = Value.query().insert({
        Value: attribute.Value,
        AttributeId: attribute.Id,
        MemorialId: memorial.Id,
      });
      insertValuePromises.push(insertValuePromise);
    });
    Promise.all(insertValuePromises).then((data) => {
      res.status(201).json(memorial.Id);
    });
  } catch (err) {
    Error.errorHandler(err, res);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const numMemorialsUpdated = await Memorial.query()
      .findById(req.params.id)
      .patch({
        Name: req.body.Name,
        Image: req.body.Image || "",
        Status: req.body.Status,
      });
    if (req.body.Attributes) {
      const valuePromises = [];
      req.body.Attributes.forEach((attribute) => {
        const newValue = {
          ...attribute.Value,
          Value: JSON.stringify(attribute.Value.Value),
        };
        valuePromises.push(
          attribute.Value.Id
            ? Value.query().findById(attribute.Value.Id).patch(newValue)
            : Value.query().insert(newValue)
        );
      });
      await Promise.all(valuePromises);
    }
    res
      .status(204)
      .json({ message: `Updated ${numMemorialsUpdated} memorial` });
  } catch (err) {
    Error.errorHandler(err, res);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Value.query().delete().where("MemorialId", req.params.id);
    const numDeleted = await Memorial.query().deleteById(req.params.id);
    res.status(200).json({ message: `${numDeleted} memorial deleted.` });
  } catch (err) {
    Error.errorHandler(err, res);
  }
});

module.exports = router;
