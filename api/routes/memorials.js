const express = require("express");
const router = express.Router();

const Memorial = require("../models/memorial");

router.get("/", async (req, res) => {
  try {
    const memorials = await Memorial.find();
    res.status(200).json(memorials);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.post("/", async (req, res) => {
  const memorial = new Memorial({
    name: req.body.name,
    typeId: req.body.typeId,
    attributes: req.body.attributes,
  });
  try {
    const savedMemorial = await memorial.save();
    res.status(200).json(savedMemorial._id);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

router.put("/", async (req, res) => {
  const updatedMemorial = new Memorial({
    name: req.body.name,
    typeId: req.body.typeId,
    _id: req.body._id,
    attributes: req.body.attributes,
  });
  try {
    await Memorial.findOneAndUpdate(
      { _id: updatedMemorial._id },
      updatedMemorial,
      { new: true, overwrite: true }
    );
    res.status(200).json({ message: "1 memorial was updated" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Unable to update memorial.",
    });
  }
});

router.delete("/:_id", async (req, res) => {
  try {
    await Memorial.deleteOne({ _id: req.params._id });
    res.status(204).json({ message: "1 memorial was deleted." });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
  }
});

module.exports = router;
