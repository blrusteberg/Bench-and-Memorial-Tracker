const express = require("express");
const router = express.Router();
const Error = require("../error/error");

const Type = require("../models/Type");
const Memorial = require("../models/Memorial");

router.post("/", async (req, res) => {
  try {
    const type = await Type.query().insert({
      Name: req.body.Name,
    });
    res.status(201).json(type);
  } catch (err) {
    Error.errorHandler(err, res);
  }
});

router.post("/attributes", async (req, res) => {
  try {
    const type = await Type.query().insert({
      Name: req.body.Type.Name,
    });
    const relatePromises = [];
    req.body.Attributes.forEach((attribute) => {
      const relatePromise = type.$relatedQuery("Attributes").relate({
        Id: attribute.Id,
        Required: attribute.Required,
      });
      relatePromises.push(relatePromise);
    });
    Promise.all(relatePromises).then((data) => {
      res.status(201).json(type);
    });
  } catch (err) {
    Error.errorHandler(err, res);
  }
});

router.get("/", async (req, res) => {
  try {
    const types = await Type.query();
    res.status(200).json(types);
  } catch (err) {
    Error.errorHandler(err, res);
  }
});

router.get("/attributes", async (req, res) => {
  try {
    const types = await Type.query().withGraphFetched("Attributes");
    res.status(200).json(types);
  } catch (err) {
    Error.errorHandler(err, res);
  }
});

router.get("/:id/attributes", async (req, res) => {
  try {
    const attributes = await Type.relatedQuery("Attributes")
      .for(req.params.id)
      .orderBy("Name");
    res.status(200).json(attributes);
  } catch (err) {
    Error.errorHandler(err, res);
  }
});

router.put("/:id/attributes", async (req, res) => {
  try {
    const graph = await Type.query().upsertGraph(
      {
        Id: req.params.id,
        Attributes: req.body.Attributes,
      },
      {
        relate: true,
        unrelate: true,
      }
    );
    res.status(201).json(graph);
  } catch (err) {
    Error.errorHandler(err, res);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const numUpdated = await Type.query().findById(req.params.id).patch({
      Name: req.body.Name,
    });
    const s = numUpdated === 1 ? "" : "s";
    res.status(201).json({ message: `Updated ${numUpdated} type${s}` });
  } catch (err) {
    Error.errorHandler(err, res);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Memorial.query().delete().where("TypeId", req.params.id);
    await Type.relatedQuery("Attributes").for(req.params.id).unrelate();
    await Type.query().deleteById(req.params.id);
    res.status(200).json({ message: `1 type deleted.` });
  } catch (err) {
    Error.errorHandler(err, res);
  }
});

module.exports = router;
