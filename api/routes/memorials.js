const express = require("express");
const router = express.Router();
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

router.get("/types/attributes/values", async (req, res) => {
  try {
    const memorials = await Memorial.query().withGraphFetched(
      "[Type.[Attributes], Values]"
    );
    const formattedMemorials = [];
    memorials.forEach((memorial) => {
      const formattedAttributes = [];
      memorial.Type.Attributes.forEach((attribute) => {
        let attributePushed = false;
        memorial.Values.forEach((value) => {
          if (value.AttributeId === attribute.Id) {
            formattedAttributes.push({
              Id: attribute.Id,
              Name: attribute.Name,
              ValueType: attribute.ValueType,
              Required: attribute.Required,
              Value: JSON.parse(value.Value),
            });
            attributePushed = true;
          }
        });
        if (!attributePushed) {
          formattedAttributes.push({
            Id: attribute.Id,
            Name: attribute.Name,
            ValueType: attribute.ValueType,
            Required: attribute.Required,
            Value: "",
          });
        }
      });
      formattedMemorials.push({
        Id: memorial.Id,
        Name: memorial.Name,
        Type: {
          Id: memorial.Type.Id,
          Name: memorial.Type.Name,
          Attributes: formattedAttributes,
        },
      });
    });
    res.status(200).json(formattedMemorials);
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

router.post("/values", async (req, res) => {
  try {
    const memorial = await Memorial.query().insert({
      Name: req.body.Name,
      TypeId: req.body.TypeId,
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
      res.status(201).json(data);
    });
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
