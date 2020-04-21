"user strict";
const express = require("express");
const router = express.Router();
const memorials = require("../data/memorials.json");
const utils = require("../utils/index");
const fs = require("fs");
const uuid = require("uuid");

router.get("/", (req, res) => {
  res.status(200);
  res.send(memorials);
});

router.post("/", (req, res) => {
  console.log("POSE REQUEST CALLED");
  console.log(req);
  req.body.memorials.forEach((memorial, index) => {
    if (!memorial.type) {
      res.status(400).json({
        message: `memorial at index ${index} is not valid`,
      });
    }

    if (memorial.attributes.length == 0) {
      res.status(400).json({
        message: `memorial at index ${index} is not valid`,
      });
    }
    memorial.uuid = uuid.v4();
  });

  addMemorials(req.body.memorials);
  res.status(201);
  const plural = req.body.memorials.length > 1 ? "s" : "";
  res.send(
    `${req.body.memorials.length} memorial${plural} successfully saved `
  );
});

function addMemorials(newMemorials) {
  utils.jsonReader("data/memorials.json", (err, memorials) => {
    if (err) {
      console.log("Error reading file:", err);
      return;
    }

    memorials.memorials = memorials.memorials.concat(newMemorials);
    fs.writeFile(
      "data/memorials.json",
      JSON.stringify(memorials, null, 2),
      (err) => {
        if (err) console.log("Error writing file:", err);
      }
    );
  });
}

module.exports = router;
