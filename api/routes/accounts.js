const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const Error = require("../error/error");

const Account = require("../models/Account.js");

router.get("/", async (req, res) => {
  try {
    const accounts = await Account.query();
    res.status(200).json(accounts);
  } catch (err) {
    Error.errorHandler(err, res);
  }
});

router.post("/", async (req, res) => {
  try {
    const accounts = await Account.query().insert({
      Username: req.body.Username,
      Password: req.body.Password,
      AccountType: req.body.AccountType,
      DelAccess: req.body.DelAccess,
    });
    res.status(201).json(accounts);
  } catch (err) {
    Error.errorHandler(err, res);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Account.query().deleteById(req.params.id);
    res
      .status(202)
      .json({ message: `Number of account(s) deleted: ${deleted}` });
  } catch (err) {
    Error.errorHandler(err, res);
  }
});

module.exports = router;
