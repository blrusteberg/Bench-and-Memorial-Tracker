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

router.post("/", async (req, res) => {
  try {
    const type = await Type.query().insert({
      Name: req.body.name,
    });

    res.status(200).json(type);
  } catch (err) {
    Error.errorHandler(err, res);
  }
});

router.put("/", async (req, res) => {
  try {
    const numUpdated = await Type.query().findById(req.body.id).patch({
      Name: req.body.name,
    });
    const s = numUpdated === 1 ? "" : "s";
    res.status(200).json({ message: `Updated ${numUpdated} type${s}` });
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
