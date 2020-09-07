const express = require("express");
const router = express.Router();

const MemorialType = require("../models/memorialType");

router.get("/", async (req, res) => {
  try {
    const memorialTypes = await MemorialType.find();
    res.status(200).json(memorialTypes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

router.post("/", async (req, res) => {
  const memorialType = new MemorialType({
    name: req.body.name,
    attributes: req.body.attributes,
  });
  try {
    const savedMemorialType = await memorialType.save();
    res.status(200).json(savedMemorialType._id);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Unable to create new memorial type.",
    });
  }
});

router.put("/", async (req, res) => {
  const updatedMemorialType = new MemorialType({
    name: req.body.name,
    _id: req.body._id,
    attributes: req.body.attributes,
  });
  try {
    await MemorialType.findOneAndUpdate(
      { _id: updatedMemorialType._id },
      updatedMemorialType,
      { new: true, overwrite: true }
    );
    res.status(200).json({ message: "1 memorial type was updated" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Unable to update memorial type.",
    });
  }
});

router.delete("/:_id", async (req, res) => {
  try {
    await MemorialType.deleteOne({ _id: req.params._id });
    res.status(204).json({ message: "1 memorial type was deleted." });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
  }
});

module.exports = router;
