"user strict";
const express = require("express");
const router = express.Router();
const memorialTypes = require("../data/memorial-types.json");
const utils = require("../utils/index");
const fs = require("fs");

router.get("/", (req, res) => {
  res.status(200).json({ memorialTypes });
});

router.post("/", (req, res) => {
  if (!utils.validateMemorialTypes(req.body.memorialTypes)) {
    res.status(400).json({
      message: "invalid memorial types",
    });
  }

  addMemorialTypes(req.body);

  res.status(201).json({
    message: "memorial types added",
  });
});

function addMemorialTypes(newMemorialTypes) {
  utils.jsonReader("data/memorial-types.json", (err, memorialTypes) => {
    if (err) {
      console.log("Error reading file:", err);
      return;
    }

    memorialTypes.memorialTypes = memorialTypes.memorialTypes.concat(
      newMemorialTypes.memorialTypes
    );
    fs.writeFile(
      "data/memorial-types.json",
      JSON.stringify(memorialTypes, null, 2),
      (err) => {
        if (err) console.log("Error writing file:", err);
      }
    );
  });
}

module.exports = router;
