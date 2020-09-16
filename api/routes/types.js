const express = require("express");
const router = express.Router();
const Error = require("../error/error");

const Type = require("../models/Type");

router.get("/", async (req, res) => {
  try {
    const types = await Type.query();
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

router.put("/:Id/attributes", async (req, res) => {
  try {
    const graph = await Type.query().upsertGraph(
      {
        Id: req.params.Id,
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

router.put("/", async (req, res) => {
  try {
    const numUpdated = await Type.query().findById(req.body.Id).patch({
      Name: req.body.Name,
    });
    const s = numUpdated === 1 ? "" : "s";
    res.status(204).json({ message: `Updated ${numUpdated} type${s}` });
  } catch (err) {
    Error.errorHandler(err, res);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const numDeleted = await Type.query().deleteById(req.params.id);
    const s = numDeleted === 1 ? "" : "s";
    res.status(200).json({ message: `${numDeleted} type${s} deleted.` });
  } catch (err) {
    Error.errorHandler(err, res);
  }
});

module.exports = router;
