const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const Error = require("../error/error");

const Account = require("../models/account.js");


router.get("/", async (req, res) => {
    try {
      const accounts = await Account.query();
      res.status(200).json(accounts);
    } catch (err) {
      Error.errorHandler(err, res);
    }
  });


  module.exports = router;